import React from 'react';
import { GiDna1 } from "react-icons/gi";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 bg-gray-800 shadow-md">
      <div className="flex flex-row space-x-1 mr-auto w-full h-full">
            <GiDna1 className="text-green-300 text-6xl pr-4 border-r-2 border-white" />
            <div className="flex flex-col space-y-1">
              <h1 className="font-bold text-2xl bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent">Live Script</h1>
              <span className="text-green-300 px-1">
                RealTime Collaboration
              </span>
            </div>
          </div>
        <nav className="space-x-4">
          <Link to="/login" className="text-lg font-bold bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-lg font-bold bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent hover:underline">
            Register
          </Link>
        </nav>
      </header>

      <main className="flex flex-col justify-center items-center flex-grow">
        <h2 className="text-4xl font-bold mb-4">
          Collaborate in Real-Time with LiveScript
        </h2>
        <p className="text-xl text-center mb-8 max-w-2xl">
          Code together from anywhere. Experience seamless, real-time editing and sharing, empowering teams to work on projects collaboratively, all in one platform.
        </p>
        <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-xl">
          Get Started
        </Link>
      </main>

      <footer className="p-4 bg-gray-800 text-center">
        <p className='text-gradient-to-r from-white to-green-500'>&copy; 2024 LiveScript. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
