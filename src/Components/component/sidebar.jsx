import React, { useEffect } from "react";
import Client from "../Custom/Client.jsx";
import { GiDna1 } from "react-icons/gi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SideBar = ({id,Clients }) => {
const reactNavigate = useNavigate();
useEffect(()=>console.log("Side bar update:- ",Clients),[Clients])
  const handleCopy = async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(id);
      toast.success("Room ID copied Successfully");
    } catch (error) {
      toast.error("Error to copy");
    }
  };

  const handleExit = (event) => {
    event.preventDefault();
    toast.success("Logged Out");
    reactNavigate("/");
  };

  return (
    <div className="flex flex-col mr-auto w-full bg-gray-800 ">
      {/* Start element */}
      <div className="flex flex-col mr-auto w-full bg-gray-800">
        <div className="flex flex-row space-x-1 mr-auto w-full h-full bg-gray-800 mt-2">
          <GiDna1 className="text-green-300 text-5xl" />
          <div className="flex flex-col space-y-1 text-center">
            <h1 className="font-bold text-2xl pt-2 bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent">
              Live Script
            </h1>
          </div>
        </div>
        <span className="text-green-300 px-2">RealTime Collaboration</span>
        <hr className="border-t border-gray-600 opacity-50 my-4 m-2" />
      </div>
      <div className="flex flex-col justify-between h-full">
        {/* People */}
        <div className="text-white flex flex-col p-4 rounded-lg shadow-lg">
          {/* Header */}
          <span className="text-xl font-semibold mb-4">Connected Users</span>

          {/* Client List (Two clients per row) */}
          <div className="grid grid-cols-2 gap-4">
            {Clients.map((client) => (
              <Client key={client.socketId} userName={client.username} />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-evenly">
          <button
            type="submit"
            onClick={handleCopy}
            className="p-4 bg-white rounded-lg text-1xl m-2 font-bold hover:scale-105 transform transition duration-300 shadow-lg"
          >
            Copy ID
          </button>
          <button
            type="submit"
            onClick={handleExit}
            className="p-4 bg-green-300 text-black font-bold rounded-lg text-1xl m-2 hover:scale-105 transform transition duration-300 shadow-lg"
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
