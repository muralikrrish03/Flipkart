import React, { useEffect, useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const Card = () => {
  const [ordeMeg, setOrdermeg] = useState(false);
  const [cardProduts, setProducts] = useState([]);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cards"));
    if (data) {
      setProducts(data);
    }
  }, []);

  const handleIncrese = (item) => {
    if (item.product.stock === item.count) return;
    const updateItems = cardProduts.map((i) =>
      i.product._id === item.product._id ? { ...i, count: i.count + 1 } : i
    );
    setProducts(updateItems);
    localStorage.setItem("cards", JSON.stringify(updateItems));
  };

  const handleDecrese = (item) => {
    if (item.count > 1) {
      const updateItems = cardProduts.map((i) =>
        i.product._id === item.product._id ? { ...i, count: i.count - 1 } : i
      );
      setProducts(updateItems);
      localStorage.setItem("cards", JSON.stringify(updateItems));
    }
  };

  const removeCard = (item) => {
    const updateItems = cardProduts.filter(
      (i) => i.product._id !== item.product._id
    );
    setProducts(updateItems);
    localStorage.setItem("cards", JSON.stringify(updateItems));
  };

  useEffect(() => {
    fetch("http://localhost:5000/me", {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((res) => setUserData(res));
  }, []);

  const userDetails = {
    name: userData?.user?.username,
    email: userData?.user?.email,
    };

  const orderDetails = { userDetails, cardItems: cardProduts }

 const placeOrderHandler = () => {
   fetch("http://localhost:5000/api/v1/order", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(orderDetails),
     credentials: "include",
   })
     .then((res) => res.json())
     .then((ord) => {
       if (ord.success) {
         setProducts([]);
         setOrdermeg(true);
         localStorage.setItem("cards", JSON.stringify([]));

         Swal.fire({
           title: "Order Placed!",
           icon: "success",
           draggable: true,
         });
       } else {
         Swal.fire({
           title: "Order Failed",
           text: ord.message || "Please try again later.",
           icon: "error",
         });
       }
     })
     .catch((err) => {
       console.error(err);
       Swal.fire({
         title: "Order Failed",
         text: "Please try again later.",
         icon: "error",
       });
     });
 };


  return cardProduts.length > 0 ? (
    <div>
      <h1 className="text-5xl my-1 text-center underline mb-1 font-poppins font-bold text-blue-500">
        Card Page
      </h1>
      <div className="w-[97vw] bg-gray-300 p-5 mx-auto rounded-lg">
        <h1 className="text-4xl font-bold font-[manrope] text-blue-500 shadow-[0px_0px_4px_white] px-2 rounded-2xl inline">
          Card :{" "}
          <span className="text-white font-bold">
            {cardProduts.length}-items
          </span>
        </h1>

        <div className="flex mt-6">
          <div className="flex mx-auto">
            <div className="w-[55vw]">
              {cardProduts.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 w-190 h-55 bg-white mb-5 items-center gap-x-2 rounded-lg p-3"
                >
                  <div>
                    <img
                      className="size-40"
                      src={item.product.images[0].image}
                      alt={item.product.name}
                    />
                  </div>
                  <div>
                    <Link
                      className="underline text-yellow-300"
                      to={"/product/" + item.product._id}
                    >
                      {item.product.name}
                    </Link>
                  </div>
                  <div className="ml-5">
                    <p>${item.product.price}</p>
                  </div>
                  <div className="w-50 space-x-3 -mx-7 flex items-center">
                    <button
                      className="px-3 py-1 text-white rounded bg-blue-500"
                      onClick={() => handleDecrese(item)}
                    >
                      -
                    </button>
                    {item.count}
                    <button
                      className="px-3 py-1 ml-2 text-white rounded bg-blue-500"
                      onClick={() => handleIncrese(item)}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeCard(item)}
                      className="btn bg-red-500 text-white ml-6 py-2 px-3"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded flex flex-col items-center justify-evenly shadow-[0px_0px_1px_black] w-100 h-100">
              <h1 className="bg-gray-300 text-blue-500 font-bold text-4xl font-[anta] px-10 py-3 rounded">
                Order Summary
              </h1>
              <hr />
              <p className="font-[manrope] font-bold text-3xl">
                Subtotal :{" "}
                {cardProduts.reduce((acc, item) => acc + item.count, 0)} (Units)
              </p>
              <br />
              <p className="font-[manrope] mb-7 font-bold text-3xl">
                Est Total : ₹
                {cardProduts
                  .reduce(
                    (acc, item) => acc + item.product.price * item.count,
                    0
                  )
                  .toFixed(2)}
              </p>
              <button
                onClick={placeOrderHandler}
                className="btn py-2 px-10 bg-blue-500 text-white rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : !ordeMeg ? (
    <h1 className="text-5xl animate-pulse italic mt-5 text-blue-500 font-[poppins] font-bold text-center">
      Card is Empty...!
    </h1>
  ) : (
    <h1 className="text-5xl animate-pulse mt-20 text-green-500 mb-75 font-[poppins] w-150 h-40 rounded-2xl flex flex-col items-center justify-center mx-auto shadow-2xl shadow-black font-bold text-center">
      Order Completed...! 😀
      <p className="text-sm text-blue-500 bg-black/20 py-2 px-2 rounded-lg inline-block">
        Your Order Was Successfully Placed
      </p>
    </h1>
  );
};

export default Card;
