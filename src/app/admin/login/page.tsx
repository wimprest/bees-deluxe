"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/admin");
    } else {
      setError(data.error || "Invalid password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black">
      <div className="w-full max-w-sm px-4">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/bees-logo.png"
            alt="Bees Deluxe"
            width={180}
            height={60}
            className="h-[60px] w-auto"
          />
        </div>
        <h1 className="mb-6 text-center font-heading text-xl text-brand-white">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-none border border-brand-teal/20 bg-brand-slate px-4 py-3 text-brand-white placeholder:text-brand-muted focus:border-brand-teal focus:outline-none"
          />
          {error && (
            <p className="mt-2 text-sm text-brand-red">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-teal-dark disabled:opacity-50"
          >
            {loading ? "..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
