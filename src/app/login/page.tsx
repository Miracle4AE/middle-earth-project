"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [resetUser, setResetUser] = useState<{ username: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("lotr-users") || "[]");
    const user = users.find((u: { username: string, password: unknown }) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("lotr-current-user", JSON.stringify(user));
      setMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => router.push("/"), 1200);
    } else {
      setMessage("Kullanıcı adı veya şifre yanlış!");
    }
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("lotr-users") || "[]");
    const user = users.find((u: { email: string, username: string }) => u.email === resetEmail);
    if (user) {
      setResetUser(user);
      setResetLink("/reset-password?user=" + encodeURIComponent(user.username));
      setMessage("");
    } else {
      setMessage("Bu e-posta ile kayıtlı kullanıcı bulunamadı!");
    }
  };

  const handleNewPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || !resetUser) return;
    const users = JSON.parse(localStorage.getItem("lotr-users") || "[]");
    const idx = users.findIndex((u: { username: string }) => u.username === resetUser.username);
    if (idx !== -1) {
      users[idx].password = newPass;
      localStorage.setItem("lotr-users", JSON.stringify(users));
      setMessage("Şifre başarıyla değiştirildi! Giriş yapabilirsin.");
      setShowNewPass(false);
      setShowReset(false);
      setResetLink("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Giriş Yap</h1>
      {!showReset && !showNewPass && (
        <>
          <form onSubmit={handleLogin} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Kullanıcı Adı" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
            <button type="submit" className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition">Giriş Yap</button>
            {message && <div className="text-green-400 font-bold text-center mt-2">{message}</div>}
          </form>
          <div className="text-yellow-200 mt-8 text-center max-w-xl">
            Hesabın yok mu? <a href="/register" className="underline text-yellow-400">Kayıt Ol</a>
            <br />
            <button onClick={() => setShowReset(true)} className="mt-4 underline text-yellow-400">Şifremi Unuttum</button>
          </div>
        </>
      )}
      {showReset && !showNewPass && (
        <form onSubmit={handleResetRequest} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md mt-4">
          <label className="text-yellow-300 font-bold">Kayıtlı E-posta Adresin
            <input value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="E-posta" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100 mt-1" />
          </label>
          <button type="submit" className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition">Şifre Sıfırlama Linki Gönder</button>
          {message && <div className="text-red-400 font-bold text-center mt-2">{message}</div>}
          {resetLink && (
            <div className="text-green-400 font-bold text-center mt-4">
              Şifre sıfırlama linkin hazır: <br />
              <button className="underline" onClick={() => { setShowNewPass(true); setShowReset(false); }}>Şifreyi Sıfırla</button>
            </div>
          )}
          <button type="button" onClick={() => { setShowReset(false); setMessage(""); setResetLink(""); }} className="text-yellow-400 underline mt-2">Geri Dön</button>
        </form>
      )}
      {showNewPass && (
        <form onSubmit={handleNewPass} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md mt-4">
          <label className="text-yellow-300 font-bold">Yeni Şifre
            <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Yeni Şifre" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100 mt-1" />
          </label>
          <button type="submit" className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition">Şifreyi Kaydet</button>
        </form>
      )}
    </div>
  );
} 