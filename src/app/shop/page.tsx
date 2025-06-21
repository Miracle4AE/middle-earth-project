"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  { name: "Yüzükler" },
  { name: "Kılıçlar" },
  { name: "Pelerinler" },
  { name: "Haritalar" },
  { name: "Figürler" },
  { name: "Elf Takıları" },
  { name: "Orta Dünya Kitapları" },
  { name: "Hobbit Eşyaları" },
  { name: "Elf Yayları" },
  { name: "Cüce Baltaları" },
  { name: "Nazgûl Maskeleri" },
  { name: "Ork Zırhları" },
  { name: "Büyücü Asaları" },
  { name: "Gondor Miğferleri" },
  { name: "Rohan At Figürleri" },
  { name: "Orta Dünya Posterleri" },
  { name: "Koleksiyon Kartları" },
  { name: "Koleksiyon Figürleri" },
  { name: "Ev & Ofis" },
  { name: "Aksesuar & Takı" },
  { name: "Kıyafet" },
  { name: "Oyun & Puzzle" },
  { name: "Mutfak" },
  { name: "Koleksiyon Paraları & Replikalar" },
  { name: "Peluş & Oyuncak" },
];

type Product = { name: string; price: string; img: string; desc: string };

const initialProducts: Record<string, Product[]> = {
  "Yüzükler": [
    { name: "Tek Yüzük", price: "99.999₺", img: "/images/one-ring.png", desc: "Sauron'un kudretiyle dövülmüş efsanevi yüzük." },
    { name: "Nenya", price: "49.999₺", img: "/images/gallery/galadriel.jpg", desc: "Galadriel'in yüzüğü, saflığın ve gücün simgesi." },
  ],
  "Kılıçlar": [
    { name: "Andúril", price: "79.999₺", img: "/images/gallery/aragorn.jpg", desc: "Aragorn'un efsanevi kılıcı." },
    { name: "Sting", price: "29.999₺", img: "/images/gallery/frodo.jpg", desc: "Frodo'nun mavi parlayan kılıcı." },
    { name: "Glamdring", price: "39.999₺", img: "/images/gallery/gandalf.jpg", desc: "Gandalf'ın kılıcı, ork avcısı." },
  ],
  "Pelerinler": [
    { name: "Elf Pelerini", price: "9.999₺", img: "/images/gallery/legolas.jpg", desc: "Görünmezlik sağlayan elf pelerini." },
    { name: "Gri Pelerin", price: "7.999₺", img: "/images/gallery/fellowship.jpg", desc: "Fellowship üyelerinin kullandığı pelerin." },
  ],
  "Haritalar": [
    { name: "Orta Dünya Haritası", price: "1.999₺", img: "/images/middle-earth-map.jpg", desc: "Orta Dünya'nın detaylı haritası." },
    { name: "Shire Haritası", price: "1.499₺", img: "/images/gallery/shire.jpg", desc: "Shire bölgesinin detaylı haritası." },
  ],
  "Figürler": [
    { name: "Gandalf Figürü", price: "2.499₺", img: "/images/gallery/gandalf.jpg", desc: "Gandalf'ın detaylı figürü." },
    { name: "Frodo Figürü", price: "2.499₺", img: "/images/gallery/frodo.jpg", desc: "Frodo'nun detaylı figürü." },
  ],
  "Elf Takıları": [
    { name: "Lorien Yaprağı Broşu", price: "999₺", img: "/images/gallery/lorien.jpg", desc: "Lorien yaprağı ile süslenmiş broş." },
    { name: "Evenstar Kolye", price: "1.499₺", img: "/images/gallery/arwen.jpg", desc: "Arwen'in efsanevi kolyesi." },
  ],
  "Orta Dünya Kitapları": [
    { name: "Yüzüklerin Efendisi Seti", price: "2.499₺", img: "/images/gallery/lotr-books.jpg", desc: "J.R.R. Tolkien'in efsanevi üçlemesi." },
    { name: "Hobbit (İllüstrasyonlu)", price: "1.299₺", img: "/images/gallery/hobbit.jpg", desc: "Tolkien'in illüstrasyonlu Hobbit kitabı." },
  ],
  "Hobbit Eşyaları": [
    { name: "Hobbit Kapısı Anahtarlık", price: "299₺", img: "/images/gallery/hobbit-door.jpg", desc: "Bag End'in ikonik kapısı anahtarlık olarak." },
    { name: "Shire Kupası", price: "399₺", img: "/images/gallery/shire-cup.jpg", desc: "Shire temalı kupa." },
  ],
  "Elf Yayları": [
    { name: "Legolas'ın Yayı", price: "5.999₺", img: "/images/gallery/legolas-bow.jpg", desc: "Legolas'ın efsanevi yayı." },
    { name: "Galadhrim Yayı", price: "6.499₺", img: "/images/gallery/galadhrim-bow.jpg", desc: "Lothlórien elflerinin kullandığı yay." },
  ],
  "Cüce Baltaları": [
    { name: "Gimli'nin Baltası", price: "4.999₺", img: "/images/gallery/gimli-axe.jpg", desc: "Gimli'nin efsanevi baltası." },
    { name: "Cüce Savaş Baltası", price: "3.999₺", img: "/images/gallery/dwarf-axe.jpg", desc: "Cüce savaşçıların kullandığı balta." },
  ],
  "Nazgûl Maskeleri": [
    { name: "Nazgûl Maskesi", price: "2.999₺", img: "/images/gallery/nazgul-mask.jpg", desc: "Kara Süvarilerin korkutucu maskesi." },
    { name: "Witch-King Maskesi", price: "3.499₺", img: "/images/gallery/witchking-mask.jpg", desc: "Angmar'ın Cadı Kralı'nın maskesi." },
  ],
  "Ork Zırhları": [
    { name: "Mordor Ork Zırhı", price: "7.999₺", img: "/images/gallery/mordor-armor.jpg", desc: "Mordor orklarından esinlenilmiş zırh." },
    { name: "Uruk-hai Zırhı", price: "8.499₺", img: "/images/gallery/urukhai-armor.jpg", desc: "Uruk-hai savaşçılarının zırhı." },
  ],
  "Büyücü Asaları": [
    { name: "Gandalf'ın Asası", price: "3.999₺", img: "/images/gallery/gandalf-staff.jpg", desc: "Gandalf'ın büyülü asası." },
    { name: "Saruman'ın Asası", price: "4.499₺", img: "/images/gallery/saruman-staff.jpg", desc: "Saruman'ın beyaz asası." },
  ],
  "Gondor Miğferleri": [
    { name: "Gondor Miğferi", price: "2.999₺", img: "/images/gallery/gondor-helmet.jpg", desc: "Gondor askerlerinin miğferi." },
    { name: "Faramir Miğferi", price: "3.499₺", img: "/images/gallery/faramir-helmet.jpg", desc: "Faramir'in kullandığı miğfer." },
  ],
  "Rohan At Figürleri": [
    { name: "Rohan Atı Figürü", price: "1.999₺", img: "/images/gallery/rohan-horse.jpg", desc: "Rohan'ın efsanevi atı figürü." },
    { name: "Shadowfax Figürü", price: "2.499₺", img: "/images/gallery/shadowfax.jpg", desc: "Gandalf'ın atı Shadowfax figürü." },
  ],
  "Orta Dünya Posterleri": [
    { name: "Orta Dünya Poster Seti", price: "499₺", img: "/images/gallery/middleearth-poster.jpg", desc: "Orta Dünya temalı poster seti." },
    { name: "Gondor Poster", price: "299₺", img: "/images/gallery/gondor-poster.jpg", desc: "Gondor temalı poster." },
  ],
  "Koleksiyon Kartları": [
    { name: "LOTR Koleksiyon Kartı Seti", price: "399₺", img: "/images/gallery/lotr-cards.jpg", desc: "Yüzüklerin Efendisi koleksiyon kartları." },
    { name: "Karakter Kartları", price: "299₺", img: "/images/gallery/character-cards.jpg", desc: "Orta Dünya karakter kartları." },
  ],
  "Koleksiyon Figürleri": [
    { name: "Gandalf Figürü", price: "2.499₺", img: "/images/gallery/gandalf.jpg", desc: "Gandalf'ın detaylı figürü." },
    { name: "Legolas Figürü", price: "2.499₺", img: "/images/gallery/legolas.jpg", desc: "Legolas'ın detaylı figürü." },
    { name: "Sauron Figürü", price: "2.499₺", img: "/images/gallery/sauron.jpg", desc: "Sauron'un detaylı figürü." },
  ],
  "Ev & Ofis": [
    { name: "Orta Dünya Haritalı Battaniye", price: "1.999₺", img: "/images/middle-earth-map.jpg", desc: "Orta Dünya haritası ile süslenmiş battaniye." },
    { name: "Orta Dünya Haritalı Yastık", price: "999₺", img: "/images/middle-earth-map.jpg", desc: "Orta Dünya haritası ile süslenmiş yastık." },
  ],
  "Aksesuar & Takı": [
    { name: "Arwen'in Evenstar Kolyesi", price: "1.499₺", img: "/images/gallery/arwen.jpg", desc: "Arwen'in efsanevi kolyesi." },
    { name: "Lorien Yaprağı Broşu", price: "999₺", img: "/images/gallery/lorien.jpg", desc: "Lorien yaprağı ile süslenmiş broş." },
  ],
  "Kıyafet": [
    { name: "Prancing Pony Tişört", price: "499₺", img: "/images/gallery/prancing-pony.jpg", desc: "Prancing Pony temalı tişört." },
    { name: "Fellowship Kapüşonlu", price: "999₺", img: "/images/gallery/fellowship.jpg", desc: "Fellowship temalı kapüşonlu." },
  ],
  "Oyun & Puzzle": [
    { name: "LOTR Masa Oyunu", price: "1.499₺", img: "/images/gallery/lotr-game.jpg", desc: "LOTR temalı masa oyunu." },
    { name: "LOTR Yapboz", price: "499₺", img: "/images/gallery/lotr-puzzle.jpg", desc: "LOTR temalı yapboz." },
  ],
  "Mutfak": [
    { name: "Orta Dünya Temalı Kupa", price: "299₺", img: "/images/gallery/lotr-cup.jpg", desc: "Orta Dünya temalı kupa." },
    { name: "Orta Dünya Temalı Bardak", price: "299₺", img: "/images/gallery/lotr-glass.jpg", desc: "Orta Dünya temalı bardak." },
  ],
  "Koleksiyon Paraları & Replikalar": [
    { name: "Orta Dünya Madeni Parası", price: "999₺", img: "/images/gallery/lotr-coin.jpg", desc: "Orta Dünya temalı madeni para." },
    { name: "Andúril Anahtarlık", price: "499₺", img: "/images/gallery/anduril-keychain.jpg", desc: "Andúril temalı anahtarlık." },
  ],
  "Peluş & Oyuncak": [
    { name: "Legolas Peluş", price: "999₺", img: "/images/gallery/legolas-plush.jpg", desc: "Legolas temalı peluş." },
    { name: "Gollum Peluş", price: "999₺", img: "/images/gallery/gollum-plush.jpg", desc: "Gollum temalı peluş." },
  ],
};

export default function ShopPage() {
  const [selected, setSelected] = useState(categories[0].name);
  const [products] = useState<Record<string, Product[]>>(initialProducts);
  const currentProducts = products[selected] || [];
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  useEffect(() => {
    const u = localStorage.getItem("lotr-current-user");
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert("Sepete eklemek için giriş yapmalısın!");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
    cart.push({ ...product, category: selected });
    localStorage.setItem("lotr-cart", JSON.stringify(cart));
    alert("Ürün sepete eklendi!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen bg-black/70">
        {/* Yan Menü */}
        <aside className="hidden md:flex flex-col w-64 bg-black/80 border-r-2 border-yellow-700 shadow-2xl p-6 gap-4 z-20">
          <h2 className="font-[Ringbearer] text-3xl text-yellow-400 mb-4 drop-shadow-[0_0_10px_gold] text-center">Ürünler</h2>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelected(cat.name)}
                className={`font-[Ringbearer] text-lg ${selected === cat.name ? "bg-yellow-400 text-black border-yellow-400" : "text-yellow-200 bg-black/40 border-yellow-700"} border-2 rounded-lg px-4 py-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-200 shadow-md`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </aside>
        {/* Ana İçerik */}
        <div className="flex-1 flex flex-col items-center justify-start p-6">
          <h1 className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold mb-6 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center">{selected}</h1>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
            {currentProducts.length === 0 ? (
              <div className="text-gray-300 text-center col-span-2">Bu kategoriye ait ürünler yakında eklenecek!</div>
            ) : (
              currentProducts.map((prod: Product, i: number) => (
                <motion.div
                  key={prod.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-black/70 rounded-2xl border-2 border-yellow-700 shadow-xl flex flex-col items-center p-6 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300 group relative overflow-hidden"
                >
                  <Image
                    src={prod.img}
                    alt={prod.name}
                    width={200}
                    height={200}
                    className="w-40 h-40 object-contain mb-4"
                  />
                  <h3 className="font-[Ringbearer] text-2xl text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold]">{prod.name}</h3>
                  <p className="text-gray-200 text-center text-base mb-2">{prod.desc}</p>
                  <span className="text-xl font-bold text-yellow-400 drop-shadow-[0_0_10px_gold] mb-2">{prod.price}</span>
                  <motion.button
                    whileHover={user ? { scale: 1.08, boxShadow: "0 0 30px #FFD700" } : {}}
                    className={`w-full px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-black font-bold text-lg shadow-lg transition-all duration-300 border-2 border-yellow-700 ring-2 ring-yellow-300 ${user ? "hover:bg-yellow-400 hover:text-gray-900 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                    onClick={() => handleAddToCart(prod)}
                    disabled={!user}
                  >
                    Sepete Ekle
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08, boxShadow: "0 0 30px #FFD700" }}
                    className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-black font-bold text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900 border-2 border-yellow-700 ring-2 ring-yellow-300 mt-2"
                    onClick={() => alert("Tebrikler! Bu ürünü satın aldın (Tabii ki şaka :) )")}
                  >
                    Satın Al
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 