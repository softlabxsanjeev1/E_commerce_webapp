import Layout from '../components/layout/Layout'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setrelatedProducts] = useState([])

    //initial details
    useEffect(() => {
        if(params?.slug) getProduct()
    }, [params?.slug])
    //getProduct
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }  

    // get similar products
    const getSimilarProduct = async (pid, cid) => {
        try{
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setrelatedProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <div className='row container mt-4'>
            <div className='col-md-6'>
                  <img src={`/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top" alt={product.name} height={450} />
            </div>
            <div className='col-md-6'>
                <h1>Product details</h1>
                <h4>Name : {product.name}</h4>
                <h4>Description : {product.description}</h4>
                <h4>Price : $ {product.price}</h4>
                {/* <h4>Category : {product.category.name}</h4> */}
                <h4>Shipping : {product.shipping}</h4>
                  <button className=' btn btn-secondary ms-1'>ADD TO CART</button>
            </div>
        </div>
        <hr/>
        <div className='row'> 
        <h6> Similar Products</h6>
        {relatedProducts.length < 1 && <p>No Similar Products found</p>}
        <div className='d-flex flex-wrap'>
                  {relatedProducts?.map((p) => (
                      <div className="card mx-2 my-2 p-1" style={{ width: "18rem" }} >
                          <img src={`/api/v1/product/product-photo/${p?._id}`}
                              className="card-img-top " alt={p.name}
                              style={{ height: "220px", borderRadius: "20px" }} />
                          <div className="card-body">
                              <h5 className="card-title">{p.name}</h5>
                              {/* <p className="card-text">{p.description.substring(0, 30)}...</p> */}
                              <p className='card-text'> $ {p.price}</p>
                              <button className='btn btn-secondary ms-1'>Add To Cart</button>
                          </div>
                      </div>
                  ))}
        </div>             
        </div>         
    </Layout>
  )
}

export default ProductDetails