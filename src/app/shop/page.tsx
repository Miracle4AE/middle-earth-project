"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "../LanguageContext";

const categories = [
  { key: "rings" },
  { key: "swords" },
  { key: "cloaks" },
  { key: "maps" },
  { key: "figures" },
  { key: "elf_jewelry" },
  { key: "books" },
  { key: "hobbit_items" },
  { key: "elf_bows" },
  { key: "dwarf_axes" },
  { key: "nazgul_masks" },
  { key: "orc_armors" },
  { key: "wizard_staffs" },
  { key: "gondor_helmets" },
  { key: "rohan_horses" },
  { key: "posters" },
  { key: "cards" },
  { key: "collection_figures" },
  { key: "home_office" },
  { key: "accessories" },
  { key: "clothes" },
  { key: "games_puzzles" },
  { key: "kitchen" },
  { key: "coins_replicas" },
  { key: "plush_toys" },
];

type Product = { name: { tr: string; en: string }; price: string; img: string; desc: { tr: string; en: string } };
type CartItem = { name: string; category: string; price: string; img: string; quantity: number };

const initialProducts: Record<string, Product[]> = {
  rings: [
    { name: { tr: "Tek Yüzük", en: "The One Ring" }, price: "99.999₺", img: "/images/one-ring.png", desc: { tr: "Sauron'un kudretiyle dövülmüş efsanevi yüzük.", en: "The legendary ring forged by Sauron's power." } },
    { name: { tr: "Nenya", en: "Nenya" }, price: "49.999₺", img: "/images/gallery/galadriel.jpg", desc: { tr: "Galadriel'in yüzüğü, saflığın ve gücün simgesi.", en: "Galadriel's ring, symbol of purity and power." } },
  ],
  swords: [
    { name: { tr: "Andúril", en: "Andúril" }, price: "79.999₺", img: "/images/gallery/aragorn.jpg", desc: { tr: "Aragorn'un efsanevi kılıcı.", en: "Aragorn's legendary sword." } },
    { name: { tr: "Sting", en: "Sting" }, price: "29.999₺", img: "/images/gallery/frodo.jpg", desc: { tr: "Frodo'nun mavi parlayan kılıcı.", en: "Frodo's blue-glowing sword." } },
    { name: { tr: "Glamdring", en: "Glamdring" }, price: "39.999₺", img: "/images/gallery/gandalf.jpg", desc: { tr: "Gandalf'ın kılıcı, ork avcısı.", en: "Gandalf's sword, orc hunter." } },
  ],
  cloaks: [
    { name: { tr: "Elf Pelerini", en: "Elf Cloak" }, price: "9.999₺", img: "/images/gallery/legolas.jpg", desc: { tr: "Görünmezlik sağlayan elf pelerini.", en: "Elven cloak that grants invisibility." } },
    { name: { tr: "Gri Pelerin", en: "Grey Cloak" }, price: "7.999₺", img: "/images/gallery/fellowship.jpg", desc: { tr: "Fellowship üyelerinin kullandığı pelerin.", en: "Cloak worn by Fellowship members." } },
  ],
  maps: [
    { name: { tr: "Orta Dünya Haritası", en: "Middle Earth Map" }, price: "1.999₺", img: "/images/middle-earth-map.jpg", desc: { tr: "Orta Dünya'nın detaylı haritası.", en: "Detailed map of Middle Earth." } },
    { name: { tr: "Shire Haritası", en: "Shire Map" }, price: "1.499₺", img: "/images/gallery/shire.jpg", desc: { tr: "Shire bölgesinin detaylı haritası.", en: "Detailed map of the Shire." } },
  ],
  figures: [
    { name: { tr: "Gandalf Figürü", en: "Gandalf Figure" }, price: "2.499₺", img: "/images/gallery/gandalf.jpg", desc: { tr: "Gandalf'ın detaylı figürü.", en: "Detailed figure of Gandalf." } },
    { name: { tr: "Frodo Figürü", en: "Frodo Figure" }, price: "2.499₺", img: "/images/gallery/frodo.jpg", desc: { tr: "Frodo'nun detaylı figürü.", en: "Detailed figure of Frodo." } },
  ],
  elf_jewelry: [
    { name: { tr: "Lorien Yaprağı Broşu", en: "Lorien Leaf Brooch" }, price: "999₺", img: "/images/gallery/lorien.jpg", desc: { tr: "Lorien yaprağı ile süslenmiş broş.", en: "Brooch made from Lorien leaves." } },
    { name: { tr: "Evenstar Kolye", en: "Evenstar Necklace" }, price: "1.499₺", img: "/images/gallery/arwen.jpg", desc: { tr: "Arwen'in efsanevi kolyesi.", en: "Evenstar necklace worn by Arwen." } },
  ],
  books: [
    { name: { tr: "Yüzüklerin Efendisi Seti", en: "The Lord of the Rings Trilogy" }, price: "2.499₺", img: "/images/gallery/lotr-books.jpg", desc: { tr: "J.R.R. Tolkien'in efsanevi üçlemesi.", en: "The complete trilogy of J.R.R. Tolkien's The Lord of the Rings." } },
    { name: { tr: "Hobbit (İllüstrasyonlu)", en: "Hobbit (Illustrated)" }, price: "1.299₺", img: "/images/gallery/hobbit.jpg", desc: { tr: "Tolkien'in illüstrasyonlu Hobbit kitabı.", en: "Tolkien's illustrated version of the Hobbit." } },
  ],
  hobbit_items: [
    { name: { tr: "Hobbit Kapısı Anahtarlık", en: "Hobbit Door Keychain" }, price: "299₺", img: "/images/gallery/hobbit-door.jpg", desc: { tr: "Bag End'in ikonik kapısı anahtarlık olarak.", en: "Keychain shaped like the iconic door of Bag End." } },
    { name: { tr: "Shire Kupası", en: "Shire Mug" }, price: "399₺", img: "/images/gallery/shire-cup.jpg", desc: { tr: "Shire temalı kupa.", en: "Mug with Shire theme." } },
  ],
  elf_bows: [
    { name: { tr: "Legolas'ın Yayı", en: "Legolas's Bow" }, price: "5.999₺", img: "/images/gallery/legolas-bow.jpg", desc: { tr: "Legolas'ın efsanevi yayı.", en: "Legolas's legendary bow." } },
    { name: { tr: "Galadhrim Yayı", en: "Galadhrim Bow" }, price: "6.499₺", img: "/images/gallery/galadhrim-bow.jpg", desc: { tr: "Lothlórien elflerinin kullandığı yay.", en: "Bow used by the elves of Lothlórien." } },
  ],
  dwarf_axes: [
    { name: { tr: "Gimli'nin Baltası", en: "Gimli's Axe" }, price: "4.999₺", img: "/images/gallery/gimli-axe.jpg", desc: { tr: "Gimli'nin efsanevi baltası.", en: "Gimli's legendary axe." } },
    { name: { tr: "Cüce Savaş Baltası", en: "Dwarf Battle Axe" }, price: "3.999₺", img: "/images/gallery/dwarf-axe.jpg", desc: { tr: "Cüce savaşçıların kullandığı balta.", en: "Battle axe used by the dwarves." } },
  ],
  nazgul_masks: [
    { name: { tr: "Nazgûl Maskesi", en: "Nazgul Mask" }, price: "2.999₺", img: "/images/gallery/nazgul-mask.jpg", desc: { tr: "Kara Süvarilerin korkutucu maskesi.", en: "Mask of the Nazgûl." } },
    { name: { tr: "Witch-King Maskesi", en: "Witch-King Mask" }, price: "3.499₺", img: "/images/gallery/witchking-mask.jpg", desc: { tr: "Angmar'ın Cadı Kralı'nın maskesi.", en: "Mask of the Witch-King." } },
  ],
  orc_armors: [
    { name: { tr: "Mordor Ork Zırhı", en: "Mordor Orc Armor" }, price: "7.999₺", img: "/images/gallery/mordor-armor.jpg", desc: { tr: "Mordor orklarından esinlenilmiş zırh.", en: "Armor inspired by the orcs of Mordor." } },
    { name: { tr: "Uruk-hai Zırhı", en: "Uruk-hai Armor" }, price: "8.499₺", img: "/images/gallery/urukhai-armor.jpg", desc: { tr: "Uruk-hai savaşçılarının zırhı.", en: "Armor worn by the Uruk-hai warriors." } },
  ],
  wizard_staffs: [
    { name: { tr: "Gandalf'ın Asası", en: "Gandalf's Staff" }, price: "3.999₺", img: "/images/gallery/gandalf-staff.jpg", desc: { tr: "Gandalf'ın büyülü asası.", en: "Gandalf's powerful staff." } },
    { name: { tr: "Saruman'ın Asası", en: "Saruman's Staff" }, price: "4.499₺", img: "/images/gallery/saruman-staff.jpg", desc: { tr: "Saruman'ın beyaz asası.", en: "Saruman's white staff." } },
  ],
  gondor_helmets: [
    { name: { tr: "Gondor Miğferi", en: "Gondor Helmets" }, price: "2.999₺", img: "/images/gallery/gondor-helmet.jpg", desc: { tr: "Gondor askerlerinin miğferi.", en: "Helmets worn by Gondor soldiers." } },
    { name: { tr: "Faramir Miğferi", en: "Faramir Helmets" }, price: "3.499₺", img: "/images/gallery/faramir-helmet.jpg", desc: { tr: "Faramir'in kullandığı miğfer.", en: "Helmets worn by Faramir." } },
  ],
  rohan_horses: [
    { name: { tr: "Rohan Atı Figürü", en: "Rohan Horse Figure" }, price: "1.999₺", img: "/images/gallery/rohan-horse.jpg", desc: { tr: "Rohan'ın efsanevi atı figürü.", en: "Rohan's legendary horse figure." } },
    { name: { tr: "Shadowfax Figürü", en: "Shadowfax Figure" }, price: "2.499₺", img: "/images/gallery/shadowfax.jpg", desc: { tr: "Gandalf'ın atı Shadowfax figürü.", en: "Shadowfax figure of Gandalf's horse." } },
  ],
  posters: [
    { name: { tr: "Orta Dünya Poster Seti", en: "Middle Earth Poster Set" }, price: "499₺", img: "/images/gallery/middleearth-poster.jpg", desc: { tr: "Orta Dünya temalı poster seti.", en: "Middle Earth themed poster set." } },
    { name: { tr: "Gondor Poster", en: "Gondor Poster" }, price: "299₺", img: "/images/gallery/gondor-poster.jpg", desc: { tr: "Gondor temalı poster.", en: "Gondor themed poster." } },
  ],
  cards: [
    { name: { tr: "LOTR Koleksiyon Kartı Seti", en: "The Lord of the Rings Collectible Card Set" }, price: "399₺", img: "/images/gallery/lotr-cards.jpg", desc: { tr: "Yüzüklerin Efendisi koleksiyon kartları.", en: "Collectible cards from The Lord of the Rings." } },
    { name: { tr: "Karakter Kartları", en: "Character Cards" }, price: "299₺", img: "/images/gallery/character-cards.jpg", desc: { tr: "Orta Dünya karakter kartları.", en: "Character cards from Middle Earth." } },
  ],
  collection_figures: [
    { name: { tr: "Gandalf Figürü", en: "Gandalf Figure" }, price: "2.499₺", img: "/images/gallery/gandalf.jpg", desc: { tr: "Gandalf'ın detaylı figürü.", en: "Detailed figure of Gandalf." } },
    { name: { tr: "Legolas Figürü", en: "Legolas Figure" }, price: "2.499₺", img: "/images/gallery/legolas.jpg", desc: { tr: "Legolas'ın detaylı figürü.", en: "Detailed figure of Legolas." } },
    { name: { tr: "Sauron Figürü", en: "Sauron Figure" }, price: "2.499₺", img: "/images/gallery/sauron.jpg", desc: { tr: "Sauron'un detaylı figürü.", en: "Detailed figure of Sauron." } },
  ],
  home_office: [
    { name: { tr: "Orta Dünya Haritalı Battaniye", en: "Middle Earth Map Cushion" }, price: "1.999₺", img: "/images/middle-earth-map.jpg", desc: { tr: "Orta Dünya haritası ile süslenmiş battaniye.", en: "Cushion with Middle Earth map." } },
    { name: { tr: "Orta Dünya Haritalı Yastık", en: "Middle Earth Map Throw" }, price: "999₺", img: "/images/middle-earth-map.jpg", desc: { tr: "Orta Dünya haritası ile süslenmiş yastık.", en: "Throw with Middle Earth map." } },
  ],
  accessories: [
    { name: { tr: "Arwen'in Evenstar Kolyesi", en: "Arwen's Evenstar Necklace" }, price: "1.499₺", img: "/images/gallery/arwen.jpg", desc: { tr: "Arwen'in efsanevi kolyesi.", en: "Evenstar necklace worn by Arwen." } },
    { name: { tr: "Lorien Yaprağı Broşu", en: "Lorien Leaf Brooch" }, price: "999₺", img: "/images/gallery/lorien.jpg", desc: { tr: "Lorien yaprağı ile süslenmiş broş.", en: "Brooch made from Lorien leaves." } },
  ],
  clothes: [
    { name: { tr: "Prancing Pony Tişört", en: "Prancing Pony Shirt" }, price: "499₺", img: "/images/gallery/prancing-pony.jpg", desc: { tr: "Prancing Pony temalı tişört.", en: "Prancing Pony themed shirt." } },
    { name: { tr: "Fellowship Kapüşonlu", en: "Fellowship Hooded" }, price: "999₺", img: "/images/gallery/fellowship.jpg", desc: { tr: "Fellowship temalı kapüşonlu.", en: "Fellowship themed hooded." } },
  ],
  games_puzzles: [
    { name: { tr: "LOTR Masa Oyunu", en: "The Lord of the Rings Board Game" }, price: "1.499₺", img: "/images/gallery/lotr-game.jpg", desc: { tr: "LOTR temalı masa oyunu.", en: "The Lord of the Rings board game." } },
    { name: { tr: "LOTR Yapboz", en: "The Lord of the Rings Puzzle" }, price: "499₺", img: "/images/gallery/lotr-puzzle.jpg", desc: { tr: "LOTR temalı yapboz.", en: "The Lord of the Rings puzzle." } },
  ],
  kitchen: [
    { name: { tr: "Orta Dünya Temalı Kupa", en: "Middle Earth Mug" }, price: "299₺", img: "/images/gallery/lotr-cup.jpg", desc: { tr: "Orta Dünya temalı kupa.", en: "Mug with Middle Earth theme." } },
    { name: { tr: "Orta Dünya Temalı Bardak", en: "Middle Earth Glass" }, price: "299₺", img: "/images/gallery/lotr-glass.jpg", desc: { tr: "Orta Dünya temalı bardak.", en: "Glass with Middle Earth theme." } },
  ],
  coins_replicas: [
    { name: { tr: "Orta Dünya Madeni Parası", en: "Middle Earth Coin" }, price: "999₺", img: "/images/gallery/lotr-coin.jpg", desc: { tr: "Orta Dünya temalı madeni para.", en: "Middle Earth themed coin." } },
    { name: { tr: "Andúril Anahtarlık", en: "Andúril Keychain" }, price: "499₺", img: "/images/gallery/anduril-keychain.jpg", desc: { tr: "Andúril temalı anahtarlık.", en: "Andúril themed keychain." } },
  ],
  plush_toys: [
    { name: { tr: "Legolas Peluş", en: "Legolas Plush" }, price: "999₺", img: "/images/gallery/legolas-plush.jpg", desc: { tr: "Legolas temalı peluş.", en: "Legolas themed plush." } },
    { name: { tr: "Gollum Peluş", en: "Gollum Plush" }, price: "999₺", img: "/images/gallery/gollum-plush.jpg", desc: { tr: "Gollum temalı peluş.", en: "Gollum themed plush." } },
  ],
};

// Fiyatı güvenli şekilde sayıya çeviren fonksiyon
function parsePrice(priceStr: string): number {
  // Tüm noktaları sil (binlik ayraçları kaldır)
  let clean = priceStr.replace(/[₺$,]/g, '').replace(/\./g, '');
  // Virgülü ondalık ayraç olarak noktaya çevir
  clean = clean.replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

export default function ShopPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState(categories[0].key);
  const [products] = useState<Record<string, Product[]>>(initialProducts);
  const currentProducts = products[selected] || [];
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const cartIconRef = useRef<HTMLButtonElement>(null);
  const [flyingImg, setFlyingImg] = useState<{ img: string; from: DOMRect; to: DOMRect } | null>(null);
  const controls = useAnimation();
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Döviz kuru state'i
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [usdLoading, setUsdLoading] = useState(false);
  const [usdError, setUsdError] = useState<string | null>(null);

  // Kur cache'i (1 saatlik)
  useEffect(() => {
    console.log('Kur çekme useEffect tetiklendi, dil:', language);
    async function fetchRate() {
      setUsdLoading(true);
      setUsdError(null);
      try {
        const res = await fetch('/api/exchange-rate');
        const data = await res.json();
        console.log('Kur API yanıtı:', data);
        if (data && typeof data.usd === 'number' && !isNaN(data.usd)) {
          setUsdRate(data.usd);
          setUsdError(null);
        } else {
          setUsdRate(null);
          setUsdError('Kur alınamadı, fiyatlar ₺ olarak gösteriliyor.');
        }
      } catch (e) {
        setUsdRate(null);
        setUsdError('Kur alınamadı, fiyatlar ₺ olarak gösteriliyor.');
        console.error('Kur çekme hatası:', e);
      } finally {
        setUsdLoading(false);
      }
    }
    if (language === 'en') {
      fetchRate();
    }
  }, [language]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  const handleAddToCart = (product: Product, imgRef: React.RefObject<HTMLImageElement | null>) => {
    if (!user) {
      alert("Sepete eklemek için giriş yapmalısın!");
      return;
    }
    if (!imgRef.current) return;
    const cart: CartItem[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
    const existingIndex = cart.findIndex(
      (item) => item.name === product.name.tr && item.category === selected
    );
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ name: product.name[language], price: product.price, img: product.img, category: selected, quantity: 1 });
    }
    localStorage.setItem("lotr-cart", JSON.stringify(cart));
    // Animasyon başlat
    if (imgRef.current && cartIconRef.current) {
      const from = imgRef.current.getBoundingClientRect();
      const to = cartIconRef.current.getBoundingClientRect();
      setFlyingImg({ img: product.img, from, to });
      controls.start({
        x: to.left - from.left,
        y: to.top - from.top,
        scale: 0.2,
        opacity: 0.7,
        transition: { duration: 0.7, ease: "easeInOut" }
      }).then(() => setFlyingImg(null));
    }
  };

  const handleBuyNow = (product: Product) => {
    if (!user) {
      alert("Satın almak için giriş yapmalısın!");
      return;
    }
    const cart: CartItem[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
    const existingIndex = cart.findIndex(
      (item) => item.name === product.name.tr && item.category === selected
    );
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ name: product.name[language], price: product.price, img: product.img, category: selected, quantity: 1 });
    }
    localStorage.setItem("lotr-cart", JSON.stringify(cart));
    router.push("/checkout");
  };

  console.log('LANG:', language, 'USD_RATE:', usdRate);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen bg-black/70 flex-col md:flex-row">
        {/* Mobil Kategori Menüsü */}
        <div className="md:hidden w-full sticky top-0 z-30 bg-black/90 border-b border-yellow-700 px-2 py-2">
          {/* Yatay scroll */}
          <div className="flex gap-1 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelected(cat.key)}
                className={`whitespace-nowrap font-[Ringbearer] text-xs px-3 py-2 rounded-md border-2 transition-all duration-200 shadow-md max-w-[110px] min-w-[80px] text-ellipsis overflow-hidden ${selected === cat.key ? "bg-yellow-400 text-black border-yellow-400" : "text-yellow-200 bg-black/40 border-yellow-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400"}`}
                style={{fontWeight: 600, letterSpacing: '0.01em'}}
                title={t(cat.key)}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>
          {/* Dropdown (isteğe bağlı, çok kategori varsa) */}
          <div className="mt-2">
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="w-full bg-black text-yellow-300 border-2 border-yellow-700 rounded-lg px-3 py-2 font-[Ringbearer] text-base focus:outline-none focus:border-yellow-400"
            >
              {categories.map((cat) => (
                <option key={cat.key} value={cat.key}>{t(cat.key)}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Yan Menü (PC) */}
        <aside className="hidden md:flex flex-col w-64 bg-black/80 border-r-2 border-yellow-700 shadow-2xl p-6 gap-4 z-20">
          <h2 className="font-[Ringbearer] text-3xl text-yellow-400 mb-4 drop-shadow-[0_0_10px_gold] text-center">{t('products')}</h2>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelected(cat.key)}
                className={`font-[Ringbearer] text-lg ${selected === cat.key ? "bg-yellow-400 text-black border-yellow-400" : "text-yellow-200 bg-black/40 border-yellow-700"} border-2 rounded-lg px-4 py-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-200 shadow-md`}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>
        </aside>
        {/* Ana İçerik */}
        <div className="flex-1 flex flex-col items-center justify-start p-6">
          <h1 className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold mb-6 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center">{t(selected)}</h1>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
            {currentProducts.length === 0 ? (
              <div className="text-gray-300 text-center col-span-2">{t('coming_soon')}</div>
            ) : (
              currentProducts.map((prod: Product, i: number) => {
                return (
                  <motion.div
                    key={prod.name.tr}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="bg-black/70 rounded-2xl border-2 border-yellow-700 shadow-xl flex flex-col items-center p-6 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300 group relative overflow-hidden"
                  >
                    <Image
                      ref={el => { imgRefs.current[i] = el!; }}
                      src={prod.img}
                      alt={prod.name[language]}
                      width={200}
                      height={200}
                      className="w-40 h-40 object-contain mb-4"
                    />
                    <h3 className="font-[Ringbearer] text-2xl text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold]">{prod.name[language]}</h3>
                    <p className="text-gray-200 text-center text-base mb-2">{prod.desc[language]}</p>
                    <span className="text-xl font-bold text-yellow-400 drop-shadow-[0_0_10px_gold] mb-2">
                      {language === 'en' && (
                        usdLoading
                          ? 'Loading...'
                          : usdRate
                            ? `$${(parsePrice(prod.price) * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : usdError || prod.price
                      )}
                      {language === 'tr' && prod.price}
                    </span>
                    <motion.button
                      whileHover={user ? { scale: 1.08, boxShadow: "0 0 30px #FFD700" } : {}}
                      className={`w-full px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-black font-bold text-lg shadow-lg transition-all duration-300 border-2 border-yellow-700 ring-2 ring-yellow-300 ${user ? "hover:bg-yellow-400 hover:text-gray-900 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                      onClick={() => handleAddToCart(prod, { current: imgRefs.current[i] })}
                      disabled={!user}
                    >
                      {t('add_to_cart')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08, boxShadow: "0 0 30px #FFD700" }}
                      className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-black font-bold text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900 border-2 border-yellow-700 ring-2 ring-yellow-300 mt-2"
                      onClick={() => handleBuyNow(prod)}
                    >
                      {t('buy_now')}
                    </motion.button>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {flyingImg && (
        <motion.img
          src={flyingImg.img}
          initial={{
            position: "fixed",
            left: flyingImg.from.left,
            top: flyingImg.from.top,
            width: flyingImg.from.width,
            height: flyingImg.from.height,
            zIndex: 9999,
            borderRadius: 12,
            boxShadow: "0 0 20px #FFD700"
          }}
          animate={controls}
          style={{ position: "fixed", left: flyingImg.from.left, top: flyingImg.from.top }}
        />
      )}
    </motion.div>
  );
} 