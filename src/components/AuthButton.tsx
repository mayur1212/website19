"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function AuthButton() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, you would authenticate with your backend first
      // For demo purposes, we're creating a user object directly
      await login({
        id: `user-${Date.now()}`,
        email: email || "demo@example.com",
        name: name || "Demo User",
      });
      setIsLoginOpen(false);
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <div className="px-4 py-2">Loading...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium">{user.name || user.email}</p>
          <p className="text-gray-500 text-xs">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      {isLoginOpen ? (
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-2 p-4 border rounded-lg bg-white dark:bg-gray-800"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLoginOpen(false);
                setEmail("");
                setName("");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsLoginOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      )}
    </div>
  );
}

