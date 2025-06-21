"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(form).some(v => !v)) {
      setMessage("Lütfen tüm alanları doldurun!");
      return;
    }
    // Kullanıcıları localStorage'da sakla
    const users = JSON.parse(localStorage.getItem("lotr-users") || "[]");
    if (users.find((u: { username: string }) => u.username === form.username)) {
      setMessage("Bu kullanıcı adı zaten alınmış!");
      return;
    }
    users.push(form);
    localStorage.setItem("lotr-users", JSON.stringify(users));
    setMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Üyelik Oluştur</h1>
      <form onSubmit={handleSubmit} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Ad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
        <input name="surname" value={form.surname} onChange={handleChange} placeholder="Soyad" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="E-posta" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Adres" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
        <input name="username" value={form.username} onChange={handleChange} placeholder="Kullanıcı Adı" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Şifre" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
        <button type="submit" className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition">Kayıt Ol</button>
        {message && <div className="text-green-400 font-bold text-center mt-2">{message}</div>}
      </form>
    </div>
  );
} 