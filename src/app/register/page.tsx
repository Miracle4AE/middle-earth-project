"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile, AuthError } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    displayName: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };
    if (
      (name === "birthDay" || name === "birthMonth" || name === "birthYear") &&
      (updatedForm.birthDay && updatedForm.birthMonth && updatedForm.birthYear)
    ) {
      // GG.AA.YYYY formatında birleştir
      const gun = String(updatedForm.birthDay).padStart(2, "0");
      const ay = String(updatedForm.birthMonth).padStart(2, "0");
      updatedForm.birthDate = `${gun}.${ay}.${updatedForm.birthYear}`;
    }
    setForm(updatedForm);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyon
    if (!form.displayName || !form.firstName || !form.lastName || !form.birthDate || 
        !form.gender || !form.phone || !form.email || !form.password || !form.confirmPassword) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    
    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }

    // Telefon formatı kontrolü (basit)
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(form.phone)) {
      setError("Geçerli bir telefon numarası girin.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Firebase Authentication profilini güncelle (görünen ad için)
      await updateProfile(user, { displayName: form.displayName });

      // Firestore'a kullanıcı verilerini kaydet
      await setDoc(doc(db, "profiles", user.uid), {
        uid: user.uid,
        displayName: form.displayName,
        firstName: form.firstName,
        lastName: form.lastName,
        birthDate: form.birthDate,
        gender: form.gender,
        phone: form.phone,
        email: form.email,
        createdAt: new Date(),
      });

      router.push("/");
    } catch (error: unknown) {
      console.error("Kayıt sırasında hata:", error);
      const authError = error as AuthError;
      if (authError.code === 'auth/email-already-in-use') {
        setError("Bu e-posta adresi zaten kullanılıyor.");
      } else {
        setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Üyelik Oluştur</h1>
      <form onSubmit={handleRegister} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
        <input 
          name="displayName"
          value={form.displayName} 
          onChange={handleChange} 
          placeholder="Görünecek İsim" 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
          required
        />
        <input 
          name="firstName"
          value={form.firstName} 
          onChange={handleChange} 
          placeholder="İsim" 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
          required
        />
        <input 
          name="lastName"
          value={form.lastName} 
          onChange={handleChange} 
          placeholder="Soyisim" 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
          required
        />
        <label className="text-yellow-200 text-sm">Doğum Tarihi</label>
        <div className="flex gap-2">
          <select name="birthDay" value={form.birthDay || ""} onChange={handleChange} className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required>
            <option value="">Gün</option>
            {[...Array(31)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
          <select name="birthMonth" value={form.birthMonth || ""} onChange={handleChange} className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required>
            <option value="">Ay</option>
            {[
              "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
              "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"
            ].map((ay, i) => (
              <option key={i+1} value={i+1}>{ay}</option>
            ))}
          </select>
          <select name="birthYear" value={form.birthYear || ""} onChange={handleChange} className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required>
            <option value="">Yıl</option>
            {Array.from({length: 2025-1900+1}, (_, i) => 1900+i).map(yil => (
              <option key={yil} value={yil}>{yil}</option>
            ))}
          </select>
        </div>
        <select 
          name="gender"
          value={form.gender} 
          onChange={handleChange} 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100"
          required
        >
          <option value="">Cinsiyet (seçiniz)</option>
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
          <option value="Diğer">Diğer</option>
        </select>
        <input 
          name="phone"
          value={form.phone} 
          onChange={handleChange} 
          placeholder="Telefon Numarası" 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
          required
        />
        <input 
          type="email"
          name="email"
          value={form.email} 
          onChange={handleChange} 
          placeholder="Mail Adresi" 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
          required
        />
        <input 
          type="password" 
          name="password"
          value={form.password} 
          onChange={handleChange} 
          placeholder="Şifre (en az 6 karakter)" 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
          required
        />
        <input 
          type="password" 
          name="confirmPassword"
          value={form.confirmPassword} 
          onChange={handleChange} 
          placeholder="Şifre Doğrulama" 
          className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" 
          required
        />
        <button type="submit" disabled={loading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">
          {loading ? "Kaydediliyor..." : "Kayıt Ol"}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
      <div className="text-yellow-200 mt-8 text-center max-w-xl">
        Zaten bir hesabın var mı? <Link href="/login" className="underline text-yellow-400">Giriş Yap</Link>
      </div>
    </div>
  );
} 