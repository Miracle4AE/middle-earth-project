"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from '../../lib/firebase';
import { Timestamp } from "firebase/firestore";
import { useLanguage } from "../LanguageContext";

// Firestore'dan gelen request objesi tipi
interface Request {
  id: string;
  userId: string;
  category: string;
  subject: string;
  message: string;
  priority: string;
  status: string;
  createdAt?: Timestamp;
  userEmail?: string;
  userName?: string;
  reply?: string;
}

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
  const [userRequests, setUserRequests] = useState<Request[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    if (!user || !db) return;
    const fetchRequests = async () => {
      const q = query(
        collection(db!, "requests"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setUserRequests(snap.docs.map((doc: import("firebase/firestore").QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Request)));
    };
    fetchRequests();
  }, [user, success]);

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
      if (!db) {
        setError("Firestore bağlantısı kurulamadı.");
        setSending(false);
        return;
      }
      await addDoc(collection(db!, "requests"), {
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

  const categoryOptions = [
    { value: "", label: t('select_category') },
    { value: "Ürün Bilgisi", label: t('category_product') },
    { value: "Sipariş Durumu", label: t('category_order') },
    { value: "İade/Değişim", label: t('category_return') },
    { value: "Teknik Destek", label: t('category_technical') },
    { value: "Öneri/Şikayet", label: t('category_suggestion') },
    { value: "Diğer", label: t('category_other') },
  ];
  const priorityOptions = [
    { value: "low", label: t('priority_low') },
    { value: "normal", label: t('priority_normal') },
    { value: "high", label: t('priority_high') },
    { value: "urgent", label: t('priority_urgent') },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">{t('requests_title')}</h1>
      
      <div className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-yellow-200 text-center mb-6">
          <p className="text-lg mb-2">{t('requests_help_title')}</p>
          <p className="text-sm text-yellow-300">{t('requests_help_sub')}</p>
        </div>
        
        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">{t('category')} *</label>
            <select 
              name="category"
              value={form.category} 
              onChange={handleChange} 
              className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 focus:border-yellow-400 focus:outline-none" 
              required
            >
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">{t('subject')} *</label>
            <input 
              name="subject"
              value={form.subject} 
              onChange={handleChange} 
              placeholder={t('subject_placeholder')} 
              className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 focus:border-yellow-400 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">{t('priority')}</label>
            <select 
              name="priority"
              value={form.priority} 
              onChange={handleChange} 
              className="w-full p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 focus:border-yellow-400 focus:outline-none"
            >
              {priorityOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-yellow-200 text-sm mb-1 block">{t('message')} *</label>
            <textarea 
              name="message"
              value={form.message} 
              onChange={handleChange} 
              placeholder={t('message_placeholder')} 
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
            {sending ? t('sending') : t('send_message')}
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
          <h3 className="text-yellow-300 font-bold mb-2">{t('contact_info')}</h3>
          <div className="text-yellow-200 text-sm space-y-1">
            <p>📧 {t('email')}: destek@lotr-shop.com</p>
            <p>📞 {t('phone')}: +90 212 555 0123</p>
            <p>🕒 {t('work_hours')}: Pazartesi - Cuma, 09:00 - 18:00</p>
          </div>
        </div>

        {/* Kullanıcının geçmiş talepleri ve admin yanıtı */}
        <div className="mt-10">
          <h2 className="text-yellow-300 text-xl font-bold mb-4">{t('past_requests')}</h2>
          {userRequests.length === 0 ? (
            <div className="text-yellow-200 text-center">{t('no_requests')}</div>
          ) : (
            userRequests.map((request) => (
              <div key={request.id} className="bg-black/70 border border-yellow-700 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <b>{t('topic')}:</b> {request.subject} <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${request.status === "Yanıtlandı" || request.status === "Answered" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}`}>{request.status === "Yanıtlandı" || request.status === "Answered" ? t('answered') : t('pending')}</span>
                  </div>
                  <div className="text-yellow-300 text-xs">{request.createdAt && request.createdAt.toDate ? request.createdAt.toDate().toLocaleDateString() : "-"}</div>
                </div>
                <div className="bg-black/40 rounded-lg p-2 mb-2">
                  <b>{t('your_message')}:</b>
                  <div className="text-yellow-200">{request.message}</div>
                </div>
                {request.reply && (
                  <div className="mt-2 p-2 bg-green-900/30 border border-green-700 rounded text-green-300">
                    <b>{t('reply')}:</b> {request.reply}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 