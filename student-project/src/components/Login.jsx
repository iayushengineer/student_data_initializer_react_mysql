import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    const res = await API.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80">
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Student Login
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-sm text-center mt-3">
          New user? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}
