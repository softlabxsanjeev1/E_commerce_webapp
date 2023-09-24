import Layout from '../components/layout/Layout'
import React from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()

  return (
    <Layout>
    <div className='container'>
        <div className='row mx-4 my-4'>
             {categories.map((c) => (
                <div className='col-md-4 mt-5 mb-2 gx-3 gy-3' key={c._id}>
                 <Link to={`/category/${c.slug}`} className='btn btn-primary view overlay zoom mx-4' style={{width:"300px",padding:"50px"}}>
                         {c.name}
                    </Link>
                </div>
             ))}
        </div>
    </div>
    </Layout>
  )
}

export default Categories