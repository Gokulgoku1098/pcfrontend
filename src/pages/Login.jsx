import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../server/serice";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[-95px] min-h-screen flex flex-col justify-center items-center bg-[#1E2235] px-4">
      <h1 className="text-white text-2xl font-bold mb-8">Your Account</h1>

      <div className="bg-white w-full max-w-[400px] rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md mb-6"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
