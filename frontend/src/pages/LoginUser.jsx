import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return alert("Please enter both fields");
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 200) {
        navigate("/");
      } else if (res.status === 404) {
        setMessage(data.message);
      } else if (res.status === 401) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Server error: " + err.message);
    }

    setUser({ email: "", password: "" });
  };

  
  return (
    <div>
      <h1 className="h1 text-center font-bold font-poppins text-7xl mt-3 uppercase  text-black/20">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="p-10 rounded-lg  relative flex flex-col items-center justify-center gap-y-2  mt-5 min-h-70 w-100 mx-auto shadow-[0px_0px_5px_black]"
      >
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
        <button className="btn bg-orange-400">Login</button>
        {message == "invalid password" && (
          <div>
            <p className="text-red-500 text-center mb-5">{message}</p>
            <Link
              to="/forgotpassword"
              className="bg-blue-400  uppercase rounded p-1  font-[anta] "
            >
              forget password
            </Link>
          </div>
        )}
        {message === "Email Not found" && (
          <div className="mt-3">
            <p
              to="/register"
              className="bg-red-600 text-emerald-50 uppercase rounded p-1 mt-2 font-[anta] "
            >
              {message}
            </p>
            <Link
              to="/register"
              className="text-green-400  mx-auto block text-center  underline "
            >
              Go to Register😃
            </Link>
          </div>
        )}
      </form>

      <p className="text-red-600  text-3xl underline text-center">
        {error && error}
      </p>
    </div>
  );
};

export default LoginUser;
