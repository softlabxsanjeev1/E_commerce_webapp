import React, { useEffect, useState } from 'react'
import UserMenu from '../components/layout/UserMenu'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'



const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [auth, setAuth] = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    // get userData
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile',
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>
                            <div className='register'>
                                <h2 className='bg-black text-light my-2 py-2' style={{ width: "350px", textAlign: "center" }}>
                                    USER PROFILE
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group mb-3" style={{ width: "350px" }}>
                                        <input type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            class="form-control"
                                            id="username" placeholder="Enter name"
                                        />
                                    </div>
                                    <div class="form-group mb-3" style={{ width: "350px" }}>
                                        <input type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            class="form-control"
                                            id="useremail" placeholder="Enter email"
                                            disabled
                                        />
                                    </div>
                                    <div class="form-group mb-3">
                                        <input type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            class="form-control"
                                            id="password" placeholder="Password"
                                        />
                                    </div>
                                    <div class="form-group mb-3" style={{ width: "350px" }}>
                                        <input type="number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            class="form-control"
                                            id="phone" placeholder="Enter phone no"
                                        />
                                    </div>
                                    <div class="form-group mb-3" style={{ width: "350px" }}>
                                        <input type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            class="form-control"
                                            id="address" placeholder="address"
                                        />
                                    </div>
                                    <div class="form-group form-check my-2 mx-2">
                                        <input type="checkbox"
                                            onClick={() => {
                                                setShowPassword((password) => !password);
                                            }}
                                            class="form-check-input " id="show-password" />
                                        <label class="form-check-label" for="exampleCheck1">Show password</label>
                                    </div>

                                    <button type="submit" class="btn btn-primary mt-3">UPDATE</button>
                                </form>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile