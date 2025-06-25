"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail, AuthError } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Lütfen e-posta ve şifrenizi girin.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      router.push("/");
    } catch (error: unknown) {
      console.error("Giriş sırasında hata:", error);
      const authError = error as AuthError;
      if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
        setError("E-posta veya şifre yanlış.");
      } else {
        setError("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Lütfen şifresini sıfırlamak istediğiniz e-posta adresini girin.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Şifre sıfırlama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edin.");
    } catch (error: unknown) {
      console.error("Şifre sıfırlama sırasında hata:", error);
      const authError = error as AuthError;
      if (authError.code === 'auth/user-not-found') {
        setError("Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı.");
      } else {
        setError("Şifre sıfırlama e-postası gönderilirken bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">
        {showReset ? "Şifremi Unuttum" : "Giriş Yap"}
      </h1>
      
      {!showReset ? (
        <>
          <form onSubmit={handleLogin} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-posta" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
            <button type="submit" disabled={loading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
          <div className="text-yellow-200 mt-8 text-center max-w-xl">
            Hesabın yok mu? <Link href="/register" className="underline text-yellow-400">Kayıt Ol</Link>
            <br />
            <button onClick={() => { setShowReset(true); setError(''); }} className="mt-4 underline text-yellow-400">Şifremi Unuttum</button>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handlePasswordReset} className="bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md">
            <p className="text-yellow-200 text-sm mb-2">Kayıtlı e-posta adresinize bir sıfırlama bağlantısı göndereceğiz.</p>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-posta" className="p-2 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
            <button type="submit" disabled={loading} className="bg-yellow-400 text-black font-bold py-2 rounded mt-4 hover:bg-yellow-500 transition disabled:bg-gray-500">
              {loading ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {message && <p className="text-green-500 text-center mt-2">{message}</p>}
          </form>
          <button onClick={() => { setShowReset(false); setError(''); setMessage(''); }} className="mt-6 underline text-yellow-400">Giriş Yapmaya Geri Dön</button>
        </>
      )}
    </div>
  );
} 