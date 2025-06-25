"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";

// Interface tanımlamaları
interface User {
  id: string;
  displayName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  createdAt?: Timestamp;
}

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  stock: string;
  createdAt?: Timestamp;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  address: string;
  createdAt?: Timestamp;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  type: string;
  discount: string;
  code: string;
  expiry: string;
  minAmount: string;
  targetType: string;
  targetUser?: string;
  createdAt?: Timestamp;
}

interface Request {
  id: string;
  userId: string;
  userName: string;
  category: string;
  subject: string;
  message: string;
  priority: string;
  status?: string;
  createdAt?: Timestamp;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [error, setError] = useState("");

  // Dashboard verileri
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0
  });

  // Kullanıcı yönetimi
  const [users, setUsers] = useState<User[]>([]);

  // Ürün yönetimi
  const [products, setProducts] = useState<Product[]>([]);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: ""
  });

  // Sipariş yönetimi
  const [orders, setOrders] = useState<Order[]>([]);

  // Fırsat yönetimi
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offerForm, setOfferForm] = useState({
    title: "",
    description: "",
    type: "discount",
    discount: "",
    code: "",
    expiry: "",
    minAmount: "",
    targetType: "genel",
    targetUser: ""
  });

  // Soru/Talep yönetimi
  const [requests, setRequests] = useState<Request[]>([]);

  // Toplu fırsat yönetimi
  const [bulkOfferForm, setBulkOfferForm] = useState({
    title: "",
    description: "",
    type: "discount",
    discount: "",
    code: "",
    expiry: "",
    minAmount: "",
    emailList: ""
  });
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "nobody4" && password === "Ae080919") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Kullanıcı adı veya şifre yanlış!");
    }
  };

  // Dashboard verilerini yükle
  const loadDashboardStats = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "profiles"));
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const productsSnapshot = await getDocs(collection(db, "products"));

      let totalRevenue = 0;
      ordersSnapshot.forEach(doc => {
        const data = doc.data();
        totalRevenue += data.total || 0;
      });

      setStats({
        totalUsers: usersSnapshot.size,
        totalOrders: ordersSnapshot.size,
        totalProducts: productsSnapshot.size,
        totalRevenue: totalRevenue
      });
    } catch (error) {
      console.error("Dashboard verileri yüklenirken hata:", error);
    }
  };

  // Kullanıcıları yükle
  const loadUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "profiles"));
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
      setUsers(usersData);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata:", error);
    }
  };

  // Ürünleri yükle
  const loadProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error("Ürünler yüklenirken hata:", error);
    }
  };

  // Siparişleri yükle
  const loadOrders = async () => {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error("Siparişler yüklenirken hata:", error);
    }
  };

  // Fırsatları yükle
  const loadOffers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "offers"));
      const offersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Offer[];
      setOffers(offersData);
    } catch (error) {
      console.error("Fırsatlar yüklenirken hata:", error);
    }
  };

  // Soru/Talepleri yükle
  const loadRequests = async () => {
    try {
      const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Request[];
      setRequests(requestsData);
    } catch (error) {
      console.error("Soru/Talepler yüklenirken hata:", error);
    }
  };

  // Sekme değiştiğinde verileri yükle
  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardStats();
      if (activeTab === "users") loadUsers();
      if (activeTab === "products") loadProducts();
      if (activeTab === "orders") loadOrders();
      if (activeTab === "offers") loadOffers();
      if (activeTab === "requests") loadRequests();
    }
  }, [isLoggedIn, activeTab]);

  // Ürün ekleme
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.category) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    try {
      await addDoc(collection(db, "products"), {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock) || 0,
        createdAt: serverTimestamp()
      });
      setProductForm({ name: "", price: "", category: "", description: "", image: "", stock: "" });
      loadProducts();
      setError("");
    } catch {
      setError("Ürün eklenirken hata oluştu.");
    }
  };

  // Fırsat ekleme
  const handleAddOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title || !offerForm.description) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    if (offerForm.targetType === "ozel" && !offerForm.targetUser) {
      setError("Kişiye özel fırsat için kullanıcı e-posta veya ID girin.");
      return;
    }
    try {
      await addDoc(collection(db, "offers"), {
        ...offerForm,
        discount: offerForm.discount || "",
        minAmount: offerForm.minAmount ? parseFloat(offerForm.minAmount) : 0,
        createdAt: serverTimestamp(),
        active: true
      });
      setOfferForm({
        title: "", description: "", type: "discount", discount: "", code: "", expiry: "", minAmount: "", targetType: "genel", targetUser: ""
      });
      loadOffers();
      setError("");
    } catch {
      setError("Fırsat eklenirken hata oluştu.");
    }
  };

  // Sipariş durumu güncelleme
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status });
      loadOrders();
    } catch {
      setError("Sipariş durumu güncellenirken hata oluştu.");
    }
  };

  // Fırsat silme
  const deleteOffer = async (offerId: string) => {
    if (confirm("Bu fırsatı silmek istediğinizden emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "offers", offerId));
        loadOffers();
      } catch {
        setError("Fırsat silinirken hata oluştu.");
      }
    }
  };

  // Toplu fırsat ekleme
  const handleBulkAddOffers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkOfferForm.title || !bulkOfferForm.description || !bulkOfferForm.emailList) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    
    const emails = bulkOfferForm.emailList.split('\n').map(email => email.trim()).filter(email => email);
    if (emails.length === 0) {
      setError("Geçerli e-posta adresi bulunamadı.");
      return;
    }
    
    setBulkLoading(true);
    setBulkProgress({ current: 0, total: emails.length });
    setError("");
    
    try {
      for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        await addDoc(collection(db, "offers"), {
          title: bulkOfferForm.title,
          description: bulkOfferForm.description,
          type: bulkOfferForm.type,
          discount: bulkOfferForm.discount || "",
          code: bulkOfferForm.code || "",
          expiry: bulkOfferForm.expiry || "",
          minAmount: bulkOfferForm.minAmount ? parseFloat(bulkOfferForm.minAmount) : 0,
          targetType: "ozel",
          targetUser: email,
          createdAt: serverTimestamp(),
          active: true
        });
        setBulkProgress({ current: i + 1, total: emails.length });
      }
      
      setBulkOfferForm({
        title: "", description: "", type: "discount", discount: "", code: "", expiry: "", minAmount: "", emailList: ""
      });
      setBulkProgress({ current: 0, total: 0 });
      loadOffers();
      setError("");
    } catch {
      setError("Toplu fırsat eklenirken hata oluştu.");
    } finally {
      setBulkLoading(false);
    }
  };

  // Kullanıcıya şifre sıfırlama maili gönder
  const handleResetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Şifre sıfırlama maili ${email} adresine gönderildi!`);
    } catch {
      alert("Şifre sıfırlama maili gönderilemedi. Lütfen e-posta adresini kontrol et.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Admin Paneli</h1>
        <form onSubmit={handleLogin} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
          <input 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            placeholder="Kullanıcı Adı" 
            className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
            required
          />
          <input 
            type="password"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Şifre" 
            className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
            required
          />
          <button type="submit" className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition">
            Giriş Yap
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-black/90 border-b border-yellow-700 p-4 flex justify-between items-center">
        <h1 className="font-[Ringbearer] text-3xl text-yellow-400">Admin Paneli</h1>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Çıkış Yap
        </button>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-yellow-700">
        <button onClick={() => setActiveTab("dashboard")} className={`px-6 py-3 font-bold ${activeTab === "dashboard" ? "bg-yellow-900/30 text-yellow-300 border-b-2 border-yellow-400" : "text-yellow-100 hover:bg-yellow-900/20"}`}>
          Dashboard
        </button>
        <button onClick={() => setActiveTab("users")} className={`px-6 py-3 font-bold ${activeTab === "users" ? "bg-yellow-900/30 text-yellow-300 border-b-2 border-yellow-400" : "text-yellow-100 hover:bg-yellow-900/20"}`}>
          Kullanıcılar
        </button>
        <button onClick={() => setActiveTab("products")} className={`px-6 py-3 font-bold ${activeTab === "products" ? "bg-yellow-900/30 text-yellow-300 border-b-2 border-yellow-400" : "text-yellow-100 hover:bg-yellow-900/20"}`}>
          Ürünler
        </button>
        <button onClick={() => setActiveTab("orders")} className={`px-6 py-3 font-bold ${activeTab === "orders" ? "bg-yellow-900/30 text-yellow-300 border-b-2 border-yellow-400" : "text-yellow-100 hover:bg-yellow-900/20"}`}>
          Siparişler
        </button>
        <button onClick={() => setActiveTab("offers")} className={`px-6 py-3 font-bold ${activeTab === "offers" ? "bg-yellow-900/30 text-yellow-300 border-b-2 border-yellow-400" : "text-yellow-100 hover:bg-yellow-900/20"}`}>
          Fırsatlar
        </button>
        <button onClick={() => setActiveTab("bulkOffers")} className={`px-6 py-3 font-bold ${activeTab === "bulkOffers" ? "bg-yellow-900/30 text-yellow-300 border-b-2 border-yellow-400" : "text-yellow-100 hover:bg-yellow-900/20"}`}>
          Toplu Fırsat
        </button>
        <button onClick={() => setActiveTab("requests")} className={`px-6 py-3 font-bold ${activeTab === "requests" ? "bg-yellow-900/30 text-yellow-300 border-b-2 border-yellow-400" : "text-yellow-100 hover:bg-yellow-900/20"}`}>
          Soru/Talepler
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {error && <div className="bg-red-900/30 border border-red-500 text-red-400 p-3 rounded mb-4">{error}</div>}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
              <h3 className="text-yellow-300 font-bold text-lg mb-2">Toplam Kullanıcı</h3>
              <p className="text-yellow-400 text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
              <h3 className="text-yellow-300 font-bold text-lg mb-2">Toplam Sipariş</h3>
              <p className="text-yellow-400 text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
              <h3 className="text-yellow-300 font-bold text-lg mb-2">Toplam Ürün</h3>
              <p className="text-yellow-400 text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
              <h3 className="text-yellow-300 font-bold text-lg mb-2">Toplam Gelir</h3>
              <p className="text-yellow-400 text-3xl font-bold">{stats.totalRevenue.toFixed(2)}₺</p>
            </div>
          </div>
        )}

        {/* Kullanıcılar */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-yellow-300 text-2xl font-bold mb-6">Kullanıcı Yönetimi</h2>
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-yellow-200">
                  <thead>
                    <tr className="border-b border-yellow-700">
                      <th className="text-left p-2">Ad Soyad</th>
                      <th className="text-left p-2">E-posta</th>
                      <th className="text-left p-2">Telefon</th>
                      <th className="text-left p-2">Kayıt Tarihi</th>
                      <th className="text-left p-2">Şifre İşlemi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-yellow-700/50">
                        <td className="p-2">{user.firstName} {user.lastName}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.phone || "-"}</td>
                        <td className="p-2">{user.createdAt ? user.createdAt.toDate().toLocaleDateString() : "-"}</td>
                        <td className="p-2">
                          <button
                            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition text-sm font-bold"
                            onClick={() => user.email && handleResetPassword(user.email)}
                          >
                            Şifreyi Sıfırla
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Ürünler */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-yellow-300 text-2xl font-bold mb-6">Ürün Yönetimi</h2>
            
            {/* Ürün Ekleme Formu */}
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6 mb-6">
              <h3 className="text-yellow-300 font-bold text-lg mb-4">Yeni Ürün Ekle</h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="name"
                  value={productForm.name} 
                  onChange={e => setProductForm({...productForm, name: e.target.value})}
                  placeholder="Ürün Adı" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                  required
                />
                <input 
                  name="price"
                  type="number"
                  value={productForm.price} 
                  onChange={e => setProductForm({...productForm, price: e.target.value})}
                  placeholder="Fiyat" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                  required
                />
                <select 
                  name="category"
                  value={productForm.category} 
                  onChange={e => setProductForm({...productForm, category: e.target.value})}
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100"
                  required
                >
                  <option value="">Kategori Seçin</option>
                  <option value="Kılıçlar">Kılıçlar</option>
                  <option value="Yüzükler">Yüzükler</option>
                  <option value="Kolyeler">Kolyeler</option>
                  <option value="Bileklikler">Bileklikler</option>
                  <option value="Kıyafetler">Kıyafetler</option>
                </select>
                <input 
                  name="stock"
                  type="number"
                  value={productForm.stock} 
                  onChange={e => setProductForm({...productForm, stock: e.target.value})}
                  placeholder="Stok Miktarı" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                />
                <input 
                  name="image"
                  value={productForm.image} 
                  onChange={e => setProductForm({...productForm, image: e.target.value})}
                  placeholder="Resim URL" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                />
                <textarea 
                  name="description"
                  value={productForm.description} 
                  onChange={e => setProductForm({...productForm, description: e.target.value})}
                  placeholder="Ürün Açıklaması" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100 md:col-span-2" 
                  rows={3}
                />
                <button type="submit" className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition md:col-span-2">
                  Ürün Ekle
                </button>
              </form>
            </div>

            {/* Ürün Listesi */}
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-yellow-200">
                  <thead>
                    <tr className="border-b border-yellow-700">
                      <th className="text-left p-2">Ürün Adı</th>
                      <th className="text-left p-2">Kategori</th>
                      <th className="text-left p-2">Fiyat</th>
                      <th className="text-left p-2">Stok</th>
                      <th className="text-left p-2">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-yellow-700/50">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.category}</td>
                        <td className="p-2">{product.price}₺</td>
                        <td className="p-2">{product.stock || 0}</td>
                        <td className="p-2">
                          <button className="bg-blue-600 text-white px-2 py-1 rounded text-sm mr-2">Düzenle</button>
                          <button className="bg-red-600 text-white px-2 py-1 rounded text-sm">Sil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Siparişler */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-yellow-300 text-2xl font-bold mb-6">Sipariş Yönetimi</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-yellow-300 font-bold text-lg">Sipariş #{order.id}</h3>
                      <p className="text-yellow-200 text-sm">Tarih: {order.createdAt ? order.createdAt.toDate().toLocaleDateString() : "-"}</p>
                      <p className="text-yellow-200 text-sm">Toplam: {order.total}₺</p>
                    </div>
                    <div>
                      <select 
                        value={order.status || "Beklemede"} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100"
                      >
                        <option value="Beklemede">Beklemede</option>
                        <option value="Hazırlanıyor">Hazırlanıyor</option>
                        <option value="Kargoda">Kargoda</option>
                        <option value="Teslim Edildi">Teslim Edildi</option>
                        <option value="İptal Edildi">İptal Edildi</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-yellow-200 text-sm">
                    <p>Adres: {order.address || "-"}</p>
                    <p>Ürünler: {order.items?.map((item: { name: string; quantity: number; price: number }) => `${item.name} x${item.quantity}`).join(", ") || "-"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fırsatlar */}
        {activeTab === "offers" && (
          <div>
            <h2 className="text-yellow-300 text-2xl font-bold mb-6">Fırsat Yönetimi</h2>
            
            {/* Fırsat Ekleme Formu */}
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6 mb-6">
              <h3 className="text-yellow-300 font-bold text-lg mb-4">Yeni Fırsat Ekle</h3>
              <form onSubmit={handleAddOffer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="title"
                  value={offerForm.title} 
                  onChange={e => setOfferForm({...offerForm, title: e.target.value})}
                  placeholder="Fırsat Başlığı" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                  required
                />
                <select 
                  name="type"
                  value={offerForm.type} 
                  onChange={e => setOfferForm({...offerForm, type: e.target.value})}
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100"
                >
                  <option value="discount">İndirim</option>
                  <option value="shipping">Kargo</option>
                  <option value="gift">Hediye</option>
                </select>
                <input 
                  name="discount"
                  value={offerForm.discount} 
                  onChange={e => setOfferForm({...offerForm, discount: e.target.value})}
                  placeholder="İndirim Oranı (%)" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                />
                <input 
                  name="code"
                  value={offerForm.code} 
                  onChange={e => setOfferForm({...offerForm, code: e.target.value})}
                  placeholder="Kupon Kodu" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                />
                <input 
                  name="minAmount"
                  type="number"
                  value={offerForm.minAmount} 
                  onChange={e => setOfferForm({...offerForm, minAmount: e.target.value})}
                  placeholder="Minimum Tutar" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                />
                <input 
                  name="expiry"
                  type="date"
                  value={offerForm.expiry} 
                  onChange={e => setOfferForm({...offerForm, expiry: e.target.value})}
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                />
                <div className="md:col-span-2">
                  <label className="text-yellow-200 text-sm mb-1 block">Fırsat Tipi</label>
                  <select
                    name="targetType"
                    value={offerForm.targetType}
                    onChange={e => setOfferForm({...offerForm, targetType: e.target.value, targetUser: ""})}
                    className="w-full p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100"
                  >
                    <option value="genel">Genel (Herkese Açık)</option>
                    <option value="ozel">Kişiye Özel</option>
                  </select>
                </div>
                {offerForm.targetType === "ozel" && (
                  <div className="md:col-span-2">
                    <input
                      name="targetUser"
                      value={offerForm.targetUser}
                      onChange={e => setOfferForm({...offerForm, targetUser: e.target.value})}
                      placeholder="Kullanıcı e-posta adresi veya ID"
                      className="w-full p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100"
                      required={offerForm.targetType === "ozel"}
                    />
                  </div>
                )}
                <textarea 
                  name="description"
                  value={offerForm.description} 
                  onChange={e => setOfferForm({...offerForm, description: e.target.value})}
                  placeholder="Fırsat Açıklaması" 
                  className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100 md:col-span-2" 
                  rows={3}
                  required
                />
                <button type="submit" className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition md:col-span-2">
                  Fırsat Ekle
                </button>
              </form>
            </div>

            {/* Fırsat Listesi */}
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-yellow-300 font-bold text-lg">{offer.title}</h3>
                      <p className="text-yellow-200 text-sm">{offer.description}</p>
                      {offer.code && <p className="text-yellow-400 text-sm">Kod: {offer.code}</p>}
                      {offer.expiry && <p className="text-yellow-400 text-sm">Son Tarih: {offer.expiry}</p>}
                      <p className="text-yellow-200 text-xs mt-2">
                        {offer.targetType === "ozel"
                          ? `Kişiye Özel: ${offer.targetUser}`
                          : "Genel (Herkese Açık)"}
                      </p>
                    </div>
                    <button 
                      onClick={() => deleteOffer(offer.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toplu Fırsatlar */}
        {activeTab === "bulkOffers" && (
          <div>
            <h2 className="text-yellow-300 text-2xl font-bold mb-6">Toplu Fırsat Ekleme</h2>
            
            <div className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
              <div className="text-yellow-200 text-center mb-6">
                <p className="text-lg mb-2">Aynı fırsatı birden fazla kullanıcıya toplu olarak ekleyin</p>
                <p className="text-sm text-yellow-300">Her satıra bir e-posta adresi yazın</p>
              </div>
              
              <form onSubmit={handleBulkAddOffers} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    name="title"
                    value={bulkOfferForm.title} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, title: e.target.value})}
                    placeholder="Fırsat Başlığı" 
                    className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                    required
                  />
                  <select 
                    name="type"
                    value={bulkOfferForm.type} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, type: e.target.value})}
                    className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100"
                  >
                    <option value="discount">İndirim</option>
                    <option value="shipping">Kargo</option>
                    <option value="gift">Hediye</option>
                  </select>
                  <input 
                    name="discount"
                    value={bulkOfferForm.discount} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, discount: e.target.value})}
                    placeholder="İndirim Oranı (%)" 
                    className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                  />
                  <input 
                    name="code"
                    value={bulkOfferForm.code} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, code: e.target.value})}
                    placeholder="Kupon Kodu" 
                    className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                  />
                  <input 
                    name="minAmount"
                    type="number"
                    value={bulkOfferForm.minAmount} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, minAmount: e.target.value})}
                    placeholder="Minimum Tutar" 
                    className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                  />
                  <input 
                    name="expiry"
                    type="date"
                    value={bulkOfferForm.expiry} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, expiry: e.target.value})}
                    className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
                  />
                </div>
                
                <div>
                  <label className="text-yellow-200 text-sm mb-2 block">E-posta Listesi (Her satıra bir e-posta)</label>
                  <textarea 
                    name="emailList"
                    value={bulkOfferForm.emailList} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, emailList: e.target.value})}
                    placeholder="ornek1@email.com&#10;ornek2@email.com&#10;ornek3@email.com" 
                    className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 resize-none" 
                    rows={8}
                    required
                  />
                  <p className="text-yellow-300 text-xs mt-1">
                    Toplam: {bulkOfferForm.emailList.split('\n').filter(email => email.trim()).length} e-posta
                  </p>
                </div>
                
                <div>
                  <label className="text-yellow-200 text-sm mb-2 block">Fırsat Açıklaması</label>
                  <textarea 
                    name="description"
                    value={bulkOfferForm.description} 
                    onChange={e => setBulkOfferForm({...bulkOfferForm, description: e.target.value})}
                    placeholder="Fırsat detaylarını buraya yazın..." 
                    className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 resize-none" 
                    rows={4}
                    required
                  />
                </div>
                
                {bulkLoading && (
                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                    <div className="text-yellow-300 font-bold mb-2">Fırsatlar Ekleniyor...</div>
                    <div className="w-full bg-black/60 rounded-full h-2 mb-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(bulkProgress.current / bulkProgress.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-yellow-200 text-sm">
                      {bulkProgress.current} / {bulkProgress.total} fırsat eklendi
                    </div>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={bulkLoading} 
                  className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {bulkLoading ? "Ekleniyor..." : `${bulkOfferForm.emailList.split('\n').filter(email => email.trim()).length} Kişiye Fırsat Ekle`}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                <h3 className="text-blue-300 font-bold mb-2">💡 Kullanım İpuçları</h3>
                <div className="text-blue-200 text-sm space-y-1">
                  <p>• Her satıra bir e-posta adresi yazın</p>
                  <p>• Boş satırlar otomatik olarak atlanır</p>
                  <p>• Aynı fırsat tüm e-posta adreslerine eklenir</p>
                  <p>• İşlem sırasında sayfayı kapatmayın</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Soru/Talepler */}
        {activeTab === "requests" && (
          <div>
            <h2 className="text-yellow-300 text-2xl font-bold mb-6">Soru/Talep Yönetimi</h2>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="bg-black/80 border-2 border-yellow-700 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-yellow-300 font-bold text-lg">{request.subject}</h3>
                      <p className="text-yellow-200 text-sm">Kategori: {request.category}</p>
                      <p className="text-yellow-200 text-sm">Kullanıcı: {request.userName}</p>
                      <p className="text-yellow-200 text-sm">Tarih: {request.createdAt ? request.createdAt.toDate().toLocaleDateString() : "-"}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${request.status === "Yanıtlandı" ? "bg-green-600" : "bg-yellow-600"}`}>
                      {request.status || "Beklemede"}
                    </span>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3">
                    <p className="text-yellow-200">{request.message}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                      Yanıtla
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                      Yanıtlandı Olarak İşaretle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}