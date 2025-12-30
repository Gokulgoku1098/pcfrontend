import React from 'react'
import { Link } from "react-router-dom";

function Interface() {
  return (
    <>
      <div className="h-auto w-full flex flex-col items-center justify-center 
        bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-900 text-white 
        p-5 md:p-10"> 

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-10 md:mb-16">
          
          Select the part you want
        </h1>

        <div className="flex flex-wrap gap-5 md:gap-10 justify-center">
          

          <Link to="/cpu">
            <button className="btnn px-6 py-3 text-xl md:px-10 md:py-5 md:text-3xl 
              text-black rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
              
              CPU
            </button>
          </Link>

          <Link to="/cpucooler">
            <button className="bg-yellow-400 px-6 py-3 text-xl md:px-10 md:py-5 md:text-3xl 
              text-black rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
              CPU COOLER
            </button>
          </Link>

          <Link to="/motherboard">
            <button className="btnn px-6 py-3 text-xl md:px-10 md:py-5 md:text-3xl 
              text-black rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
              MOTHERBOARD
            </button>
          </Link>

          <Link to="/storage">
            <button className="bg-yellow-400 px-6 py-3 text-xl md:px-10 md:py-5 md:text-3xl 
              text-black rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
              STORAGE
            </button>
          </Link>
        </div>

      </div>
    </>
  );
}

export default Interface
