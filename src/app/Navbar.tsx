"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = localStorage.getItem("lotr-current-user");
      setUser(u ? JSON.parse(u) : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("lotr-current-user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="w-full flex justify-between items-center gap-6 py-4 bg-black/80 border-b border-yellow-700 shadow-lg z-50 font-[Ringbearer] text-lg md:text-2xl text-yellow-300 fixed top-0 left-0 px-8">
      <div className="flex gap-6">
        <Link href="/" className="hover:text-yellow-500 transition">Anasayfa</Link>
        <Link href="/characters" className="hover:text-yellow-500 transition">Karakterler</Link>
        <Link href="/stories" className="hover:text-yellow-500 transition">Hikayeler</Link>
        <Link href="/gallery" className="hover:text-yellow-500 transition">Galeri</Link>
        <Link href="/map" className="hover:text-yellow-500 transition">Harita</Link>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-yellow-200 text-base md:text-lg">Merhaba, {user.name}!</span>
            <button onClick={handleLogout} className="bg-yellow-400 text-black font-bold py-1 px-4 rounded hover:bg-yellow-500 transition text-base md:text-lg">Çıkış Yap</button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-yellow-400 text-black font-bold py-1 px-4 rounded hover:bg-yellow-500 transition text-base md:text-lg">Giriş Yap</Link>
            <Link href="/register" className="bg-yellow-400 text-black font-bold py-1 px-4 rounded hover:bg-yellow-500 transition text-base md:text-lg">Kayıt Ol</Link>
          </>
        )}
      </div>
    </nav>
  );
} 