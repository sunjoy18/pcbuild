"use client"

import { useState } from "react"
import axios from "@/utils/api"
import { useRouter } from "next/navigation"
import { login } from "@/utils/auth"
import { useAuth } from "@/contexts/AuthContext"

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const router = useRouter()
    const { setProfile } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            login(formData.email, formData.password)
            const res = await axios.post("/auth/login", formData)
            console.log("formdata : ", res.data.token)
            localStorage.setItem("token", res.data.token)
            setProfile(res.data.token)

            setTimeout(() => {
                router.push("/profile")
            }, 2000)
        } catch (err) {
            setError("Invalid email or password")
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => { router.push('/signup') }} >SignUp</button>
        </div>
    )
}
