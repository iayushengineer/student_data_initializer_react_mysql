import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile").then(res => setForm(res.data));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateProfile = async e => {
    e.preventDefault();
    await API.put("/profile", form);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={updateProfile}
        className="bg-white p-6 rounded-xl shadow-md w-96">

        <h2 className="text-xl font-bold text-center mb-4">
          Edit Profile
        </h2>

        <input name="name" value={form.name || ""} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
        <input name="phone" value={form.phone || ""} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
        <input name="address" value={form.address || ""} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
        <input name="qualification" value={form.qualification || ""} onChange={handleChange} className="border p-2 rounded w-full mb-2" />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
