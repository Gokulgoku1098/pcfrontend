import React from 'react'

function Placeorder() {
  return (
        <div className="max-w-6xl mx-auto mt-12 p-4">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Place Your Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* ---------------- LEFT SIDE ---------------- */}
        <div className="space-y-6">

          {/* Shipping Details */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Shipping Details</h2>

            <p className="text-gray-700"><span className="font-semibold">Name:</span> John Doe</p>
            <p className="text-gray-700"><span className="font-semibold">Phone:</span> +91 9876543210</p>
            <p className="text-gray-700"><span className="font-semibold">Address:</span> 123, Sample Street, Kerala</p>
          </div>

          {/* Order Items */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Items</h2>

            <div className="space-y-4">

              {/* Single Item */}
              <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg" />
                  <div>
                    <p className="font-semibold text-gray-800">AMD Ryzen Processor</p>
                    <p className="text-gray-600 text-sm">Qty: 1</p>
                  </div>
                </div>

                <p className="font-semibold text-gray-700">$199.99</p>
              </div>

              {/* Another Item (sample) */}
              <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg" />
                  <div>
                    <p className="font-semibold text-gray-800">NVIDIA RTX Graphics Card</p>
                    <p className="text-gray-600 text-sm">Qty: 1</p>
                  </div>
                </div>

                <p className="font-semibold text-gray-700">$499.99</p>
              </div>

            </div>
          </div>

        </div>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md h-fit">

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>

          <div className="flex justify-between mb-3 text-gray-700">
            <p>Subtotal:</p>
            <p>$699.98</p>
          </div>

          <div className="flex justify-between mb-3 text-gray-700">
            <p>Shipping:</p>
            <p>$10.00</p>
          </div>

          <div className="flex justify-between mb-6 font-semibold text-gray-800">
            <p>Total:</p>
            <p>$709.98</p>
          </div>

          <button onClick={() => alert("Order Confirm successfully")} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold shadow">
            Confirm Order
          </button>
        </div>

      </div>
    </div>
  )
}

export default Placeorder