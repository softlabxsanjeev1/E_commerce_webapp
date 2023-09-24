import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast';


const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register',
        {
          name,
          email,
          password,
          phone,
          address,
          answer
        });
      if (res && res.data.success) {
        toast.success(res.data.message)
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
        <h2 className='bg-black text-light my-2 py-2' style={{ width: "350px", textAlign: "center" }}>Register Page</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group mb-3" style={{ width: "350px" }}>
            <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="form-control"
              id="username" placeholder="Enter name"
              required
            />
          </div>
          <div class="form-group mb-3" style={{ width: "350px" }}>
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
          <div class="form-group mb-3" style={{ width: "350px" }}>
            <input type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              class="form-control"
              id="phone" placeholder="Enter phone no"
              required
            />
          </div>
          <div class="form-group mb-3" style={{ width: "350px" }}>
            <input type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              class="form-control"
              id="address" placeholder="address"
              required
            />
          </div>
          <div class="form-group mb-3" style={{ width: "350px" }}>
            <input type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              class="form-control"
              id="answer" placeholder="Your favourite Sports"
              required
            />
          </div>
          <div class="form-group form-check my-2 mx-2">
            <input type='checkbox'
              onClick={() => {
                setShowPassword((password) => !password);
              }}
              class="form-check-input " id="show-password" />
            <label class="form-check-label" for="exampleCheck1">Show password</label>
          </div>

          <button type="submit" class="btn btn-primary mt-3">Register</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register