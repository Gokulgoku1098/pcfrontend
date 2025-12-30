import { NavLink, Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="min-h-70 bg-gray-100 ">
      {/* Header */}
      <header className="bg-white shadow px-4 py-3 ">
        <h1 className="text-xl font-semibold text-gray-800">
          Admin Panel
        </h1>
      </header>

      {/* Layout */}
      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="bg-white w-full md:w-64 shadow-md ">
          <nav className="flex md:flex-col justify-around md:justify-start p-3 gap-2">
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-center md:text-left 
                ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="products"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-center md:text-left 
                ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="users"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-center md:text-left 
                ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`
              }
            >
              Users
            </NavLink>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin;

