"use client";

import React, { useState } from "react";
import { useAuthToken } from "@/app/hooks/useAuthToken";
import { FaMars, FaVenus, FaPaw } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/axios";
import { useRouter } from "next/navigation";


const PetProfile = () => {

  useAuthToken();

  const [form, setForm] = useState({
    photo: null,
    type: "",
    name: "",
    breedOrSpecies: "",
    otherBreed: "",
    age: "",
    weight: "",
    gender: "",
    identifyingFeatures: [],
    healthConsiderations: [],
    dietaryNeeds: [],
    behavior: [],
    activityLevel: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 دالة موحدة لتبديل العناصر في أي مجموعة
  const toggleSelection = (group, value) => {
    if (form[group].includes(value)) {
      setForm({ ...form, [group]: form[group].filter((v) => v !== value) });
    } else {
      setForm({ ...form, [group]: [...form[group], value] });
    }
  };

  // 🔹 handleChange لباقي الأنواع
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 القوائم
  const breedOptions = [
    "German Shepherd",
    "Bulldog",
    "Persian",
    "Siamese",
    "Labrador",
    "Beagle",
    "Other",
  ];
  const featuresList = [
    "White Spot",
    "Scar",
    "Black Tail",
    "Brown Ear",
    "Spotted",
    "Striped",
    "Blue Eyes",
    "Other",
  ];
  const healthList = [
    "Diabetic",
    "Allergic",
    "Blind",
    "Deaf",
    "Epileptic",
    "Heart",
    "Joint",
    "Other",
  ];
  const dietaryList = ["Grain-Free", "Vegetarian", "High Protein", "Low Fat"];
  const behaviorList = ["Active", "Playful", "Social", "Calm", "Friendly"];

  // 🔹 فورم الإرسال
  const handleSubmit = async (e) => {
    e.preventDefault();

    const breedValue =
      form.breedOrSpecies === "Other" ? (form.otherBreed || "").trim() : form.breedOrSpecies;

    if (!form.photo || !form.type || !form.name || !breedValue || !form.age || !form.weight || !form.gender) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const payload = new FormData();
    payload.append("photo", form.photo);
    payload.append("type", form.type);
    payload.append("name", form.name);
    payload.append("breedOrSpecies", breedValue);
    payload.append("age", form.age);
    payload.append("weight", form.weight);
    payload.append("gender", form.gender);
    payload.append("identifyingFeatures", form.identifyingFeatures.join(","));
    payload.append("healthConsiderations", form.healthConsiderations.join(","));
    payload.append("dietaryNeeds", form.dietaryNeeds.join(","));
    payload.append("behaviorAndTemperament", form.behavior.join(","));
    payload.append("activityLevel", form.activityLevel);

    try {
      const res = await api.post("/api/animals", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Data to store:", res.data.data);
      
      if (res.data?.data) {
        localStorage.setItem("petData", JSON.stringify(res.data.data));}

      toast.success("Pet saved successfully!");
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      console.error("Error saving pet:", error);
      if (error?.response?.status === 401) {
        toast.error("Unauthorized — please login.");
      } else {
        toast.error(error?.response?.data?.message || "Error saving pet.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 عنصر لعرض مجموعة اختيارات (زي identifyingFeatures, health, الخ)
  const renderGroup = (label, groupName, items) => (
    <div>
      <label className="text-black">{label}</label>
      <div className="flex flex-wrap mb-2 mt-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleSelection(groupName, item)}
            className={`px-3 py-1 border rounded-full cursor-pointer m-1 text-sm transition-colors ${
              form[groupName].includes(item)
                ? "bg-green-900 text-white border-green-900"
                : "bg-white text-black border-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 bg-white min-h-screen">
      
      <div className="relative mt-5 ">
             <h1 className="text-xl font-extrabold text-green-800 relative z-10 text-left">pet profile</h1>
             <FaPaw 
               className="absolute bottom-6 left-20 text-yellow-400 text-xl rotate-[35deg] translate-x-[-6px]"
             />
           </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Photo */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {form.photo && <img src={URL.createObjectURL(form.photo)} alt="pet" className="object-cover w-full h-full" />}
          </div>
          <label  htmlFor="photo" className="text-black text-sm">Upload a clear photo *</label>
          <input id="photo" type="file" name="photo" accept="image/*" onChange={handleChange}  className="hidden"/>
        </div>

        {/* Name + Type */}
        <div>
          <label className="text-black">Pet Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border border-black p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-black">Pet Type *</label>
          <select name="type" value={form.type} onChange={handleChange} className="border border-black p-2 rounded w-full">
            <option value="">Select type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Breed */}
        <div>
          <label className="text-black">Breed/Species *</label>
          <div className="flex flex-wrap mb-2 mt-2">
            {breedOptions.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setForm({ ...form, breedOrSpecies: b })}
                className={`px-3 py-1 border rounded-full cursor-pointer m-1 text-sm transition-colors ${
                  form.breedOrSpecies === b
                    ? "bg-green-900 text-white border-green-900"
                    : "bg-white text-black border-black"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {form.breedOrSpecies === "Other" && (
            <input
              type="text"
              name="otherBreed"
              value={form.otherBreed}
              onChange={handleChange}
              placeholder="Enter breed"
              className="border border-black p-2 rounded w-full mt-2"
            />
          )}
        </div>

        {/* Age & Weight */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-black">Age *</label>
            <select name="age" value={form.age} onChange={handleChange} className="border border-black p-2 rounded w-full">
              <option value="">Select age</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n} years</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="text-black">Weight (kg) *</label>
            <select name="weight" value={form.weight} onChange={handleChange} className="border border-black p-2 rounded w-full">
              <option value="">Select weight</option>
              {[5, 10, 15, 20, 25, 30].map((n) => (
                <option key={n} value={n}>{n} kg</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-black">Gender *</label>
          <div className="flex items-center gap-6 mt-2">
            <label className={`flex items-center gap-2 cursor-pointer ${form.gender === "male" ? "text-blue-600" : "text-gray-700"}`}>
            <input type="radio" name="gender" value="male" checked={form.gender==="male"} onChange={handleChange} className="hidden"/>
            <FaMars className="text-blue-600" />
            <span>male</span>
            </label>

            <label className={`flex items-center gap-2 cursor-pointer ${form.gender === "female" ? "text-pink-600" : "text-gray-700"}`}>
              <input type="radio" name="gender" value="female" checked={form.gender === "female"} onChange={handleChange} className="hidden" />
              <FaVenus className="text-pink-600" />
              <span>Female</span>
            </label>

            <label className={`flex items-center gap-2 cursor-pointer ${form.gender === "unknown" ? "text-gray-900" : "text-gray-700"}`}>
              <input type="radio" name="gender" value="unknown" checked={form.gender === "unknown"} onChange={handleChange} className="hidden" />
              <span className="px-2 py-1 border rounded">Unknown</span>
            </label>
          </div>
        </div>

        {/* باقي المجموعات */}
        {renderGroup("Identifying Features", "identifyingFeatures", featuresList)}
        {renderGroup("Health Considerations", "healthConsiderations", healthList)}
        {renderGroup("Dietary Needs", "dietaryNeeds", dietaryList)}
        {renderGroup("Temperament & Behavior", "behavior", behaviorList)}

        {/* Activity Level */}
        <div>
          <label className="text-black">Activity Level</label>
          <select name="activityLevel" value={form.activityLevel} onChange={handleChange} className="border border-black p-2 rounded w-full mb-4">
            <option value="">Select level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-900 text-white py-3 rounded font-bold disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default PetProfile;
