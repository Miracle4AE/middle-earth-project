"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../lib/firebase';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber?: string;
  date?: string;
  status?: string;
  total?: number;
  address?: string;
  items?: OrderItem[];
}

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          if (!db) {
            console.error("Firestore bağlantısı kurulamadı");
            return;
          }
          const q = query(collection(db, "orders"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
          
          // Eğer hiç sipariş yoksa örnek siparişler göster
          if (data.length === 0) {
            setOrders([
              {
                id: "1",
                orderNumber: "ORD-2024-001",
                date: "2024-01-15",
                status: "Teslim Edildi",
                total: 299.99,
                address: "Kadıköy, İstanbul",
                items: [
                  { name: "Yüzük Kolye", quantity: 1, price: 199.99 },
                  { name: "Gandalf Bileklik", quantity: 1, price: 100.00 }
                ]
              },
              {
                id: "2", 
                orderNumber: "ORD-2024-002",
                date: "2024-01-20",
                status: "Kargoda",
                total: 450.00,
                address: "Beşiktaş, İstanbul",
                items: [
                  { name: "Aragorn Kılıcı", quantity: 1, price: 450.00 }
                ]
              }
            ]);
          } else {
            setOrders(data);
          }
        } catch (error) {
          console.error("Siparişler yüklenirken hata:", error);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [user, loading, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Teslim Edildi": return "text-green-400";
      case "Kargoda": return "text-blue-400";
      case "Hazırlanıyor": return "text-yellow-400";
      case "İptal Edildi": return "text-red-400";
      default: return "text-yellow-200";
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Siparişlerim</h1>
      {loadingOrders ? (
        <div className="text-yellow-200 text-xl">Yükleniyor...</div>
      ) : orders.length === 0 ? (
        <div className="text-center">
          <div className="text-yellow-200 text-xl mb-4">Henüz bir siparişiniz yok.</div>
          <div className="text-yellow-300">İlk siparişinizi vermek için <span className="text-yellow-400 underline cursor-pointer" onClick={() => router.push("/shop")}>ürünlerimizi</span> inceleyin.</div>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {orders.map((order, i) => (
            <div key={order.id || i} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-xl p-6 hover:border-yellow-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-yellow-300 font-bold text-lg mb-1">Sipariş #{order.orderNumber || `ORD-${i+1}`}</div>
                  <div className="text-yellow-200 text-sm">Tarih: {order.date || "Belirtilmemiş"}</div>
                </div>
                <div className={`font-bold text-lg ${getStatusColor(order.status || "")}`}>
                  {order.status || "Beklemede"}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-yellow-300 font-semibold mb-1">Teslimat Adresi:</div>
                  <div className="text-yellow-200 text-sm">{order.address || "Belirtilmemiş"}</div>
                </div>
                <div>
                  <div className="text-yellow-300 font-semibold mb-1">Toplam Tutar:</div>
                  <div className="text-yellow-400 font-bold text-lg">{order.total || 0}₺</div>
                </div>
              </div>
              
              <div>
                <div className="text-yellow-300 font-semibold mb-2">Sipariş Edilen Ürünler:</div>
                <div className="bg-black/40 rounded-lg p-3">
                  {order.items && order.items.length > 0 ? (
                    <ul className="space-y-2">
                      {order.items.map((item: OrderItem, j: number) => (
                        <li key={j} className="flex justify-between items-center text-yellow-200">
                          <span>{item.name}</span>
                          <span className="text-yellow-400">x{item.quantity} - {item.price}₺</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-yellow-200 text-sm">Ürün bilgisi bulunamadı.</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 