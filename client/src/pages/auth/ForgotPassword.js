import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate, } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast';


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [answer, setAnswer] = useState('')
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
 

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgot-password',
        { email, newPassword,answer });
      if (res && res.data.success) {
        toast.success(res && res.data.success)
        navigate('/login');
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
        <h2 className='bg-black text-light my-2 py-2' style={{ width: "300px", textAlign: "center" }}>RESET PASSWORD </h2>
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
          <div class="form-group mb-3" style={{ width: "300px" }}>
            <input type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              class="form-control"
              id="useremail" placeholder="Enter your favorite sport"
              required
            />
          </div>
          <div class="form-group mb-3">
            <input type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              class="form-control"
              id="password" placeholder="New Password"
              required
            />
          </div>
          <div class="form-group form-check my-2 mx-2">
            <input type="checkbox"
              onClick={() => {
                setShowPassword((newPassword) => !newPassword);
              }}                       
              class="form-check-input " id="show-password" />
            <label class="form-check-label" for="exampleCheck1">Show password</label>
          </div>
          <button type="submit" class="btn btn-primary mt-3">RESET PASSWORD</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword