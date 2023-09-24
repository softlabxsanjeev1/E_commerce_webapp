import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate, useLocation} from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false)

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',
                { email, password});
            if (res && res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <div className='register'>
                <h2 className='bg-black text-light my-2 py-2' style={{ width: "300px", textAlign: "center" }}>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div class="form-group mb-3" style={{ width: "300px" }}>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            class="form-control"
                            id="useremail" placeholder="Enter email"
                            required
                        />
                    </div>
                    <div class="form-group mb-3">
                        <input type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            class="form-control"
                            id="password" placeholder="Password"
                            required
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
                    <div>
                        <button type="submit" class="btn btn-primary mt-3" onClick={() => { navigate('/forgot-password') }}>
                            Forgot Password
                        </button>
                    </div>                    
                    <button type="submit" class="btn btn-primary mt-3">Login</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login