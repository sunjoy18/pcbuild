"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
    const { user } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push("/login")
            return
        }
    }, [])

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">User Profile</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact:</strong> {user.contact}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
