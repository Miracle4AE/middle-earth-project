"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function ProfileInfoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: ""
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      const fetchProfile = async () => {
        const ref = doc(db, "profiles", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            birthDate: data.birthDate || "",
            gender: data.gender || "",
            phone: data.phone || "",
            email: data.email || user.email || ""
          });
        } else {
          setForm(f => ({ ...f, email: user.email || "" }));
        }
      };
      fetchProfile();
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");
    if (!user) {
      setError("Kullanıcı bulunamadı.");
      setSaving(false);
      return;
    }
    try {
      if (!form.firstName || !form.lastName || !form.phone || !form.email) {
        setError("Ad, Soyad, Telefon ve Mail zorunludur.");
        setSaving(false);
        return;
      }
      await setDoc(doc(db, "profiles", user.uid), form, { merge: true });
      setSuccess("Bilgiler güncellendi!");
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Üyelik Bilgilerim</h1>
      <form onSubmit={handleSave} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Ad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Soyad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
        <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} max="2025-12-31" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
        <select name="gender" value={form.gender} onChange={handleChange} className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100">
          <option value="">Cinsiyet (seçiniz)</option>
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
          <option value="Diğer">Diğer</option>
        </select>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon Numarası" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Mail Adresi" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
        <button type="submit" disabled={saving} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {success && <div className="text-green-400 text-center mt-2">{success}</div>}
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </form>
    </div>
  );
} 