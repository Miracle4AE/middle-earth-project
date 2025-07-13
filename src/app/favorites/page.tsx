"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../lib/firebase';
import Image from "next/image";

interface Product {
  name: { tr: string; en: string };
  price: string;
  img: string;
  desc: { tr: string; en: string };
  category: string;
}

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang((localStorage.getItem('language') as 'tr' | 'en') || 'tr');
    }
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    const fetchFavorites = async () => {
      if (!db) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setFavorites(userSnap.data().favorites || []);
      } else {
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleAddToCart = (product: Product) => {
    if (typeof window === 'undefined') return;
    const cart = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
    const existingIndex = cart.findIndex((item: any) => item.name === product.name[lang] && item.category === product.category);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ name: product.name[lang], price: product.price, img: product.img, category: product.category, quantity: 1 });
    }
    localStorage.setItem("lotr-cart", JSON.stringify(cart));
    alert("Ürün sepete eklendi!");
  };

  const handleRemoveFavorite = async (product: Product) => {
    if (!user || !db) return;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;
    const favs = userSnap.data().favorites || [];
    const newFavs = favs.filter((fav: Product) => !(fav.name.tr === product.name.tr && fav.category === product.category));
    await updateDoc(userRef, { favorites: newFavs });
    setFavorites(newFavs);
  };

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Beğendiklerim</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {favorites.length === 0 ? (
          <div className="text-yellow-200 text-center col-span-2">Henüz beğendiğiniz bir ürün yok.</div>
        ) : (
          favorites.map((prod, i) => (
            <div key={prod.name.tr + i} className="bg-black/70 rounded-2xl border-2 border-yellow-700 shadow-xl flex flex-col items-center p-6 relative">
              <Image src={prod.img} alt={prod.name[lang]} width={200} height={200} className="w-40 h-40 object-contain mb-4" />
              <h3 className="font-[Ringbearer] text-2xl text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold]">{prod.name[lang]}</h3>
              <p className="text-gray-200 text-center text-base mb-2">{prod.desc[lang]}</p>
              <span className="text-yellow-400 font-bold text-lg mb-2">{prod.price}</span>
              <button
                onClick={() => handleAddToCart(prod)}
                className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-black font-bold text-lg shadow-lg transition-all duration-300 border-2 border-yellow-700 ring-2 ring-yellow-300 mt-2 hover:bg-yellow-400 hover:text-gray-900"
              >
                Sepete Ekle
              </button>
              <button
                onClick={() => handleRemoveFavorite(prod)}
                className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-red-400 via-red-600 to-red-400 text-white font-bold text-lg shadow-lg transition-all duration-300 border-2 border-red-700 ring-2 ring-red-300 mt-2 hover:bg-red-400 hover:text-gray-900"
              >
                Kaldır
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 