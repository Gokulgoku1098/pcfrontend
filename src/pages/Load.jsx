import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




function Load() {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); // 2 seconds loading
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div >
        <img className='w-screen h-160' src="https://cdn.dribbble.com/userupload/19445350/file/original-d3c1a1167b18464e2eff6622d09f2dc8.gif" alt="" />
    </div>
  )
}

export default Load