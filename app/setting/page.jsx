"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPaw } from "react-icons/fa";
import { useAuth } from "@/app/hooks/useverifyToken";
import api from "@/axios";

export default function MyPets() {
  useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPet, setEditingPet] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const router = useRouter();

  
  // 🐾 جلب الحيوانات من الباك اند
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get("/api/animals", {
          withCredentials: true,
        });
        console.log("📦 API response:", res.data);
        setPets(res.data.data || []);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // بدء التعديل
  const handleEdit = (pet) => {
    setEditingPet(pet._id);
    setEditedData({ ...pet });
  };

  // إرسال التعديل للـ API (يدعم الصورة كمان)
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("type", editedData.type);
      formData.append("age", editedData.age);
      formData.append("gender", editedData.gender);
      if (newPhoto) formData.append("photo", newPhoto);

      const response = await api.patch(`/api/animals/${editingPet}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPets((prev) =>
        prev.map((pet) =>
          pet._id === editingPet ? { ...pet, ...response.data.data } : pet
        )
      );

      setEditingPet(null);
      setNewPhoto(null);
      console.log("✅ Animal updated successfully:", response.data.message);
    } catch (error) {
      console.error(
        "❌ Error updating animal:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Error while updating pet");
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <FaPaw className="text-5xl text-green-700 mb-4 animate-bounce" />
        <p className="text-lg font-medium">Loading pets...</p>
      </div>
    );
  

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* 🔹 العنوان + زر الإضافة */}
      <div className=" flex justify-between items-center mb-6">
        <h1 className="relative flex items-center gap-2 text-2xl font-semibold text-green-700">
          <FaPaw className="absolute bottom-6 -right-2 text-yellow-400 text-3xl rotate-[25deg]" />
          My Pets
        </h1>
        <button
          onClick={() => router.push("/profile")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          + Add Pet
        </button>
      </div>

      {/* لو مفيش حيوانات */}
      {pets.length === 0 ? (
        <p className="text-gray-500 text-center">No pets found yet.</p>
      ) : (
        <div className="space-y-4">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="p-4  rounded-lg shadow-sm bg-white"
            >
              {editingPet === pet._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={editedData.name || ""}
                    onChange={handleChange}
                    className="border-b-2 border-green-500 focus:outline-none shadow-sm shadow-white rounded px-3 py-1 w-full"
                    placeholder="Pet Name"
                  />
                  <input
                    type="text"
                    name="type"
                    value={editedData.type || ""}
                    onChange={handleChange}
                    className="border-b-2 border-green-500 focus:outline-none shadow-sm shadow-white rounded px-3 py-1 w-full"
                    placeholder="Type"
                  />
                  <input
                    type="number"
                    name="age"
                    value={editedData.age || ""}
                    onChange={handleChange}
                    className="border-b-2 border-green-500 focus:outline-none shadow-sm shadow-white rounded px-3 py-1 w-full"
                    placeholder="Age"
                  />
                  <select
                    name="gender"
                    value={editedData.gender || ""}
                    onChange={handleChange}
                    className="border-b-2 border-green-500 focus:outline-none shadow-sm shadow-white rounded px-3 py-1 w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>

                  {/* 🔹 تعديل الصورة */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Pet Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewPhoto(e.target.files[0])}
                      className="border-b-2 border-green-500 focus:outline-none shadow-sm shadow-white rounded px-3 py-1 w-full"
                    />
                    {pet.photo && (
                      <img
                        src={pet.photo}
                        alt={pet.name}
                        className="mt-2 w-24 h-24 object-cover rounded"
                      />
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPet(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {pet.photo && (
                      <img
                        src={pet.photo}
                        alt={pet.name}
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold">{pet.name}</h2>
                      <p className="text-sm text-gray-600">
                        {pet.type} - {pet.age} years old -{" "}
                        {pet.gender === "male"
                          ? "Male"
                          : pet.gender === "female"
                          ? "Female"
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(pet)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
