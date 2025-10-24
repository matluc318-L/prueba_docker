// src/pages/Profile.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { tokens, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens) {
      navigate("/");
      return;
    }
    getProfile(tokens.access)
      .then((res) => setProfile(res.data))
      .catch(() => logout());
  }, [tokens, navigate, logout]);

  if (!profile) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <p><strong>Email:</strong> {profile.email}</p>
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
