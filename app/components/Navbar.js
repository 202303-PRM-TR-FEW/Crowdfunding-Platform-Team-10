import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="flex gap-5 bg-blue-500">
      <h1>Navbar</h1>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/projects">Projects</Link>
    </div>
  );
};
