import React, { useEffect, useState } from "react";
import { getallProduct } from "../server/serice";
import { useNavigate } from "react-router-dom";

function Motherboard() {
  const [cart, setCart] = useState([]);
  const [product, setproduct] = useState([])

  const loaddata = async () => {
    try {
      const result = await getallProduct()
      const filtered = result.data.filter(
        (item) => item.category === "motherboard")
      setproduct(filtered)
      console.log(product);
    }
    catch (err) {
      console.log("motherboard error", err);

    }
  }

  useEffect(() => {
    loaddata()
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const addToCart = (item) => {
    const updated = [...cart, item];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    alert("Added to cart");
  };
  const navigate = useNavigate()

  const handleNav = (id) => {
    navigate(`/detial/${id}`)
  }

  return (
    <>
      <div className="mt-[-28px] flex justify-center items-center font-[1000] 
      h-20 w-full bg-gradient-to-r from-black via-gray-900 via-yellow-500 via-pink-600 to-purple-900">
        <h1 className="text-3xl text-white">Select your Motherboard </h1>
      </div>

      {product.map((motherboard, i) => (
        <div
          onClick={() => { handleNav(motherboard._id)}}
          key={i}
          className="main w-full border border-gray-300 bg-gray-200 shadow-lg
          p-4 flex flex-col md:flex-row items-center gap-4"
        >
          <img
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
            src={motherboard.img || ""}
            alt=""
          />

          <div className="flex-1">
            <h1 className="font-semibold text-lg md:text-xl">{motherboard.name}</h1>
            <h1 className="text-gray-700 mt-2 text-lg">
              Price: ${motherboard.price}
            </h1>

          </div>
          <div className="flex-1">
            <h1 className="text-gray-700 mt-2 text-lg">
              Stock: {motherboard.stock}
            </h1>

          </div>

          <button
            onClick={() => addToCart(motherboard)}
            className="border rounded bg-blue-500 px-4 py-2 text-white
            hover:bg-blue-600 transition w-full md:w-32"
          >
            Add
          </button>
        </div>

        




        
      ))}
    </>
  );
}

export default Motherboard;
