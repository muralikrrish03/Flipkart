import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom';
import logo from '/images/products/logo.png'
const Footer = () => {
  return (
    <div
      className="h-30
      mx-auto mt-5  rounded-t-lg list-none text-gray-600 
  
      "
    >
      <div className="w-[90vw] mx-auto flex">
        <div className="w-[60%] ">
          <h1 className="font-poppins flex items-center  font-bold"><img className='size-10' src={logo} alt=""/>urali Web Developer</h1>
          <div className="mt-3">
            <p className="w-[80%]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores,
              quaerat consectetur fugiat fuga odio minima obcaecati quibusdam
              nulla, alias dolor porro perferendis cupiditate inventore ipsum
              atque amet rem. Nemo repudiandae exercitationem voluptatem labore
              perspiciatis porro maxime explicabo id. Harum aspernatur saepe
              officiis cumque tempore at accusantium quisquam minus tempora
              ipsam!
            </p>
          </div>
        </div>

        <div className="w-[20%] ">
          <h1 className="font-poppins  font-bold">Company</h1>
          <div className="mt-3">
            <li>Comapany</li>
            <li>Comapany</li>
            <li>Comapany</li>
            <li>Comapany</li>
          </div>
        </div>
        <div className="w-[20%]">
          <h1 className="font-poppins  font-bold">Get In Touch</h1>
          <div className="mt-3">
            <h1>
              <a href="tel:+916379624329">+91 6379624329</a>
            </h1>
            <h1>
              <a href="mailto:muralikrrish03@gmail.com?subject=Hello&body=I want to know about your service.">
                muralikrrish03@gmail.com
              </a>
            </h1>
          </div>
        </div>
      </div>

      <p className="  mt-2 text-center py-2 shadow-[0px_0px_1px_black]">
        Murali - 2025-2026, All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
