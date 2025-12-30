import React from "react";
import { Link } from "react-router-dom";
import pcicon from "../assets/pcicon.png";

function Footer() {
  return (
    <div className="w-full bg-gray-700 pt-10 text-white">
      
      <div className="max-w-[1200px] mx-auto px-6">

        
        <div className="flex flex-col md:flex-row justify-between gap-10">

          
          <div className="flex items-center gap-4">
            <img className="w-20 h-20" src={pcicon} alt="logo" />
            <h1 className="font-bold text-2xl">
              Buildify_<span className="text-yellow-400 text-3xl">PC</span>
            </h1>
          </div>

          
          <div className="max-w-md">
            <h2 className="text-xl font-semibold mb-2">About Us</h2>
            <p className="text-gray-200 text-sm">
              Welcome to Buildify PC, your one-stop destination for custom PC
              configuration. We help you design, compare, and build the perfect
              setup for gaming, editing, or professional use — all with
              real-time compatibility checks and smart recommendations.
            </p>
          </div>

          
          <div className="flex flex-col gap-2 text-lg">
            <Link to="/PC_Builder" className="hover:text-blue-400">PC Builder</Link>
            <Link to="/PC_parts" className="hover:text-blue-400">PC Parts</Link>
            <Link to="/Guides" className="hover:text-blue-400">Guides</Link>
            <Link to="/Completed_Builds" className="hover:text-blue-400">Completed Builds</Link>
          </div>
        </div>

        
        <div className="mt-10 border-t border-gray-500 text-center py-4 text-sm">
          © {new Date().getFullYear()} Buildify_PC — All Rights Reserved.
        </div>

      </div>
    </div>
  );
}

export default Footer;
