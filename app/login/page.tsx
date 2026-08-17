"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Sikeres belépés");

      router.push("/admin");

    } catch (err) {

      console.error(err);

      alert("Bejelentkezési hiba");

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

      <div className="w-full max-w-md rounded-[32px] border border-amber-500/20 bg-[#050505] p-10">

        <div className="mb-10">

          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#C2A56A]
font-semibold px-4 py-2">
            Admin belépés
          </p>

          <h1 className="text-5xl font-light">
            Keszthelyi Ingatlan
          </h1>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="mb-3 block text-zinc-300">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-amber-500/20 bg-black px-6 py-4 outline-none"
            />

          </div>

          <div>

            <label className="mb-3 block text-zinc-300">
              Jelszó
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-amber-500/20 bg-black px-6 py-4 outline-none"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-amber-500 px-10 py-5 text-lg font-semibold text-black transition hover:scale-105 disabled:opacity-50"
          >

            {loading
              ? "Belépés..."
              : "Belépés"}

          </button>

        </form>

      </div>

    </main>
  );
}
