import React, { useState } from "react";
import { GiDna1 } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";

const Home = () => {
  const [form, setForm] = useState({
    id: "",
    username: "",
  });
  const navigate = useNavigate();
  const createNewRoom = (event) => {
    event.preventDefault();
    const rid = uuidv4();
    setForm((prev) => ({
      ...prev,
      id: rid,
    }));
    toast.success("Created a ROOM.");
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!form.id && !form.username){
        toast.error("Invalid Username or ROOM ID")
        return ;
    }
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("username", form.username);
    toast.success("Joined Room")
    navigate(`/editor/${form.id}`, {
      state: {
        id: form.id,
        username: form.username,
      },
    });
  };

  return (
    <>
      <div className="h-screen w-full text-white flex justify-center items-center">
        <div className="bg-gray-800 w-1/3 flex flex-col space-y-6 p-5 rounded-lg shadow-xl  ">
          <div className="flex flex-row space-x-1 mr-auto w-full h-full">
            <GiDna1 className="text-green-300 text-6xl pr-4 border-r-2 border-white" />
            <div className="flex flex-col space-y-1">
              <h1 className="font-bold text-4xl bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent">Live Script</h1>
              <span className="text-green-300 px-2">
                RealTime Collaboration
              </span>
            </div>
          </div>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <h1 className="mr-auto">Paste Invitation ROOM ID</h1>
            <input
              type="text"
              className="p-3 rounded-xl w-full text-black "
              placeholder="ROOM ID"
              name="id"
              value={form.id}
              onChange={onChange}
            />
            <input
              type="text"
              className="p-3 rounded-xl w-full text-black "
              placeholder="USERNAME"
              name="username"
              value={form.username}
              onChange={onChange}
            />
            <button
              className="py-3 px-8 rounded-xl ml-auto bg-green-300 text-black font-bold"
              type="submit"
            >
              Join
            </button>
            <p className="text-center">
              If you dont't have an invite then create{" "}
              <span
                className="text-green-300 px-1 underline cursor-pointer"
                onClick={createNewRoom}
              >
                new room
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
