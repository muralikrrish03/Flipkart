import React from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Forgetpassword = () => {
  const [user,setUser]=useState("");
  const [token,setToken]=useState("");
  const navigate = useNavigate();

  
 const handleSubmit = (e) => {
   e.preventDefault();

   if (!user.trim()) return alert("Field is empty");

   fetch("http://localhost:5000/forget", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email: user }),
   })
     .then((res) => res.json())
     .then((data) => {
       if (data?.success) {
         setToken(data?.resetToken);
         navigate(`/reset/${data.resetToken}`);
       }
     })
     .catch((err) => console.error(err));
  };
  
  

  return (
    <div>
      <div>
        <h1 className="h1 text-center font-bold font-poppins text-7xl mt-3 uppercase  text-black/20">
          Forgetpassword
        </h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="p-4 rounded-lg  relative flex flex-col items-center justify-center gap-y-2  mt-5 min-h-70 w-100 mx-auto shadow-[0px_0px_5px_black]"
        >
          <label
            htmlFor=""
            className="text-center font-bold font-poppins text-xl text-black/80"
          >
            email
          </label>
          <input
            type="text "
            onChange={(e) => setUser(e.target.value)}
            name="user"
            value={user}
            className="w-70 bg-gray-300 px-3 py-1 rounded"
            placeholder="enter email"
          />
          <button type='submit'  className="btn mt-5">
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgetpassword
