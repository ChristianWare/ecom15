"use client";

import useAuth from "@/hooks/auth";

export default function UserButton() {
  const { login, logout } = useAuth();
  return (
    <div>
      <button
        onClick={() => login()}
        className="rounded-md bg-orange-400 p-2 text-white"
      >
        Login
      </button>
    </div>
  );
}
