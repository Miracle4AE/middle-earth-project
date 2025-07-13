"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "../LanguageContext";
import { db } from '../../lib/firebase';
import { doc, updateDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import StarIcon from "../StarIcon";
import { initialProducts, Product, parsePrice } from "./productsData";

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

type CartItem = { name: string; category: string; price: string; img: string; quantity: number };

// Review tipi
type Review = {
  productName: string;
  productCategory: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt?: { toDate: () => Date };
};

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
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  
  // Yeni state'ler
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedProductReviews, setSelectedProductReviews] = useState<Review[]>([]);
  const [selectedProductForReviews, setSelectedProductForReviews] = useState<Product | null>(null);

  // Ürünlere ait yorumları çek
  useEffect(() => {
    const fetchReviews = async () => {
      if (!db) return;
      const allReviews: Record<string, Review[]> = {};
      for (const cat of categories) {
        const q = query(collection(db, "reviews"), where("productCategory", "==", cat.key));
        const snap = await getDocs(q);
        allReviews[cat.key] = snap.docs.map(doc => doc.data() as Review);
      }
      setReviews(allReviews);
    };
    fetchReviews();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { // 2 MB sınırı
        alert("Görsel en fazla 2 MB olmalı!");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Döviz kuru state'i
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [usdLoading, setUsdLoading] = useState(false);
  const [usdError, setUsdError] = useState<string | null>(null);

  // Kur cache'i (1 saatlik)
  useEffect(() => {
    async function fetchRate() {
      setUsdLoading(true);
      setUsdError(null);
      try {
        const res = await fetch('/api/exchange-rate');
        const data = await res.json();
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

  // Kullanıcının favorilerini çek
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !db) return;
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
    if (typeof window === 'undefined') return;
    
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
    if (typeof window === 'undefined') return;
    
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

  // Favoriye ekle/kaldır fonksiyonu
  const handleToggleFavorite = async (product: Product) => {
    if (!user) {
      alert("Favorilere eklemek için giriş yapmalısın!");
      return;
    }
    if (!db) {
      alert("Veritabanı bağlantısı yok!");
      return;
    }
    const userRef = doc(db, "users", user.uid);
    const isFav = favorites.some(fav => fav.name.tr === product.name.tr && fav.category === selected);
    if (isFav) {
      await updateDoc(userRef, { favorites: favorites.filter(fav => !(fav.name.tr === product.name.tr && fav.category === selected)) });
      setFavorites(favorites.filter(fav => !(fav.name.tr === product.name.tr && fav.category === selected)));
    } else {
      const newFavs = [...favorites, { ...product, category: selected }];
      await updateDoc(userRef, { favorites: newFavs });
      setFavorites(newFavs);
    }
  };

  const handleSubmitReview = async () => {
    if (!user || !reviewProduct || !db) return;
    if (rating === 0) {
      alert("Lütfen puan ver!");
      return;
    }
    let imageUrl = '';
    if (image) {
      const storage = getStorage();
      const imgRef = storageRef(storage, `reviews/${user.uid}_${Date.now()}_${image.name}`);
      await uploadBytes(imgRef, image);
      imageUrl = await getDownloadURL(imgRef);
    }
    await addDoc(collection(db, "reviews"), {
      productName: reviewProduct.name.tr, // birebir aynı şekilde kaydet
      productCategory: reviewProduct.category, // birebir aynı şekilde kaydet
      userId: user.uid,
      userName: user.displayName || user.email,
      rating,
      comment,
      imageUrl,
      createdAt: serverTimestamp(),
    });
    setShowReviewModal(false);
    setRating(0);
    setComment('');
    setImage(null);
    setPreview(null);
    alert("Yorumun kaydedildi!");
  };

  // Yıldız render fonksiyonu
  const renderStars = (rating: number) => {
    return (
      <span className="flex items-center gap-1">
        {[1,2,3,4,5].map(i => (
          <StarIcon key={i} filled={i <= Math.round(rating)} size={28} className="transition-transform duration-200" />
        ))}
      </span>
    );
  };

  // Yorumları göster fonksiyonu
  const handleShowReviews = (product: Product) => {
    const productReviews = reviews[product.category]?.filter(r => r.productName === product.name.tr) || [];
    setSelectedProductReviews(productReviews);
    setSelectedProductForReviews(product);
    setShowReviewsModal(true);
  };

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
                const productReviews = reviews[prod.category]?.filter(r => r.productName === prod.name.tr) || [];
                const averageRating = productReviews.length > 0 
                  ? (productReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / productReviews.length).toFixed(1)
                  : 0;
                
                return (
                  <motion.div
                    key={prod.name.tr}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="bg-gradient-to-br from-black via-zinc-900 to-yellow-950 rounded-3xl border-4 border-yellow-400/80 shadow-[0_4px_32px_0_rgba(255,215,0,0.15)] flex flex-col items-center p-8 hover:scale-[1.03] hover:shadow-yellow-400/40 hover:border-yellow-300 transition-all duration-300 group relative overflow-hidden ring-2 ring-yellow-900/30"
                  >
                    <Image
                      ref={el => { imgRefs.current[i] = el!; }}
                      src={prod.img}
                      alt={prod.name[language]}
                      width={200}
                      height={200}
                      className="w-44 h-44 object-contain mb-5 drop-shadow-[0_0_16px_gold] rounded-xl border border-yellow-900/40 bg-black/40"
                    />
                    <h3 className="font-[Ringbearer] text-2xl text-yellow-300 mb-3 drop-shadow-[0_0_10px_gold] tracking-wide text-center">{prod.name[language]}</h3>
                    
                    {/* Yıldızlı Puan Ortalaması */}
                    {productReviews.length > 0 && (
                      <div className="mb-3 flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1">
                          {renderStars(parseFloat(averageRating.toString()))}
                          <span className="text-yellow-400 font-bold">({averageRating})</span>
                        </div>
                        <span className="text-yellow-200 text-sm">({productReviews.length} yorum)</span>
                      </div>
                    )}
                    
                    <p className="text-gray-200 text-center text-base mb-3 font-medium tracking-wide">{prod.desc[language]}</p>
                    <span className="text-2xl font-extrabold text-yellow-300 drop-shadow-[0_0_10px_gold] mb-3 tracking-wider">
                      {language === 'en' && (
                        usdLoading
                          ? 'Loading...'
                          : usdRate
                            ? `$${(parsePrice(prod.price) * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : usdError || prod.price
                      )}
                      {language === 'tr' && prod.price}
                    </span>
                    
                    {/* Favori Butonu */}
                    <div className="absolute top-5 right-5 z-10">
                      <button
                        onClick={() => handleToggleFavorite(prod)}
                        className="text-3xl focus:outline-none hover:scale-110 transition-transform duration-200 drop-shadow-[0_0_8px_gold]"
                        title="Beğen"
                      >
                        <span role="img" aria-label="Kalp">{favorites.some(fav => fav.name.tr === prod.name.tr && fav.category === selected) ? "❤️" : "🤍"}</span>
                      </button>
                    </div>
                    
                    {/* Yorumları Gör Butonu */}
                    {productReviews.length > 0 && (
                      <button
                        className="mb-2 px-5 py-2 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-black font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400/60 transition-all duration-200 tracking-wide border border-yellow-200/60"
                        onClick={() => handleShowReviews(prod)}
                      >
                        Yorumları Gör ({productReviews.length})
                      </button>
                    )}
                    
                    {/* Puanla/Yorum Yap Butonu */}
                    <button
                      className="mb-3 px-5 py-2 bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-400 text-black font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400/60 transition-all duration-200 tracking-wide border border-yellow-700/60"
                      onClick={() => { setShowReviewModal(true); setReviewProduct(prod); }}
                    >
                      Puanla / Yorum Yap
                    </button>
                    
                    <motion.button
                      whileHover={user ? { scale: 1.08, boxShadow: "0 0 30px #FFD700" } : {}}
                      className={`w-full px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-black font-bold text-lg shadow-lg transition-all duration-300 border-2 border-yellow-700 ring-2 ring-yellow-300 ${user ? "hover:bg-yellow-400 hover:text-gray-900 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                      onClick={() => handleAddToCart(prod, { current: imgRefs.current[i] })}
                      disabled={!user}
                    >
                      {t('add_to_cart')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08, boxShadow: "0 0 30px #FFD700" }}
                      className="w-full px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-black font-bold text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900 border-2 border-yellow-700 ring-2 ring-yellow-300 mt-3"
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
      
      {/* Flying Image Animation */}
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
      
      {/* Yorum Yapma Modalı */}
      {showReviewModal && reviewProduct && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-gradient-to-br from-black via-zinc-900 to-yellow-950 rounded-3xl border-4 border-yellow-400/80 shadow-[0_8px_48px_0_rgba(255,215,0,0.18)] max-w-md w-full relative p-8 ring-2 ring-yellow-900/30">
            <button className="absolute top-6 right-8 text-yellow-400 text-3xl font-bold hover:scale-110 transition-transform duration-150" onClick={() => setShowReviewModal(false)}>&times;</button>
            <div className="flex flex-col items-center mb-6">
              <Image
                src={reviewProduct.img}
                alt={reviewProduct.name[language]}
                width={80}
                height={80}
                className="w-20 h-20 object-contain rounded-xl border-2 border-yellow-900/40 bg-black/40 drop-shadow-[0_0_16px_gold] mb-2"
              />
              <h2 className="text-2xl font-[Ringbearer] text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold] tracking-wide text-center">{reviewProduct.name[language]} için Yorum Yap</h2>
            </div>
            <div className="flex items-center justify-center mb-5">
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  className={`cursor-pointer mx-1 ${star <= rating ? 'scale-110' : 'scale-100'} transition-transform duration-150`}
                  onClick={() => setRating(star)}
                >
                  <StarIcon filled={star <= rating} size={36} />
                </span>
              ))}
            </div>
            <textarea
              className="w-full p-3 rounded-xl border-2 border-yellow-400 bg-black/40 text-yellow-100 mb-4 focus:outline-none focus:border-yellow-300 text-base resize-none shadow-inner placeholder-yellow-200/60"
              rows={3}
              placeholder="Yorumunuzu yazın..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-3 text-yellow-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-yellow-700 file:via-yellow-500 file:to-yellow-300 file:text-black hover:file:bg-yellow-400"
            />
            {preview && (
              <Image src={preview} alt="Önizleme" width={128} height={128} className="mb-3 max-h-32 rounded-xl border-2 border-yellow-300 mx-auto object-contain" />
            )}
            <button
              className="w-full mt-2 py-3 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-black font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-yellow-400/60 transition-all duration-200 tracking-wide border border-yellow-200/60 text-lg"
              onClick={handleSubmitReview}
            >
              Gönder
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Yorumları Görme Modalı */}
      {showReviewsModal && selectedProductForReviews && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-gradient-to-br from-black via-zinc-900 to-yellow-950 rounded-3xl border-4 border-yellow-400/80 shadow-[0_8px_48px_0_rgba(255,215,0,0.18)] max-w-2xl w-full max-h-[85vh] overflow-y-auto relative p-8 ring-2 ring-yellow-900/30">
            <button className="absolute top-6 right-8 text-yellow-400 text-3xl font-bold hover:scale-110 transition-transform duration-150" onClick={() => setShowReviewsModal(false)}>&times;</button>
            <div className="flex items-center gap-6 mb-8">
              <Image
                src={selectedProductForReviews.img}
                alt={selectedProductForReviews.name[language]}
                width={90}
                height={90}
                className="w-24 h-24 object-contain rounded-xl border-2 border-yellow-900/40 bg-black/40 drop-shadow-[0_0_16px_gold]"
              />
              <div>
                <h2 className="text-3xl font-[Ringbearer] text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold] tracking-wide">{selectedProductForReviews.name[language]}</h2>
                <div className="flex items-center gap-3">
                  {renderStars(parseFloat((selectedProductReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / selectedProductReviews.length).toFixed(1)))}
                  <span className="text-yellow-400 font-bold text-xl">{(selectedProductReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / selectedProductReviews.length).toFixed(1)}</span>
                  <span className="text-yellow-200 text-base">({selectedProductReviews.length} yorum)</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {selectedProductReviews.map((review, index) => (
                <div key={index} className="bg-black/60 rounded-xl p-5 border border-yellow-900/30 shadow-md flex flex-col gap-2 relative">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-700 via-yellow-400 to-yellow-200 flex items-center justify-center text-black font-bold text-lg border-2 border-yellow-300/60">
                      {review.userName ? review.userName[0].toUpperCase() : 'K'}
                    </div>
                    <span className="font-bold text-yellow-200 text-lg">{review.userName || 'Kullanıcı'}</span>
                    <div className="flex ml-2">{renderStars(review.rating)}</div>
                    <span className="ml-auto text-sm text-yellow-100/70">
                      {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('tr-TR') : 'Tarih yok'}
                    </span>
                  </div>
                  <p className="text-yellow-100 text-base mb-1">{review.comment}</p>
                  {review.imageUrl && (
                    <Image
                      src={review.imageUrl}
                      alt="Yorum görseli"
                      width={128}
                      height={128}
                      className="max-h-32 rounded border border-yellow-200 mt-1 object-contain"
                    />
                  )}
                  {index < selectedProductReviews.length - 1 && (
                    <div className="h-[2px] w-full bg-gradient-to-r from-yellow-400/60 via-yellow-700/30 to-yellow-400/60 my-3 rounded-full" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-black font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-yellow-400/60 transition-all duration-200 tracking-wide border border-yellow-200/60 text-lg"
                onClick={() => { setShowReviewsModal(false); setShowReviewModal(true); setReviewProduct(selectedProductForReviews); }}
              >
                Bu Ürün İçin Yorum Yap
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 