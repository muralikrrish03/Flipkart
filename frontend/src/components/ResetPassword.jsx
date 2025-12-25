import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [user, setUser] = useState({
    password: "",
    confirmpassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.password.trim() || !user.confirmpassword.trim())
      return alert("Field is empty");
    if (user.password.trim() !== user.confirmpassword.trim())
      return alert("Mis match");

    fetch(`http://localhost:5000/reset/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          navigate("/login");
          alert("Password Changed...!☺️");
          setUser({
            password: "",
            confirmpassword: "",
          });
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <div>
        <h1 className="h1 text-center font-bold font-poppins text-7xl mt-3 uppercase  text-black/20">
          Reset password
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
            password
          </label>
          <input
            type="text "
            onChange={handleChange}
            name="password"
            value={user.password}
            className="w-70 bg-gray-300 py-1 rounded"
          />
          <label
            htmlFor=""
            className="text-center font-bold font-poppins text-xl text-black/80"
          >
            Confirm password
          </label>
          <input
            type="text "
            onChange={handleChange}
            name="confirmpassword"
            value={user.confirmpassword}
            className="w-70 bg-gray-300 py-1 rounded"
          />
          <button className="btn bg-orange-400" type="submit">
            Password change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
