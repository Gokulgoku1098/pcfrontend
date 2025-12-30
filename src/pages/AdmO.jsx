// import { useEffect, useState } from "react";
// import { getOrders, updateOrderStatus, deleteOrder } from "../server/serice";

// function OrderSection() {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await getOrders(token);
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleStatusChange = async (order, status) => {
//     await updateOrderStatus(order._id, status, token);
//     fetchOrders();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this order?")) return;
//     await deleteOrder(id, token);
//     fetchOrders();
//   };

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mt-4">
//       <h2 className="text-xl font-semibold mb-4">Orders</h2>
//       <table className="w-full text-left">
//         <thead>
//           <tr className="border-b border-gray-500">
//             <th className="p-2">Order ID</th>
//             <th className="p-2">User</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Total</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <tr key={order._id} className="border-b border-gray-700">
//               <td className="p-2">{order._id}</td>
//               <td className="p-2">{order.user?.name}</td>
//               <td className="p-2 text-yellow-400">{order.status}</td>
//               <td className="p-2">₹{order.totalPrice}</td>
//               <td className="p-2">
//                 <button className="btn-small mr-2" onClick={() => handleStatusChange(order, "shipped")}>Mark Shipped</button>
//                 <button className="btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default OrderSection;
import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, deleteOrder } from "../server/serice";
import { FaEye, FaTrash, FaTimes, FaMapMarkerAlt, FaUser, FaBoxOpen } from "react-icons/fa";

function OrderSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // For the popup
  const token = localStorage.getItem("token");

  // Status options for the dropdown
  const statusOptions = ["pending", "processing", "shipped", "delivered"];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders(token);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus, token);
      
      // Update local state to reflect change immediately without refetching
      setOrders(orders.map(order => 
        order._id === id ? { ...order, status: newStatus } : order
      ));
      
      // Also update the selected order if it's open
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this order?")) return;
    try {
      await deleteOrder(id, token);
      setOrders(orders.filter(order => order._id !== id));
      if (selectedOrder?._id === id) setSelectedOrder(null);
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  // Helper for status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
        <FaBoxOpen /> Order Management
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300 border-collapse">
            <thead>
              <tr className="border-b border-gray-600 bg-gray-700 text-gray-200">
                <th className="p-4 rounded-tl-lg">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total</th>
                <th className="p-4 rounded-tr-lg text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-400">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-medium text-white">{order.user?.name || "Unknown"}</td>
                  <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">₹{order.totalPrice}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                      title="Delete Order"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="text-center text-gray-500 py-8">No orders found.</p>}
        </div>
      )}

      {/*Admin Detial Model*/}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
            
            {/* Header */}
            <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
                <p className="text-xs text-gray-500">ID: {selectedOrder._id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              
              {/* STATUS CONTROL */}
              <div className="mb-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-center justify-between">
                <span className="font-semibold text-indigo-900">Current Status:</span>
                <select 
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  className="bg-white border border-indigo-300 text-indigo-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 font-bold uppercase"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* GRID: Customer & Address */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                
                {/* Customer Info */}
                <div className="border rounded-lg p-4">
                  <h4 className="flex items-center gap-2 font-bold text-gray-700 mb-3 border-b pb-2">
                    <FaUser className="text-gray-400" /> Customer
                  </h4>
                  <p className="text-sm"><span className="font-semibold">Name:</span> {selectedOrder.user?.name}</p>
                  <p className="text-sm"><span className="font-semibold">Email:</span> {selectedOrder.user?.email}</p>
                  <p className="text-sm"><span className="font-semibold">User ID:</span> {selectedOrder.user?._id}</p>
                </div>

                {/* Shipping Address */}
                {selectedOrder.Address && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="flex items-center gap-2 font-bold text-gray-700 mb-3 border-b pb-2">
                      <FaMapMarkerAlt className="text-red-500" /> Shipping Address
                    </h4>
                    <p className="font-semibold text-gray-800">{selectedOrder.Address.fullName}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.Address.street}</p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.Address.city}, {selectedOrder.Address.pincode}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">📞 {selectedOrder.Address.phone}</p>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <h4 className="font-bold text-gray-700 mb-2">Order Items</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">Qty</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {item.name}
                          <div className="text-xs text-gray-400">{item.partType}</div>
                        </td>
                        <td className="px-4 py-3 text-right">₹{item.price}</td>
                        <td className="px-4 py-3 text-right">{item.quantity || 1}</td>
                        <td className="px-4 py-3 text-right font-bold">₹{item.price * (item.quantity || 1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSection;