import React from 'react'
import { useState, useEffect } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Products = () => {
    const [product, setProducts] = useState([])

    // getall products    
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
        }
    };

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className='row mt-2'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9 flex'>
                    <h1 style={{ textAlign: "center" }}>All Products list</h1>
                    <div className='d-flex flex-wrap'>
                        {product?.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}
                                className='product-link'>
                                <div className="card m-2 p-1" style={{ width: "18rem" }} >
                                    <img src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top" alt={p.name} height={250} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products