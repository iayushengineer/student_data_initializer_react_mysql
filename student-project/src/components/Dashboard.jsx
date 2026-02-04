import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile").then(res => setProfile(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-center">My Profile</h2>

        <div className="space-y-2 text-sm">
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Phone:</b> {profile.phone}</p>
          <p><b>Qualification:</b> {profile.qualification}</p>
        </div>

        <button
          onClick={() => navigate("/edit")}
          className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
