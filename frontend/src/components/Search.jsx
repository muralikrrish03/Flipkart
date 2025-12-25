import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Search = ({setViewSlider,viewSlider}) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleCLick = () => {
    navigate("?keyword=" + keyword);
    setViewSlider(keyword);
    
  };


 
  return (
    <div>
      <div className="my-5 bg-gray-300 ml-23 rounded-full flex items-center">
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          name=""
          id="btns"
          className="border-none   w-20  ml-30 lg:w-100  px-5 outline-none h-10  my-auto"
          onBlur={handleCLick}
        />
        <IoIosSearch
          onClick={handleCLick}
          className="b size-8 mr-2 text-white"
        />
      </div>
      
    </div>
  );
};

export default Search;
