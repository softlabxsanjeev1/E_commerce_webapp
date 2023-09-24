import { Layout } from 'antd'
import React from 'react'
import { useSearch } from '../context/search'

const Search = () => {
  const [values,setValues] = useSearch()
  return (
    <Layout>
      <div className='container'>
      <div style={{textAlign:"center"}}>
          <h1>Search Result</h1>
          <h6>{values?.results.length < 1 ? 'No Products Found' :  `Found ${values?.results.length}` }</h6>

          <div className='d-flex flex-wrap mt-4'>
            {values.results?.map((p) => (
              <div className="card mx-2 my-2 p-1" style={{ width: "18rem" }} >
                <img src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top " alt={p.name}
                  style={{ height: "220px", borderRadius: "20px" }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className='card-text'> $ {p.price}</p>
                  <button className='btn btn-primary ms-1'>More Details</button>
                  <button className='btn btn-secondary ms-1'>Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
      </div>
      </div>
    </Layout>
  )
}

export default Search