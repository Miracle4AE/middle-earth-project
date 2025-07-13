"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../lib/firebase';
import { useLanguage } from "../LanguageContext";

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
  const { t } = useLanguage();

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
          const q = query(collection(db!, "orders"), where("userId", "==", user.uid));
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
      case t('order_status_delivered'): return "text-green-400";
      case t('order_status_shipping'): return "text-blue-400";
      case t('order_status_preparing'): return "text-yellow-400";
      case t('order_status_cancelled'): return "text-red-400";
      default: return "text-yellow-200";
    }
  };
  const getStatusText = (status: string) => {
    if (status === 'Teslim Edildi' || status === 'Delivered') return t('order_status_delivered');
    if (status === 'Kargoda' || status === 'Shipped') return t('order_status_shipping');
    if (status === 'Hazırlanıyor' || status === 'Preparing') return t('order_status_preparing');
    if (status === 'İptal Edildi' || status === 'Cancelled') return t('order_status_cancelled');
    if (status === 'Beklemede' || status === 'Pending') return t('order_status_pending');
    return status;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">{t('orders_title')}</h1>
      {loadingOrders ? (
        <div className="text-yellow-200 text-xl">{t('order_loading')}</div>
      ) : orders.length === 0 ? (
        <div className="text-center">
          <div className="text-yellow-200 text-xl mb-4">{t('order_none')}</div>
          <div className="text-yellow-300">{t('order_first_cta')} <span className="text-yellow-400 underline cursor-pointer" onClick={() => router.push("/shop")}>{t('order_first_link')}</span> {t('order_first_end')}</div>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {orders.map((order, i) => (
            <div key={order.id || i} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-xl p-6 hover:border-yellow-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-yellow-300 font-bold text-lg mb-1">{t('order_number')} #{order.orderNumber || `ORD-${i+1}`}</div>
                  <div className="text-yellow-200 text-sm">{t('order_date')}: {order.date || t('order_status_pending')}</div>
                </div>
                <div className={`font-bold text-lg ${getStatusColor(getStatusText(order.status || ""))}`}>{getStatusText(order.status || "")}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-yellow-300 font-semibold mb-1">{t('delivery_address')}:</div>
                  <div className="text-yellow-200 text-sm">{order.address || t('order_status_pending')}</div>
                </div>
                <div>
                  <div className="text-yellow-300 font-semibold mb-1">{t('total_amount')}:</div>
                  <div className="text-yellow-400 font-bold text-lg">{order.total || 0}{t('currency_try')}</div>
                </div>
              </div>
              <div>
                <div className="text-yellow-300 font-semibold mb-2">{t('ordered_products')}:</div>
                <div className="bg-black/40 rounded-lg p-3">
                  {order.items && order.items.length > 0 ? (
                    <ul className="space-y-2">
                      {order.items.map((item: OrderItem, j: number) => (
                        <li key={j} className="flex justify-between items-center text-yellow-200">
                          <span>{item.name}</span>
                          <span className="text-yellow-400">x{item.quantity} - {item.price}{t('currency_try')}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-yellow-200 text-sm">{t('order_product_none')}</div>
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