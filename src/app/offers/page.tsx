"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../lib/firebase';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount?: string;
  expiry?: string;
  code?: string;
  type: string;
  minAmount?: number;
  category?: string;
}

export default function OffersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      const fetchOffers = async () => {
        setLoadingOffers(true);
        try {
          if (!db) {
            console.error("Firestore bağlantısı kurulamadı");
            return;
          }
          const q = query(collection(db, "offers"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Offer[];
          
          // Eğer hiç fırsat yoksa örnek fırsatlar göster
          if (data.length === 0) {
            setOffers([
              {
                id: "1",
                title: "🎁 İlk Siparişinize %20 İndirim!",
                description: "İlk siparişinizde tüm ürünlerde %20 indirim fırsatı. Bu fırsatı kaçırmayın!",
                discount: "20%",
                expiry: "2024-02-15",
                code: "FIRST20",
                type: "discount",
                minAmount: 100
              },
              {
                id: "2",
                title: "⚔️ Kılıç Koleksiyonu Özel Fiyatı",
                description: "Tüm kılıç ürünlerinde %15 indirim. Aragorn, Legolas ve Gimli kılıçları dahil.",
                discount: "15%",
                expiry: "2024-02-28",
                code: "SWORD15",
                type: "category",
                category: "Kılıçlar"
              },
              {
                id: "3",
                title: "💍 Yüzük Koleksiyonu - Ücretsiz Kargo",
                description: "Yüzük koleksiyonundan herhangi bir ürün alın, kargo bedava!",
                discount: "Ücretsiz Kargo",
                expiry: "2024-03-01",
                code: "FREESHIP",
                type: "shipping",
                minAmount: 50
              }
            ]);
          } else {
            setOffers(data);
          }
        } catch (error) {
          console.error("Fırsatlar yüklenirken hata:", error);
        } finally {
          setLoadingOffers(false);
        }
      };
      fetchOffers();
    }
  }, [user, loading, router]);

  const getOfferTypeColor = (type: string) => {
    switch (type) {
      case "discount": return "bg-green-600";
      case "category": return "bg-blue-600";
      case "shipping": return "bg-purple-600";
      case "gift": return "bg-pink-600";
      default: return "bg-yellow-600";
    }
  };

  const getOfferTypeText = (type: string) => {
    switch (type) {
      case "discount": return "İndirim";
      case "category": return "Kategori";
      case "shipping": return "Kargo";
      case "gift": return "Hediye";
      default: return "Fırsat";
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Sana Özel Fırsatlar</h1>
      
      {loadingOffers ? (
        <div className="text-yellow-200 text-xl">Yükleniyor...</div>
      ) : offers.length === 0 ? (
        <div className="text-center">
          <div className="text-yellow-200 text-xl mb-4">Şu anda sana özel bir fırsat yok.</div>
          <div className="text-yellow-300">Yeni fırsatlar için bizi takip etmeye devam edin!</div>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {offers.map((offer, i) => (
            <div key={offer.id || i} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-xl p-6 hover:border-yellow-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getOfferTypeColor(offer.type)}`}>
                      {getOfferTypeText(offer.type)}
                    </span>
                    {offer.discount && (
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {offer.discount}
                      </span>
                    )}
                  </div>
                  <h3 className="text-yellow-300 font-bold text-xl mb-2">{offer.title}</h3>
                  <p className="text-yellow-200 mb-3">{offer.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {offer.code && (
                  <div>
                    <div className="text-yellow-300 font-semibold mb-1">Kupon Kodu:</div>
                    <div className="bg-yellow-900/30 border border-yellow-600 rounded p-2">
                      <code className="text-yellow-400 font-mono text-lg">{offer.code}</code>
                    </div>
                  </div>
                )}
                
                {offer.expiry && (
                  <div>
                    <div className="text-yellow-300 font-semibold mb-1">Son Kullanım Tarihi:</div>
                    <div className="text-yellow-200">{offer.expiry}</div>
                  </div>
                )}
              </div>
              
              {offer.minAmount && (
                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mb-4">
                  <div className="text-yellow-300 font-semibold mb-1">Minimum Tutar:</div>
                  <div className="text-yellow-200">{offer.minAmount}₺</div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button 
                  onClick={() => router.push("/shop")}
                  className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition"
                >
                  Alışverişe Başla
                </button>
                {offer.code && (
                  <button 
                    onClick={() => offer.code && navigator.clipboard.writeText(offer.code)}
                    className="bg-black border border-yellow-400 text-yellow-400 font-bold py-2 px-4 rounded hover:bg-yellow-400 hover:text-black transition"
                  >
                    Kodu Kopyala
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <div className="text-yellow-200 text-sm">
          💡 Fırsatları kaçırmamak için e-posta bildirimlerini açmayı unutmayın!
        </div>
      </div>
    </div>
  );
} 