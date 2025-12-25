import React, { useState } from "react";
const Newproduct = ({newPro}) => {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
    description: "",
    ratings: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setProduct((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPro !== 'admin') return alert("not allowed")
    
    
    alert("your are admin")
    
      fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json charset=UTF-8",
        },
      });
    setProduct({
      name: "",
      image: "",
      price: "",
      category: "",
      stock: "",
      seller: "",
      description: "",
      ratings: "",
    });
  };
  return (
    <div>
      <h2 className="text-4xl font-bold font-poppins text-center text-fuchsia-600">
        {" "}
        Newproduct
      </h2>
      <form
        className="
        rounded-lg mt-4 shadow-[0px_0px_10px_black] h-130
        flex flex-col w-100 mx-auto items-center justify-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="gh">Name</label>
        <input
          type="text"
          placeholder="enter Name"
          name="name"
          className="bg-gray-300"
          value={product.name}
          onChange={handelChange}
        />
        <label htmlFor="">Price</label>
        <input
          type="text"
          placeholder="enter Price"
          className="bg-gray-300"
          name="price"
          value={product.price}
          onChange={handelChange}
        />
        <label htmlFor="">Category</label>
        <input
          type="text"
          placeholder="enter Category"
          className="bg-gray-300"
          name="category"
          value={product.category}
          onChange={handelChange}
        />
        <label htmlFor="">Stock</label>
        <input
          type="text"
          className="bg-gray-300"
          placeholder="enter Stock"
          name="stock"
          value={product.stock}
          onChange={handelChange}
        />
        <label htmlFor="">Seller</label>
        <input
          type="text"
          className="bg-gray-300"
          placeholder="enter Seller"
          name="seller"
          value={product.seller}
          onChange={handelChange}
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          placeholder="enter Description"
          name="description"
          className="bg-gray-300"
          value={product.description}
          onChange={handelChange}
        />
        <label htmlFor="">ratings</label>
        <input
          type="text"
          placeholder="enter ratings"
          name="ratings"
          className="bg-gray-300"
          value={product.ratings}
          onChange={handelChange}
        />

        <button className="btn mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
