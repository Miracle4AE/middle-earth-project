"use client";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function RequestsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    category: "",
    subject: "",
    message: "",
    priority: "normal"
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setSending(true);
    try {
      if (!form.category || !form.subject || !form.message) {
        setError("Lütfen tüm zorunlu alanları doldurun.");
        setSending(false);
        return;
      }
      if (!user) {
        setError("Kullanıcı bulunamadı.");
        setSending(false);
        return;
      }
      await addDoc(collection(db, "requests"), {
        userId: user.uid,
        category: form.category,
        subject: form.subject,
        message: form.message,
        priority: form.priority,
        status: "Beklemede",
        createdAt: serverTimestamp(),
        userEmail: user.email,
        userName: user.displayName || user.email
      });
      setSuccess("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
      setForm({ category: "", subject: "", message: "", priority: "normal" });
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Soru ve Taleplerim</h1>
      
      <div className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-yellow-200 text-center mb-6">
          <p className="text-lg mb-2">Size nasıl yardımcı olabiliriz?</p>
          <p className="text-sm text-yellow-300">Sorularınızı ve taleplerinizi buradan iletebilirsiniz.</p>
        </div>
        
        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">Kategori *</label>
            <select 
              name="category"
              value={form.category} 
              onChange={handleChange} 
              className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 focus:border-yellow-400 focus:outline-none" 
              required
            >
              <option value="">Kategori seçiniz</option>
              <option value="Ürün Bilgisi">Ürün Bilgisi</option>
              <option value="Sipariş Durumu">Sipariş Durumu</option>
              <option value="İade/Değişim">İade/Değişim</option>
              <option value="Teknik Destek">Teknik Destek</option>
              <option value="Öneri/Şikayet">Öneri/Şikayet</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>
          
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">Konu *</label>
            <input 
              name="subject"
              value={form.subject} 
              onChange={handleChange} 
              placeholder="Mesajınızın konusu" 
              className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 focus:border-yellow-400 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">Öncelik</label>
            <select 
              name="priority"
              value={form.priority} 
              onChange={handleChange} 
              className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 focus:border-yellow-400 focus:outline-none"
            >
              <option value="low">Düşük</option>
              <option value="normal">Normal</option>
              <option value="high">Yüksek</option>
              <option value="urgent">Acil</option>
            </select>
          </div>
          
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">Mesajınız *</label>
            <textarea 
              name="message"
              value={form.message} 
              onChange={handleChange} 
              placeholder="Detaylı mesajınızı buraya yazın..." 
              className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 resize-none focus:border-yellow-400 focus:outline-none" 
              required 
              rows={6}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={sending} 
            className="bg-yellow-400 text-black font-bold py-3 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {sending ? "Gönderiliyor..." : "Mesajı Gönder"}
          </button>
          
          {success && (
            <div className="bg-green-900/30 border border-green-500 text-green-400 p-3 rounded text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 p-3 rounded text-center">
              {error}
            </div>
          )}
        </form>
        
        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <h3 className="text-yellow-300 font-bold mb-2">İletişim Bilgileri</h3>
          <div className="text-yellow-200 text-sm space-y-1">
            <p>📧 E-posta: destek@lotr-shop.com</p>
            <p>📞 Telefon: +90 212 555 0123</p>
            <p>🕒 Çalışma Saatleri: Pazartesi - Cuma, 09:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
} 