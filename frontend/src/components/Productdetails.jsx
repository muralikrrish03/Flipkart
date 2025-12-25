import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Productdetails = ({ cardItems, setCardItems }) => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/product/" + id)
      .then((res) => res.json())
      .then((res) => setProduct(res.product))
      .catch((err) => console.log(err));
  }, []);


  const handleIncrese = () => {
    if (product.stock == count) {
      return;
    }
    setCount((state) => state + 1);
  };

  const handleDecrese = () => {
    if (count > 1) {
      setCount((state) => state - 1);
    }
  };

  const addToCard = () => {
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];

    const itemExists = storedCards.find((item) => item.product._id === product._id
    );

    if (itemExists) {
      // increase count
      const updatedCards = storedCards.map((item) =>
        item.product._id === product._id
          ? { ...item, count: item.count + 1 }
          : item
      );
      localStorage.setItem("cards", JSON.stringify(updatedCards));
    } else {
      // add new item
      const newItem = { product, count };
      localStorage.setItem("cards", JSON.stringify([...storedCards, newItem]));

      
  toast("🦄 CardItem Added Succssfully", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "dark",
    transition: Bounce,
  });
    }

    

  };

  return (
    product && (
      <div className=" rounded-lg mt-3 h-[80vh] grid grid-cols-2 items-center mx-auto bg-gray-300 w-[90vw] lg:w-[97vw]">
        <img
          src={product.images[0].image}
          className=" mx-auto h-[70vh]  border-amber-500 "
          alt=""
        />

        <div className=" h-[70vh] font-[manrope] text-gray-500  text-xl w-150 gap-y-10 flex flex-col  justify-center">
          <h1>
            Name :<span className="text-blue-500 ml-2  ">{product.name}</span>
          </h1>

          <p className="">
            Price : <span className="text-blue-500 ml-2">${product.price}</span>
          </p>

          <div className="space-x-4 ml-2">
            <button className="btn bg-white" onClick={handleDecrese}>
              -
            </button>
            {count}
            <button className="btn bg-white ml-4" onClick={handleIncrese}>
              +
            </button>
            <button
              disabled={product.stock == 0}
              onClick={addToCard}
              className={
                "btn bg-blue-500 text-white cursor-pointer disabled:bg-red-500 disabled:text-gray-200 disabled:cursor-not-allowed"
              }
            >
              {product.stock == 0 ? "Stock Not Available" : "Add Card"}
            </button>
          </div>
          <p>
            Stock :{" "}
            <span className="text-blue-500 ml-2">
              {product.stock > 0 ? product.stock : "Out Of Stock "}
            </span>
            {product.stock == 1 && (
              <span className="bg-red-600 text-white px-5">Last Stock</span>
            )}{" "}
          </p>
          <p>
            description :
            <span className="text-blue-500 ml-2">{product.description}</span>
          </p>
        </div>
        <ToastContainer />
      </div>
    )
  );
};

export default Productdetails;
