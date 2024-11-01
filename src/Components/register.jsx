import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword)
      toast.error("Provide all details");
    else {
      try {
        const resp = await axios.post("https://livescript-backend.onrender.com/user/signup", {
          userName: username,
          email: email,
          password: password,
        });
        toast.success("Registration Successful");
        navigate("/login");
      } catch (error) {
        console.log(error?.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Create Your Account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-lg">Username</label>
            <input
              type="text"
              className="w-full p-3 mt-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label className="block text-lg">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 mt-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
          >
            Register
          </button>
        </form>
        <p className="text-center text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
