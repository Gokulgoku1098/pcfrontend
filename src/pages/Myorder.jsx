import React, { useEffect, useState } from "react";
import { getMyOrders } from "../server/serice";
import { FaEye, FaTimes, FaBox, FaMapMarkerAlt, FaCheck } from "react-icons/fa";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderSteps = ["pending", "processing", "shipped", "delivered"];

  const stepLabels = {
    "pending": "Reviewing",
    "processing": "Order Placed",
    "shipped": "Shipped",
    "delivered": "Delivered"
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login first");
          return;
        }
        const res = await getMyOrders(token);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCloseModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setSelectedOrder(null);
    }
  };

  const getCurrentStepIndex = (status) => {
    return orderSteps.indexOf(status);
  };

  if (loading) return <div className="p-10 text-xl text-center">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <FaBox className="text-4xl mb-2" />
        <p className="text-xl">No orders found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {/* Main Order List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="font-bold text-lg text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                    'bg-yellow-100 text-yellow-700'}`}>
                {order.status}
              </span>
              <p className="font-bold text-gray-700">₹{order.totalPrice}</p>
              <button
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                <FaEye /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*ORDER DETAILS POPUP*/}
      {selectedOrder && (
        <div
          id="modal-overlay"
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                <p className="text-xs text-gray-500">ID: {selectedOrder._id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-red-500 p-2">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto">

              {/* 1. TRACKING BAR (Amazon Style) */}
              <div className="mb-8 mt-2 px-2"> 
                <div className="relative flex items-center justify-between w-full">

                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>

                  <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 transition-all duration-500"
                    style={{
                      width: `${(getCurrentStepIndex(selectedOrder.status?.toLowerCase()) / (orderSteps.length - 1)) * 100}%`
                    }}
                  ></div>

                  {orderSteps.map((step, index) => {
                    const currentStatusIndex = getCurrentStepIndex(selectedOrder.status?.toLowerCase());
                    const isCompleted = index <= currentStatusIndex;

                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center bg-white px-2">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors duration-300
                        ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                          {isCompleted ? <FaCheck size={12} /> : <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
                        </div>
                        <p className={`text-xs font-semibold mt-2 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                          {stepLabels[step]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 2. ADDRESS SECTION */}
              {selectedOrder.Address && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3 border-b border-blue-200 pb-2">
                    <FaMapMarkerAlt className="text-blue-600" /> Delivery Address
                  </h3>
                  <div className="text-sm text-gray-700 grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Recipient</p>
                      <p className="font-semibold text-lg">{selectedOrder.Address.fullName}</p>
                      <p>{selectedOrder.Address.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
                      <p>{selectedOrder.Address.street}</p>
                      <p>{selectedOrder.Address.city}, {selectedOrder.Address.pincode}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. ITEMS LIST */}
              <h3 className="font-bold text-gray-800 mb-3">Items Ordered</h3>
              <div className="border rounded-xl overflow-hidden mb-6">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-b last:border-0 hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Part Type: {item.partType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-700">₹{item.price}</p>
                      <p className="text-xs text-gray-500">Qty: 1</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center shrink-0">
              <div className="text-sm text-gray-500">
                Payment: <span className="font-semibold text-gray-700">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Total:</span>
                <span className="text-2xl font-bold text-indigo-600">₹{selectedOrder.totalPrice}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;