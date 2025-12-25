import React, { useState, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const Slider = ({ products }) => {
 
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    };
    


  return (
    <div className="relative ">
      <div
        className="font-7xl bg-white h-25 w-10 grid z-10 top-20  absolute order-0
        content-center justify-center "
      >
        <IoChevronForward />
      </div>
      <div
        className="font-7xl bg-white h-25 w-10 grid z-10 top-20  -right-58 lg:right-0 absolute order-0
        content-center justify-center "
      >
        <IoChevronForward />
      </div>
      <div
        className=" h-70 w-130  lg:w-[90vw]  overflow-hidden rounded-lg relative mx-auto
    
    "
      >
        <div
          className="flex transition-transform duration-700 h-60  ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {products.map((slide, index) => (
            <div
              key={index}
              className="flex flex-col-reverse   rounded-lg   md:flex-row items-center justify-between bg-[#E6E9F2] -py-8 md:px-14    min-w-full
            "
            >
              <div className=" flex  lg:flex-col h-50">
                <p className="md:text-base text-orange-600 pb-1">
                  Limeited Time offer Deal 40% Off
                </p>
                <h1 className="max-w-lg md:text-[40px] md:leading-[48px] h-40 text-2xl font-semibold">
                  {slide.name}
                </h1>
                <div className="flex items-center mt-4 md:mt-0 ">
                  <button
                    disabled={slide.stock == 0}
                    className="md:px-10 px-7 md:py-2.5 py-2  bg-orange-600 rounded-full text-white font-medium"
                  >
                    Buy now
                  </button>
                  <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                    {slide.buttonText2}
                    <div className="group-hover:translate-x-1 transition">
                      <Link to={"/product/" + slide._id} className="underline">
                        Find More{" "}
                      </Link>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:items-center  justify-center">
                <img
                  className="h-50"
                  src={slide.images[0].image}
                  alt={"hello"}
                />
              </div>
            </div>
          ))}
        </div>

        <div className=" left-1/2 -translate-x-1/2 z-10 flex gap-3  absolute bottom-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "bg-orange-500 w-12 h-3"
                  : "bg-gray-400 w-3 h-3 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
