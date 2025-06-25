"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

interface Address {
  title: string;
  country: string;
  city: string;
  district: string;
  address: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");

  // Üyelik Bilgilerim
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: ""
  });

  // Şifre Değişikliği
  const [passwordStep, setPasswordStep] = useState(0); // 0: mevcut şifre, 1: yeni şifre
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // İletişim Tercihleri
  const [prefs, setPrefs] = useState({ sms: false, email: false, phone: false });
  const [prefsMsg, setPrefsMsg] = useState("");
  const [prefsLoading, setPrefsLoading] = useState(false);

  // Adreslerim
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressForm, setAddressForm] = useState({
    title: "",
    country: "Türkiye",
    city: "",
    district: "",
    address: ""
  });
  const [addressMsg, setAddressMsg] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);

  // Bilgilerimi Güncelle
  const [updateStep, setUpdateStep] = useState(0); // 0: doğrulama, 1: güncelleme
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePwd, setUpdatePwd] = useState("");
  const [updateForm, setUpdateForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: ""
  });
  const [updateMsg, setUpdateMsg] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

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
          setUpdateForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            birthDate: data.birthDate || "",
            gender: data.gender || "",
            phone: data.phone || "",
            email: data.email || user.email || ""
          });
          setPrefs({
            sms: data.sms ?? false,
            email: data.emailPref ?? false,
            phone: data.phonePref ?? false
          });
        } else {
          setForm(f => ({ ...f, email: user.email || "" }));
          setUpdateForm(f => ({ ...f, email: user.email || "" }));
        }
      };
      const fetchAddresses = async () => {
        const ref = doc(db, "addresses", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setAddresses(snap.data().list || []);
        }
      };
      fetchProfile();
      fetchAddresses();
    }
  }, [user, loading, router]);

  // Şifre Değişikliği
  const handlePasswordCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg("");
    setPasswordError("");
    if (!user || !user.email) {
      setPasswordError("Kullanıcı bulunamadı.");
      setPasswordLoading(false);
      return;
    }
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      setPasswordStep(1);
      setPasswordMsg("Mevcut şifre doğru. Yeni şifreni gir.");
    } catch {
      setPasswordError("Mevcut şifre yanlış.");
    } finally {
      setPasswordLoading(false);
    }
  };
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg("");
    setPasswordError("");
    if (!user) {
      setPasswordError("Kullanıcı bulunamadı.");
      setPasswordLoading(false);
      return;
    }
    try {
      await updatePassword(user, newPassword);
      setPasswordMsg("Şifre başarıyla güncellendi!");
      setPasswordStep(0);
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      setPasswordError("Şifre güncellenemedi. Lütfen tekrar dene.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // İletişim Tercihleri
  const handlePrefChange = (key: string) => {
    setPrefs(p => ({ ...p, [key]: !p[key as keyof typeof p] }));
  };
  const handlePrefsSave = async () => {
    setPrefsLoading(true);
    setPrefsMsg("");
    if (!user) {
      setPrefsMsg("Kullanıcı bulunamadı.");
      setPrefsLoading(false);
      return;
    }
    try {
      await setDoc(doc(db, "profiles", user.uid), {
        sms: prefs.sms,
        emailPref: prefs.email,
        phonePref: prefs.phone
      }, { merge: true });
      setPrefsMsg("Tercihler güncellendi!");
    } catch {
      setPrefsMsg("Bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setPrefsLoading(false);
    }
  };

  // Adreslerim
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressLoading(true);
    setAddressMsg("");
    if (!user) {
      setAddressMsg("Kullanıcı bulunamadı.");
      setAddressLoading(false);
      return;
    }
    if (!addressForm.title || !addressForm.country || !addressForm.city || !addressForm.district || !addressForm.address) {
      setAddressMsg("Tüm alanlar zorunludur.");
      setAddressLoading(false);
      return;
    }
    try {
      const newAddresses = [...addresses, { ...addressForm }];
      await setDoc(doc(db, "addresses", user.uid), { list: newAddresses });
      setAddresses(newAddresses);
      setAddressForm({ title: "", country: "Türkiye", city: "", district: "", address: "" });
      setAddressMsg("Adres eklendi!");
    } catch {
      setAddressMsg("Bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setAddressLoading(false);
    }
  };
  const handleDeleteAddress = async (idx: number) => {
    if (!user) return;
    const newAddresses = addresses.filter((_, i) => i !== idx);
    await setDoc(doc(db, "addresses", user.uid), { list: newAddresses });
    setAddresses(newAddresses);
  };

  // Bilgilerimi Güncelle
  const handleUpdateCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateMsg("");
    setUpdateError("");
    if (!user || !user.email) {
      setUpdateError("Kullanıcı bulunamadı.");
      setUpdateLoading(false);
      return;
    }
    try {
      const cred = EmailAuthProvider.credential(updateEmail, updatePwd);
      await reauthenticateWithCredential(user, cred);
      setUpdateStep(1);
      setUpdateMsg("Doğrulama başarılı. Bilgilerini güncelleyebilirsin.");
    } catch {
      setUpdateError("Mail veya şifre yanlış.");
    } finally {
      setUpdateLoading(false);
    }
  };
  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };
  const handleUpdateSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateMsg("");
    setUpdateError("");
    if (!user) {
      setUpdateError("Kullanıcı bulunamadı.");
      setUpdateLoading(false);
      return;
    }
    try {
      if (!updateForm.firstName || !updateForm.lastName || !updateForm.phone || !updateForm.email) {
        setUpdateError("Ad, Soyad, Telefon ve Mail zorunludur.");
        setUpdateLoading(false);
        return;
      }
      await setDoc(doc(db, "profiles", user.uid), { ...updateForm }, { merge: true });
      setUpdateMsg("Bilgiler güncellendi!");
    } catch {
      setUpdateError("Bir hata oluştu. Lütfen tekrar dene.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Kullanıcı Bilgilerim</h1>
      <div className="flex gap-4 mb-8 flex-wrap">
        <button onClick={() => setActiveTab("info")} className={`px-6 py-2 rounded-t-lg font-bold border-b-4 ${activeTab === "info" ? "border-yellow-400 bg-yellow-900/30 text-yellow-300" : "border-transparent bg-black/60 text-yellow-100"}`}>Üyelik Bilgilerim</button>
        <button onClick={() => setActiveTab("password")} className={`px-6 py-2 rounded-t-lg font-bold border-b-4 ${activeTab === "password" ? "border-yellow-400 bg-yellow-900/30 text-yellow-300" : "border-transparent bg-black/60 text-yellow-100"}`}>Şifre Değişikliği</button>
        <button onClick={() => setActiveTab("prefs")} className={`px-6 py-2 rounded-t-lg font-bold border-b-4 ${activeTab === "prefs" ? "border-yellow-400 bg-yellow-900/30 text-yellow-300" : "border-transparent bg-black/60 text-yellow-100"}`}>İletişim Tercihlerim</button>
        <button onClick={() => setActiveTab("addresses")} className={`px-6 py-2 rounded-t-lg font-bold border-b-4 ${activeTab === "addresses" ? "border-yellow-400 bg-yellow-900/30 text-yellow-300" : "border-transparent bg-black/60 text-yellow-100"}`}>Adreslerim</button>
        <button onClick={() => setActiveTab("update")} className={`px-6 py-2 rounded-t-lg font-bold border-b-4 ${activeTab === "update" ? "border-yellow-400 bg-yellow-900/30 text-yellow-300" : "border-transparent bg-black/60 text-yellow-100"}`}>Bilgilerimi Güncelle</button>
      </div>
      {activeTab === "info" && (
        <div className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
          <input name="firstName" value={form.firstName} readOnly placeholder="Ad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <input name="lastName" value={form.lastName} readOnly placeholder="Soyad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <label className="text-yellow-200 text-sm">Doğum Tarihi</label>
          <input type="date" name="birthDate" value={form.birthDate} readOnly className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <select name="gender" value={form.gender} disabled className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100">
            <option value="">Cinsiyet (seçiniz)</option>
            <option value="Erkek">Erkek</option>
            <option value="Kadın">Kadın</option>
            <option value="Diğer">Diğer</option>
          </select>
          <input name="phone" value={form.phone} readOnly placeholder="Telefon Numarası" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <input name="email" value={form.email} readOnly placeholder="Mail Adresi" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <div className="text-yellow-400 text-center text-sm mt-2">Bilgiler sadece ilk kayıt sırasında doldurulabilir. Güncellemek için &quot;Bilgilerimi Güncelle&quot; sekmesini kullan.</div>
        </div>
      )}
      {activeTab === "addresses" && (
        <div className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-6 w-full max-w-md">
          <form onSubmit={handleAddAddress} className="flex flex-col gap-4">
            <input name="title" value={addressForm.title} onChange={handleAddressChange} placeholder="Adres Başlığı" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
            <select name="country" value={addressForm.country} onChange={handleAddressChange} className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100">
              <option value="Türkiye">Türkiye</option>
              {/* Diğer ülkeler eklenebilir */}
            </select>
            <input name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="Şehir" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
            <input name="district" value={addressForm.district} onChange={handleAddressChange} placeholder="İlçe" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
            <textarea name="address" value={addressForm.address} onChange={handleAddressChange} placeholder="Açık Adres" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100 resize-none" required rows={3} />
            <button type="submit" disabled={addressLoading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">{addressLoading ? "Ekleniyor..." : "Ekle"}</button>
            {addressMsg && <div className="text-green-400 text-center mt-2">{addressMsg}</div>}
          </form>
          <div className="mt-6">
            <div className="text-yellow-300 font-bold mb-2">Kayıtlı Adresler:</div>
            {addresses.length === 0 ? (
              <div className="text-yellow-200">Henüz adres eklemediniz.</div>
            ) : (
              <ul className="flex flex-col gap-2">
                {addresses.map((ad, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-black/60 border border-yellow-700 rounded p-2">
                    <div>
                      <div className="font-bold text-yellow-300">{ad.title}</div>
                      <div className="text-yellow-200 text-sm">{ad.country}, {ad.city}, {ad.district}</div>
                      <div className="text-yellow-100 text-xs">{ad.address}</div>
                    </div>
                    <button onClick={() => handleDeleteAddress(idx)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">Sil</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {activeTab === "update" && (
        <div className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-6 w-full max-w-md">
          {updateStep === 0 ? (
            <form onSubmit={handleUpdateCheck} className="flex flex-col gap-4">
              <input type="email" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} placeholder="Mail Adresi" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <input type="password" value={updatePwd} onChange={e => setUpdatePwd(e.target.value)} placeholder="Şifre" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <button type="submit" disabled={updateLoading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">{updateLoading ? "Doğrulanıyor..." : "Devam Et"}</button>
              {updateError && <div className="text-red-500 text-center mt-2">{updateError}</div>}
              {updateMsg && <div className="text-green-400 text-center mt-2">{updateMsg}</div>}
            </form>
          ) : (
            <form onSubmit={handleUpdateSave} className="flex flex-col gap-4">
              <input name="firstName" value={updateForm.firstName} onChange={handleUpdateChange} placeholder="Ad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <input name="lastName" value={updateForm.lastName} onChange={handleUpdateChange} placeholder="Soyad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <label className="text-yellow-200 text-sm">Doğum Tarihi</label>
              <input type="date" name="birthDate" value={updateForm.birthDate} onChange={handleUpdateChange} className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
              <select name="gender" value={updateForm.gender} onChange={handleUpdateChange} className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100">
                <option value="">Cinsiyet (seçiniz)</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
                <option value="Diğer">Diğer</option>
              </select>
              <input name="phone" value={updateForm.phone} onChange={handleUpdateChange} placeholder="Telefon Numarası" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <input name="email" value={updateForm.email} onChange={handleUpdateChange} placeholder="Mail Adresi" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <button type="submit" disabled={updateLoading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">{updateLoading ? "Güncelleniyor..." : "Güncelle"}</button>
              {updateError && <div className="text-red-500 text-center mt-2">{updateError}</div>}
              {updateMsg && <div className="text-green-400 text-center mt-2">{updateMsg}</div>}
            </form>
          )}
        </div>
      )}
      {activeTab === "password" && (
        <form onSubmit={passwordStep === 0 ? handlePasswordCheck : handlePasswordUpdate} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
          {passwordStep === 0 ? (
            <>
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Mevcut Şifre" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <button type="submit" disabled={passwordLoading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">{passwordLoading ? "Kontrol Ediliyor..." : "Devam Et"}</button>
            </>
          ) : (
            <>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Yeni Şifre" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" required />
              <button type="submit" disabled={passwordLoading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">{passwordLoading ? "Güncelleniyor..." : "Güncelle"}</button>
            </>
          )}
          {passwordMsg && <div className="text-green-400 text-center mt-2">{passwordMsg}</div>}
          {passwordError && <div className="text-red-500 text-center mt-2">{passwordError}</div>}
        </form>
      )}
      {activeTab === "prefs" && (
        <div className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-6 w-full max-w-md">
          <div className="flex items-center justify-between">
            <span className="text-yellow-200">Anlık/Kısa Mesaj Kanalları</span>
            <button onClick={() => handlePrefChange("sms")}
              className={`w-12 h-6 rounded-full ${prefs.sms ? "bg-yellow-400" : "bg-gray-600"} relative transition-all`}
            >
              <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-black transition-all ${prefs.sms ? "translate-x-6" : ""}`}></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-yellow-200">E-Posta</span>
            <button onClick={() => handlePrefChange("email")}
              className={`w-12 h-6 rounded-full ${prefs.email ? "bg-yellow-400" : "bg-gray-600"} relative transition-all`}
            >
              <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-black transition-all ${prefs.email ? "translate-x-6" : ""}`}></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-yellow-200">Telefon Araması</span>
            <button onClick={() => handlePrefChange("phone")}
              className={`w-12 h-6 rounded-full ${prefs.phone ? "bg-yellow-400" : "bg-gray-600"} relative transition-all`}
            >
              <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-black transition-all ${prefs.phone ? "translate-x-6" : ""}`}></span>
            </button>
          </div>
          <button onClick={handlePrefsSave} disabled={prefsLoading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">{prefsLoading ? "Kaydediliyor..." : "Kaydet"}</button>
          {prefsMsg && <div className="text-green-400 text-center mt-2">{prefsMsg}</div>}
        </div>
      )}
    </div>
  );
} 