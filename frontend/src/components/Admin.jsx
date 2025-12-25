import React, { useEffect, useState } from "react";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.order))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);


  return (
    <div className="w-[97vw] rounded-lg flex mx-auto h-[90vh] mt-5">
      <div className="w-[30%] rounded-l-lg shadow-[0px_0px_1px_black]">
        <button className="bg-gradient-to-r from-pink-600 to-fuchsia-500 m-5">
          Orders
        </button>
        <p>Users</p>
        <p>Orders</p>
      </div>
      <div className="shadow-[0px_0px_1px_black] w-[100%] p-4  rounded-r-lg">
        <table className="w-full mt-3 rounded-lg overflow-hidden shadow-[0px_0px_1px_black] ">
          <thead className="rounded-t-4xl ">
            <tr className="bg-gradient-to-r bg-fuchsia-600 to-purple-600 text-amber-50 text-xl rounded-t-4xl  ">
              <th className="w-[20%] p-2">user</th>
              <th className="w-[20%] p-2">email</th>
              <th className="w-[20%] p-2">Product</th>
              <th className="w-[20%] p-2">Price</th>
              <th className="w-[20%] p-2">Total Units</th>
              <th className="w-[20%] p-2"></th>
              <th className="w-[20%] p-2">Total Amount</th>
            </tr>
          </thead>
          <tbody className="">
            {orders.map((item) => (
              <React.Fragment key={item._id}>
                {item.cardItems.map((order) => (
                  <tr key={order.product._id} className="border-b">
                    <td className="px-30  py-2">{item.user}</td>
                    <td className="px-2 py-2">{item.email}</td>
                    <td className="px-2 py-2">{order.product.name}</td>
                    <td className="px-25 py-2">${order.product.price}</td>
                    <td className="px-2 py-2">{order.count}</td>
                    <td className="px-2 py-2"></td>
                    <td className="px-2 py-2"></td>
                  </tr>
                ))}
                <tr className="bg-gray-300 font-semibold">
                  <td colSpan="4" className="p-2 text-right">
                    Order Summary:
                  </td>
                  <td className="px-2 ">
                    {item.cardItems.reduce((acc, cur) => acc + cur.count, 0)}
                  </td>
                  <td className="p-2 relative left-20">${item.amount}</td>
                </tr>
              </React.Fragment>
            ))}
            <tr className=" font-bold">
              <td colSpan="4" className="p-2 text-right">
                Grand Total:
              </td>
              <td className="p-2">
                {orders.reduce(
                  (acc, item) =>
                    acc + item.cardItems.reduce((a, c) => a + c.count, 0),
                  0
                )}
              </td>
              <td className="p-2 relative left-20">
                $
                {orders
                  .reduce((acc, item) => acc + parseFloat(item.amount), 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
