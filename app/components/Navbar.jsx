"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex gap-5 bg-blue-500">
      <Link href="/">Home</Link>

      <Link href="/projects">Projects</Link>
      {user ? (
        <>
          <Link href="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
};
