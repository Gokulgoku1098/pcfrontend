import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addorder } from "../server/serice";
import { FaTimes, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons

function Cart() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for popup visibility

  // State for address form
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle input changes in the address form
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Open the modal
  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    setShowModal(true);
  };

  // Final function to place the order
  const handleFinalOrder = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Basic Validation
    if (!address.fullName || !address.phone || !address.street || !address.pincode) {
      alert("Please fill in all address details");
      return;
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          product: item._id || item.id,
          name: item.name,
          partType: item.category,
          price: Number(item.price),
          quantity: 1,
        })),
        totalPrice: Number(total),
        paymentMethod: "COD",
        Address: address, // sending the address data
      };

      console.log("ORDER PAYLOAD:", orderData);

      await addorder(orderData);

      alert("Order placed successfully!");

      localStorage.removeItem("cart");
      setCart([]);
      setShowModal(false); // Close modal
      setAddress({ fullName: "", phone: "", street: "", city: "", pincode: "" }); // Reset form

    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.error || "Order failed");
    }
  };

  const handleN = () => {
    navigate("/myorder");
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-4 relative">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 md:gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-4">
          {cart.length === 0 && (
            <p className="text-lg md:text-xl text-gray-700">
              Your cart is empty
            </p>
          )}

          {cart.length > 0 && (
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="w-full bg-gray-100 text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">Image</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-contain"
                        />
                      </td>

                      <td className="p-3 font-semibold">
                        <p className="max-w-[200px] md:max-w-none">
                          {item.name}
                        </p>
                      </td>

                      <td className="p-3 font-medium">${item.price}</td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button className="bg-gray-300 px-3 py-1 rounded-lg">
                            -
                          </button>
                          <span>1</span>
                          <button className="bg-gray-300 px-3 py-1 rounded-lg">
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => removeItem(i)}
                          className="text-red-500 font-bold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="flex justify-between text-base md:text-lg mb-4">
            <p>Total Items:</p>
            <p>{cart.length}</p>
          </div>

          <div className="flex justify-between text-base md:text-lg font-semibold text-gray-800 mb-6">
            <p>Total Amount:</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <button
            onClick={handleCheckoutClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow"
          >
            Checkout
          </button>

          <button
            onClick={handleN}
            className="w-full bg-green-600 mt-4 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold shadow"
          >
            My Orders
          </button>
        </div>
      </div>

      {/* === ADDRESS DETAILS POPUP (MODAL) === */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">

            {/* Header */}
            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaMapMarkerAlt /> Delivery Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-blue-700 p-1 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFinalOrder} className="p-6 space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="123 456 7890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <textarea
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Flat No, Building, Street"
                  rows="2"
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="New York"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
              <div className="w-full text-red-500 font-semibold items-center text-center px-2 py-2">Order Taken Only by Cash On Delevery</div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition-all"
                >
                  Confirm Order - ${total.toFixed(2)}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;