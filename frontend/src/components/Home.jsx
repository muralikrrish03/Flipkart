import React, { useEffect, useState } from "react";
import img from "../assets/flipkart.png";
import { Link, useSearchParams } from "react-router-dom";
import { FaIdCardAlt } from "react-icons/fa";
import Slider from "./Slider";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";

const Home = ({ viewSlider }) => {
  const [products, setProducts] = useState([]);
  const [heart, setHeart] = useState([]);
  const [auth, setAuth] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/products?" + searchParams)
      .then((res) => res.json())
      .then((res) => setProducts(res.products))
      .catch((err) => console.log(err));
  }, [searchParams]);

  const handleHeart = (wishHeart) => {
    const updateHeart = products.find((pro) => pro._id === wishHeart._id);

    if (heart.includes(updateHeart._id)) {
      setHeart(heart.filter((id) => id !== updateHeart._id));
    } else {
      setHeart([...heart, updateHeart._id]);
    }
  };

  fetch("http://localhost:5000/me", {
    credentials: "include",
  }).then((res)=>res.json()).then((data)=>setAuth(data.user.role))

  const handleDelete = (id) => {
    const removeItems = products.filter((item) => item._id !==id)
    setProducts(removeItems)
    fetch(`http://localhost:5000/api/v1/product/${id}`, {
      method: "DELETE",
    })
  }



  return (
    <div className="w-[90vw] lg:w-[90vw] mx-auto mt-5   rounded-2xl">
      {!viewSlider &&
        <Slider products={products} />}
      <div className="grid grid-cols-1 w-full  lg:grid-cols-5 gap-14 -mx-1">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div
                key={product._id}
                className="shadow-[0px_0px_1px_black]  w-60 flex flex-col mx-auto my-5 items-center h-83 rounded-lg p-2"
              >
                <div
                  className="bg-[#e1e4e6] relative h-full rounded-lg w-full p-1 flex flex-col items-center
                [clip-path:polygon(50px_0%,100%_0%,100%_calc(100%-50px),calc(100%-50px)_100%,0%_100%,0%_50px)]
                
                "
                >
                  <div className="bg-white  rounded-full absolute left-[193px] top-3 p-1 shadow-[0px_0px_1px_black]">
                    <CiHeart
                      onClick={() => handleHeart(product)}
                      className={`${
                        heart.includes(product._id)
                          ? "text-white bg-rose-500"
                          : "bg-white text-black"
                      } size-5 rounded-full`}
                    />
                  </div>
                  <img
                    className="size-50"
                    src={product.images[0].image}
                    alt="product"
                  />
                </div>
                <div className=" w-full h-full">
                  <h2 className="text-start font-bold ">{product.name}</h2>
                  <div className="flex px-2  justify-between ">
                    5star⭐
                    {auth == 'admin' ? <button
                      onClick={()=>handleDelete(product._id)}
                      className="  text-[#ff0000] px-3 gap-1 py-1 rounded   flex items-center shadow-[0px_0px_1px_black]
                        "
                    >
                      <RiDeleteBinLine />
                      Remove
                    </button> : ""}
                    
                  </div>

                  <div className="flex items-center mt-2  px-2 justify-between  w-full">
                    <h2 className="font-bold">${product.price}</h2>
                    <Link
                      to={"/product/" + product._id}
                      className="px-5 py-1 text-blue-600  border-blue-600 shadow-[0px_0px_1px_black]   flex items-center rounded 
                        
                        "
                    >
                      <FaIdCardAlt className="my-auto mr-3" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="bg-teal-400">length-0</p>
        )}
      </div>
    </div>
  );
};

export default Home;
