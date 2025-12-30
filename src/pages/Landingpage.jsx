import React from 'react'
import { Link } from "react-router-dom";
import bacc from "../assets/bacc.jpg";


function Landingpage() {
   return (
  <div
  className="w-full h-120 flex flex-col justify-center items-center text-white bg-cover bg-center"
  style={{ backgroundImage: `url(${bacc})` }}
>
   <div className='blurr w-full h-120 flex flex-col justify-center items-center text-white bg-cover bg-center'>
    <div className="text-center">
      <h1 className="text-6xl font-black leading-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
        Build Your Dream PC <br /> Smarter, Faster
      </h1>
    </div>

    <Link to="/interface">
      <button className="bg-yellow-600 text-black px-16 py-6 rounded-full text-4xl font-bold mt-16 
         shadow-yellow-500 shadow-lg hover:scale-105 hover:shadow-yellow-300 
         transition-all duration-300">
        Build
      </button>
    </Link></div>

    

  </div>
);

}

export default Landingpage