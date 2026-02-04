import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  console.log("Sending data:", form); 
  try {
    await API.post("/register", form);
    alert("Registration Successful! Redirecting to login...");
    navigate("/");
  } catch (error) {
    console.error("Registration Error:", error.response.data);
    alert("Error: " + error.response.data.msg);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96">

        <h2 className="text-xl font-bold text-center mb-4">
          Student Registration
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 rounded" />
          <input name="dob" type="date" onChange={handleChange} className="border p-2 rounded" />
        </div>

        <input name="gender" placeholder="Gender" onChange={handleChange} className="border p-2 rounded w-full mt-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded w-full mt-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded w-full mt-2" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 rounded w-full mt-2" />
        <input name="address" placeholder="Address" onChange={handleChange} className="border p-2 rounded w-full mt-2" />
        <input name="qualification" placeholder="Qualification" onChange={handleChange} className="border p-2 rounded w-full mt-2" />

        <button className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}
