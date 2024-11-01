import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    // Handle login logic here
    if(!email || !password)
        toast.error("Provide all details");
    else{
      try{
        const resp = await axios.post('http://localhost:5000/user/login',{
          email:email,
          password:password
        },{
          withCredentials:true
        })
        toast.success(resp.data.message);
        navigate("/home")
      }catch(error){
        toast.error(error?.response.data.message);
        console.log(error)
      }
    }      
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Login to LiveScript</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-lg">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
          >
            Login
          </button>
        </form>
        <p className="text-center text-lg">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
