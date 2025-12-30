import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../server/serice";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({
        name,
        email,
        password
      });

      // store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Account created successfully");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mt-[-45px] flex justify-center items-center min-h-screen px-4"
      style={{
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #334155, #0f172a)",
      }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[430px] border border-white/20">

        <h1 className="text-4xl font-extrabold text-center mb-10 text-white">
          Create Account
        </h1>

        <label className="text-lg font-semibold text-white">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 mb-6 p-3 rounded-xl bg-white/20 text-white outline-none"
          placeholder="Enter name"
        />

        <label className="text-lg font-semibold text-white">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 mb-6 p-3 rounded-xl bg-white/20 text-white outline-none"
          placeholder="Enter email"
        />

        <label className="text-lg font-semibold text-white">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 mb-8 p-3 rounded-xl bg-white/20 text-white outline-none"
          placeholder="Enter password"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-bold"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <div className="text-center mt-8">
          <p className="text-white">
            Already have an account?
            <a href="/login" className="text-blue-400 font-semibold ms-2">
              Sign In
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;
