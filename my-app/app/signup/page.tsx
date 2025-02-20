"use client"

import { useState } from "react"
import axios from "@/utils/api"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", contact: "" })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("/auth/register", formData)
      router.push("/login")
    } catch (err) {
      setError("Signup failed")
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="contact" type="text" placeholder="Contact" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}
