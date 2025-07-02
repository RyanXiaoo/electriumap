"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { auth } from "../../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccountPage(){
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // Firebase error handling

  const router = useRouter(); 

  // update user's input via 'value'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // clear previous errors

    try {
      // attempt to create a new user with Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("Account created!");
      router.push("/Login");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Create an Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:border-blue-400 text-black"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:border-blue-400 text-black"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-green-700 transition w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
} 

export default CreateAccountPage; 
