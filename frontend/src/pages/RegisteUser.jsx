import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisteUser = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  
    const [option, setOption] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate('/')
        }
        
      });

    setUser({
      username: "",
      email: "",
      password: "",
    });
    };
    
   
  
    

  return (
    <div>
      <h1 className="h1">Register</h1>

      <form
        onSubmit={handelSubmit}
        action=""
        className="p-2 rounded-lg flex flex-col items-center justify-center gap-y-2  mt-5 min-h-70 w-100 mx-auto shadow-[0px_0px_5px_black]"
      >
        <label
          htmlFor=""
          className="text-center font-bold font-poppins text-xl text-black/80"
        >
          username
        </label>
        <input
          type="text "
          onChange={handleChange}
          name="username"
          value={user.username}
          className="w-70 bg-gray-300 py-1 rounded"
        />
        <label
          htmlFor=""
          className="text-center font-bold font-poppins text-xl text-black/80"
        >
          email
        </label>
        <input
          type="text "
          onChange={handleChange}
          name="email"
          value={user.email}
          className="w-70 bg-gray-300 py-1 rounded"
        />
        <label
          htmlFor=""
          className="text-center font-bold font-poppins text-xl text-black/80"
        >
          password
        </label>
        <input
          type="text "
          onChange={handleChange}
          name="password"
          value={user.password}
          className="w-70 bg-gray-300 py-1 rounded"
        />
        <button type="submit" className="btn">
          Register
        </button>
        <Link to="/login" className="underline text-orange-500">
          Already You Have Login
        </Link>
      </form>
    </div>
  );
};

export default RegisteUser;
