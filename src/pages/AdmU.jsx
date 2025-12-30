import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../server/serice";

function UserSection() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(token);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id, token);
    fetchUsers();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mt-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Users</h2>
      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-gray-500">
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b border-gray-700">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <button className="btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserSection;
