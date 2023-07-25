"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      className="btn-primary fixed z-50 top-56 left-0"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {resolvedTheme === "dark" ? "light" : "dark"}
    </button>
  );
};

export default ThemeButton;
