"use client";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  let menuTimeout: NodeJS.Timeout | null = null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Menü linkleri
  const menuLinks = [
    { href: "/", label: "Anasayfa" },
    { href: "/characters", label: "Karakterler" },
    { href: "/stories", label: "Hikayeler" },
    { href: "/gallery", label: "Galeri" },
    { href: "/map", label: "Harita" },
    { href: "/shop", label: "Ürünlerimiz" },
  ];

  return (
    <nav className="w-full flex justify-between items-center gap-2 sm:gap-6 py-2 sm:py-4 bg-black/80 border-b border-yellow-700 shadow-lg z-50 font-[Ringbearer] text-sm sm:text-lg md:text-2xl text-yellow-300 fixed top-0 left-0 px-2 sm:px-8">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <Link href="/" className="text-yellow-400 font-bold text-lg sm:text-xl md:text-2xl hover:text-yellow-500 transition">
          LOTR
        </Link>
      </div>
      {/* Menü Linkleri (PC) */}
      <div className="hidden md:flex gap-4 lg:gap-6">
        {menuLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={
              (pathname === link.href
                ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                : "hover:text-yellow-500 transition") +
              " px-3 py-1 rounded-md whitespace-nowrap"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
      {/* Auth/Cart (PC) */}
      <div className="hidden md:flex gap-2 lg:gap-4 items-center">
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
      {/* Hamburger Menü (Mobil) */}
      <div className="md:hidden flex items-center gap-2">
        {/* Sepet butonu mobilde */}
        {!loading && user && (
          <Link href="/cart">
            <button className="bg-yellow-400 text-black font-bold py-1 px-2 rounded hover:bg-yellow-500 transition text-sm relative flex items-center">
              Sepet
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="ml-1 bg-red-600 text-white rounded-full px-1 py-0.5 text-xs font-bold shadow-lg border border-yellow-400"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </Link>
        )}
        {/* Hamburger buton */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-yellow-400 hover:text-yellow-500 transition p-2"
          aria-label="Menüyü Aç/Kapat"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-black border-b border-yellow-700 p-4 max-h-[70vh] overflow-y-auto rounded-b-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4 text-yellow-300">
              {menuLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    (pathname === link.href
                      ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                      : "hover:text-yellow-500 transition") +
                    " py-3 text-lg rounded px-2"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Kullanıcı işlemleri ve giriş/çıkış butonları mobilde büyük ve dokunmatik dostu olacak */}
              {!loading && (
                <>
                  {user ? (
                    <>
                      <span className="text-yellow-200 text-base md:text-lg">Merhaba, {user.displayName || user.email}!</span>
                      <Link href="/orders" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Siparişlerim</Link>
                      <Link href="/requests" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Soru ve Taleplerim</Link>
                      <Link href="/offers" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Sana Özel Fırsatlar</Link>
                      <Link href="/profile" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Kullanıcı Bilgilerim</Link>
                      <Link href="#" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Değerlendirmelerim</Link>
                      <Link href="#" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Beğendiklerim</Link>
                      <Link href="#" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>Tüm Listelerim</Link>
                      <button onClick={handleLogout} className="w-full text-left hover:bg-red-600 hover:text-white py-2 px-2 rounded mt-2">Çıkış Yap</button>
                    </>
                  ) : (
                    <div className="border-t border-yellow-700 pt-4 mt-4 flex gap-2">
                      <Link href="/login" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition text-sm flex-1 text-center" onClick={() => setMobileMenuOpen(false)}>Giriş</Link>
                      <Link href="/register" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition text-sm flex-1 text-center" onClick={() => setMobileMenuOpen(false)}>Kayıt</Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 