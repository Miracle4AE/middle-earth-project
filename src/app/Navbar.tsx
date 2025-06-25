"use client";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  let menuTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const updateCartCount = () => {
      const cart: { quantity?: number }[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
      const total = cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    // Sepete ekleme sonrası da güncellenmesi için interval ekle
    const interval = setInterval(updateCartCount, 500);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
    }
  };

  const handleMenuEnter = () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setMenuOpen(true);
  };
  const handleMenuLeave = () => {
    menuTimeout = setTimeout(() => setMenuOpen(false), 200);
  };

  return (
    <nav className="w-full flex justify-between items-center gap-6 py-4 bg-black/80 border-b border-yellow-700 shadow-lg z-50 font-[Ringbearer] text-lg md:text-2xl text-yellow-300 fixed top-0 left-0 px-8">
      <div className="flex gap-6">
        <Link href="/" className="hover:text-yellow-500 transition">Anasayfa</Link>
        <Link href="/characters" className="hover:text-yellow-500 transition">Karakterler</Link>
        <Link href="/stories" className="hover:text-yellow-500 transition">Hikayeler</Link>
        <Link href="/gallery" className="hover:text-yellow-500 transition">Galeri</Link>
        <Link href="/map" className="hover:text-yellow-500 transition">Harita</Link>
        <Link href="/shop" className="hover:text-yellow-500 transition font-bold">Ürünlerimiz</Link>
      </div>
      <div className="flex gap-4 items-center">
        {!loading && (
          <>
            {user ? (
              <>
                <span className="text-yellow-200 text-base md:text-lg">Merhaba, {user.displayName || user.email}!</span>
                <div className="relative"
                  onMouseEnter={handleMenuEnter}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    ref={profileBtnRef}
                    onClick={() => setMenuOpen((v) => !v)}
                    className="bg-yellow-400 text-black font-bold py-1 px-4 rounded ml-4 hover:bg-yellow-500 transition text-base md:text-lg"
                  >
                    Profilim
                  </button>
                  {menuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-black border-2 border-yellow-700 rounded-xl shadow-2xl z-50 flex flex-col text-base animate-fade-in"
                    >
                      <Link href="/orders" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">Siparişlerim</Link>
                      <Link href="/requests" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">Soru ve Taleplerim</Link>
                      <Link href="/offers" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">Sana Özel Fırsatlar</Link>
                      <Link href="/profile" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">Kullanıcı Bilgilerim</Link>
                      <Link href="#" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">Değerlendirmelerim</Link>
                      <Link href="#" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">Beğendiklerim</Link>
                      <Link href="#" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">Tüm Listelerim</Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-red-600 hover:text-white rounded-b-xl">Çıkış Yap</button>
                    </div>
                  )}
                </div>
                <Link href="/cart">
                  <button className="bg-yellow-400 text-black font-bold py-1 px-4 rounded ml-4 hover:bg-yellow-500 transition text-base md:text-lg relative flex items-center">
                    Sepetim
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="ml-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-lg border-2 border-yellow-400"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="bg-yellow-400 text-black font-bold py-1 px-4 rounded hover:bg-yellow-500 transition text-base md:text-lg">Giriş Yap</Link>
                <Link href="/register" className="bg-yellow-400 text-black font-bold py-1 px-4 rounded hover:bg-yellow-500 transition text-base md:text-lg">Kayıt Ol</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
} 