"use client";
import React, { useState } from "react";
import axios from "axios";

const PetProfile = () => {
  const [photo, setPhoto] = useState(null);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [breedOrSpecies, setBreedOrSpecies] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [identifyingFeatures, setIdentifyingFeatures] = useState([]);
  const [healthConsiderations, setHealthConsiderations] = useState([]);
  const [dietaryNeeds, setDietaryNeeds] = useState([]);
  const [behavior, setBehavior] = useState([]);
  const [activityLevel, setActivityLevel] = useState("");

  const toggleSelection = (value, arraySetter, array) => {
    if (array.includes(value)) {
      arraySetter(array.filter((item) => item !== value));
    } else {
      arraySetter([...array, value]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    formData.append("name", petName);
    formData.append("type", petType);
    formData.append("breedOrSpecies", breedOrSpecies);
    formData.append("age", age);
    formData.append("weight", weight);
    formData.append("identifyingFeatures", identifyingFeatures.join(","));
    formData.append("healthConsiderations", healthConsiderations.join(","));
    formData.append("dietaryNeeds", dietaryNeeds.join(","));
    formData.append("behaviorAndTemperament", behavior.join(","));
    formData.append("activityLevel", activityLevel);

    try {
      const res = await axios.post(
        "YOUR_BACKEND_URL/api/animals",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        }
      );
      console.log("Pet saved successfully:", res.data);
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

  const circleClass = (selected, value) =>
    `px-3 py-1 border rounded-full cursor-pointer m-1 text-sm transition-colors ${
      selected === value || selected.includes(value)
        ? "bg-green-900 text-white border-green-900"
        : "bg-white text-black border-black"
    }`;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 bg-white">
      <h1 className="text-2xl font-bold text-left text-black">Pet Profile</h1>

      {/* Upload Photo */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="pet"
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <label className="text-black text-sm">Upload a clear photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </div>

      {/* Pet Name & Type */}
      <div className="flex flex-col space-y-4">
        <label className="text-black">Pet Name</label>
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="border border-black p-2 rounded"
        />

        <label className="text-black">Pet Type</label>
        <select
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          className="border border-black p-2 rounded"
        >
          <option value="">Select type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>

        <label className="text-black">Breed/Species</label>
        <div className="flex flex-wrap mb-2">
          {["German Shepherd", "Bulldog", "Persian", "Siamese", "Labrador", "Beagle", "Other"].map(
            (item) => (
              <div
                key={item}
                className={circleClass(breedOrSpecies, item)}
                onClick={() => setBreedOrSpecies(item)}
              >
                {item}
              </div>
            )
          )}
        </div>
        <input
          type="text"
          placeholder="Other Breed"
          value={breedOrSpecies === "Other" ? breedOrSpecies : ""}
          onChange={(e) => setBreedOrSpecies(e.target.value)}
          className="border border-black p-2 rounded"
        />

        {/* Age & Weight */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-black">Age</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-black p-2 rounded w-full"
            >
              <option value="">Select age</option>
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <option key={n} value={n}>{n} years</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-black">Weight (kg)</label>
            <select
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-black p-2 rounded w-full"
            >
              <option value="">Select weight</option>
              {[5,10,15,20,25,30].map((n) => (
                <option key={n} value={n}>{n} kg</option>
              ))}
            </select>
          </div>
        </div>

        {/* Identifying Features */}
        <label className="text-black">Identifying Features</label>
        <div className="flex flex-wrap mb-2">
          {["White Spot", "Scar", "Black Tail", "Brown Ear", "Spotted", "Striped", "Blue Eyes", "Other"].map(
            (item) => (
              <div
                key={item}
                className={circleClass(identifyingFeatures, item)}
                onClick={() => toggleSelection(item, setIdentifyingFeatures, identifyingFeatures)}
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* Health Considerations */}
        <label className="text-black">Health Considerations</label>
        <div className="flex flex-wrap mb-2">
          {["Diabetic", "Allergic", "Blind", "Deaf", "Epileptic", "Heart", "Joint", "Other"].map(
            (item) => (
              <div
                key={item}
                className={circleClass(healthConsiderations, item)}
                onClick={() => toggleSelection(item, setHealthConsiderations, healthConsiderations)}
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* Dietary Needs */}
        <label className="text-black">Dietary Needs</label>
        <div className="flex flex-wrap mb-2">
          {["Grain-Free", "Vegetarian", "High Protein", "Low Fat"].map((item) => (
            <div
              key={item}
              className={circleClass(dietaryNeeds, item)}
              onClick={() => toggleSelection(item, setDietaryNeeds, dietaryNeeds)}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Temperament & Behavior */}
        <label className="text-black">Temperament & Behavior</label>
        <div className="flex flex-wrap mb-2">
          {["Active", "Playful", "Social", "Calm", "Friendly"].map((item) => (
            <div
              key={item}
              className={circleClass(behavior, item)}
              onClick={() => toggleSelection(item, setBehavior, behavior)}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Activity Level */}
        <label className="text-black">Activity Level</label>
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="border border-black p-2 rounded w-full mb-4"
        >
          <option value="">Select level</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-900 text-white py-3 rounded font-bold"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default PetProfile;
