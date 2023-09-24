import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Checkbox,Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [cart,setCart] = useCart()
  const navigate = useNavigate()
  

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
       const { data } = await axios.get('/api/v1/product/product-count')
       setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
     if(page === 1) return;
     loadMore();
  }, [page]);

  //load more
  const loadMore = async() => {
    try{
       setLoading(true);
       const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
       setLoading(false);
       setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);      
    }
  }

  // filter by category
  const handleFilter = (value,id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try{
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch(error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() =>{
    if(checked.length || radio.length) filterProduct();
  }, [checked,radio]);


  // get filtered product
  const filterProduct = async () =>{
    try{
      const {data} = await axios.post('/api/v1/product/product-filters',{checked,radio});
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <h4 style={{textAlign:"center"}}>Filter By Category</h4>
          <div className='d-flex flex-column ms-4 my-4'>
            {categories?.map((c) => (
              <Checkbox key={c._id}
                onChange={(e) => handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 style={{ textAlign: "center" }}>Filter By price</h4>
          <div className='d-flex flex-column ms-4 my-4'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
               {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
               ))}
            </Radio.Group>
          </div> 
          <div className='d-flex flex-column my-2 mx-2 w-50'>
          <button 
           className='btn btn-danger'
           onClick={() => window.location.reload()}
           >
              RESET FILTERS
          </button>           
          </div>         
        </div>
        {/* card */}
        <div className='col-md-9'>
          <h1 style={{textAlign:"center"}}>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (            
                <div className="card mx-2 my-2 p-1" style={{ width: "18rem" }} >
                  <img src={`/api/v1/product/product-photo/${p?._id}`}
                    className="card-img-top " alt={p.name} 
                  style={{ height: "220px", width: "220px",borderRadius:"20px",textAlign:"centre"}}/>
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className='card-text'> $ {p.price}</p>
                  <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className='btn btn-secondary ms-1'
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart,p])
                    );
                    toast.success("Item Added to cart");
                  }}
                  >Add To Cart</button>
                  </div>                
                </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button 
              className='btn btn-warning'
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>      
    </Layout>
  )
}

export default HomePage