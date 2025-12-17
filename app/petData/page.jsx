"use client";

import { useEffect, useState } from "react";
import {
  FaDog,
  FaCat,
  FaWeightHanging,
  FaBirthdayCake,
  FaVenusMars,
  FaHeartbeat,
  FaLeaf,
  FaRunning,
  FaPaw,
} from "react-icons/fa";
import api from "@/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useverifyToken";

export default function PetData() {
  useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();



  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get("/api/animals", {
          withCredentials: true,
        });
  
        setPets(res.data.data || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPets();
  }, []);
  

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <FaPaw className="text-5xl text-green-700 mb-4 animate-bounce" />
        <p className="text-lg font-medium">Loading pet data...</p>
      </div>
    );

  if (pets.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <FaPaw className="text-5xl text-green-700 mb-4 animate-bounce" />
        <p className="text-lg font-medium">No pet data found 🐾</p>
      </div>
    );

  return (
    <div className="min-h-screen  bg-gradient-to-b from-green-50 to-white flex justify-center items-center py-10 px-6 gap-8">
      {pets.map((pet) => (
        <div key={pet._id} className="w-full max-w-lg bg-white rounded-xl shadow p-6">
          {/* صورة الحيوان */}
          <div className="relative flex justify-center">
            <img
              src={pet.photo}
              alt={pet.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-green-700 shadow-lg"
            />
           
          </div>

          {/* الاسم والنوع */}
          <h1 className="text-3xl font-extrabold text-green-900 mt-4 flex items-center justify-center gap-2">
            {pet.name}
            {pet.type === "dog" ? (
              <FaDog className="text-yellow-500" />
            ) : (
              <FaCat className="text-yellow-500" />
            )}
          </h1>
          <p className="text-gray-600 font-medium mb-6 text-center">{pet.breedOrSpecies}</p>

          {/* تفاصيل الحيوان */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard icon={<FaBirthdayCake />} title="Age" value={`${pet.age} years`} />
            <InfoCard icon={<FaWeightHanging />} title="Weight" value={`${pet.weight} kg`} />
            <InfoCard icon={<FaVenusMars />} title="Gender" value={pet.gender} />
            <InfoCard icon={<FaHeartbeat />} title="Health" value={pet.healthConsiderations || "N/A"} />
            <InfoCard icon={<FaLeaf />} title="Diet" value={pet.dietaryNeeds || "N/A"} />
            <InfoCard icon={<FaRunning />} title="Activity" value={pet.activityLevel} />
            <InfoCard icon={<FaPaw />} title="Behavior" value={pet.behaviorAndTemperament || "N/A"} />
            <InfoCard icon={<FaDog />} title="Feature" value={pet.identifyingFeatures || "N/A"} />
          </div>
        </div>
      ))}
    </div>
  );
}

// 🔹 مكون صغير لإعادة استخدام كروت التفاصيل
const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center gap-3 border border-green-100">
    <div className="text-green-700 text-xl">{icon}</div>
    <div>
      <p className="text-green-900 font-semibold">{title}</p>
      <p className="text-gray-700 text-sm">{value}</p>
    </div>
  </div>
);
