import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
const {Option} = Select

const AdminOrders = () => {
    const [status, setStatus] = useState(
                                        ["Not Process", 
                                        "Processing", 
                                        "Shipped", 
                                        "deliverd", 
                                        "cancel"]
                                        )
    const [changeStatus, setChangeStatus] = useState();
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId,value) => {
        try{
             const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
                status:value,
            });
            getOrders();
        } catch (error) {
            console.log(error)
        }
    };
  return (
    <>
    <Layout>
        <div className='container-fluid p-3 m-3 flex'>
                  <div className='row'>
                      <div className='col-md-2 ms-2 mt-4'>
                          <AdminMenu />
                      </div>
                      <div className='col-md-9 ms-4'>
                          <h1 style={{ textAlign: "center" }}>All Orders</h1>
                          {
                              orders?.map((o, i) => {
                                  return (
                                      <div className='border shadow'>
                                          <table className='table'>
                                              <thead style={{background:"cyan"}}>
                                                  <tr>
                                                      <th scope='col'>#</th>
                                                      <th scope='col'>Status</th>
                                                      <th scope='col'>Buyers</th>
                                                      <th scope='col'>date</th>
                                                      <th scope='col'>Payment</th>
                                                      <th scope='col'>Quantity</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr>
                                                      <td>{i + 1}</td>
                                                      <td style={{backgroundColor:"Highlight",fontWeight:"bolder"}}>
                                                        <Select 
                                                        bordered={false} 
                                                        onChange={(value) => handleChange(o._id,value)} 
                                                        defaultValue={o?.status}
                                                        >
                                                          {status.map((s,i) => (
                                                            <Option key={i} value={s}>
                                                                 {s}
                                                            </Option>
                                                          ))}                                                                                                                   
                                                        </Select>
                                                      </td>
                                                      <td>{o?.buyer?.name}</td>
                                                      <td>{moment(o?.createAt).fromNow()}</td>
                                                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                      <td>{o?.products?.length}</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                          <div className='container'>
                                              {o?.products?.map((p, i) => (
                                                  <div className='row mb-2 card flex-row'>
                                                      <div className='col-md-4'>
                                                          <img src={`/api/v1/product/product-photo/${p?._id}`}
                                                              className="card-img-top mt-4" alt={p.name}
                                                              style={{ height: "100px", width: "100px", borderRadius: "20px" }} />
                                                      </div>
                                                      <div className='col-md-8 mb-2'>
                                                          <p>{p.name}</p>
                                                          <p>{p.description.substring(0, 30)}</p>
                                                          <p>Price : {p.price}</p>
                                                      </div>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  )
                              })
                          }
                      </div>
                  </div>
        </div>        
    </Layout>
    </>
  )
}

export default AdminOrders