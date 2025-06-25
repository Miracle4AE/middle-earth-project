"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CartItem = { name: string; category: string; price: string; img: string; quantity: number };

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const c: CartItem[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
    setCart(c);
    let t = 0;
    c.forEach((item: CartItem) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      t += price * item.quantity;
    });
    setTotal(t);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("lotr-cart", JSON.stringify(newCart));
    let t = 0;
    newCart.forEach((item: CartItem) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      t += price * item.quantity;
    });
    setTotal(t);
  };

  const handleIncrease = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  const handleDecrease = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCart(newCart);
    } else {
      handleRemove(index);
    }
  };

  const handleRemove = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const handleBuy = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Sepetim</h1>
      {cart.length === 0 ? (
        <div className="text-yellow-200 text-xl">Sepetinizde ürün yok.</div>
      ) : (
        <div className="w-full max-w-2xl">
          <table className="w-full text-yellow-200 mb-6">
            <thead>
              <tr className="border-b border-yellow-700">
                <th className="p-2">Ürün</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Fiyat</th>
                <th className="p-2">Adet</th>
                <th className="p-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i} className="border-b border-yellow-800">
                  <td className="p-2 flex items-center gap-2">
                    <Image src={item.img} alt={item.name} width={48} height={48} className="object-contain rounded" />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.price}</td>
                  <td className="p-2 flex items-center gap-2">
                    <button onClick={() => handleDecrease(i)} className="bg-yellow-400 text-black px-2 rounded font-bold">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(i)} className="bg-yellow-400 text-black px-2 rounded font-bold">+</button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleRemove(i)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">Sepetten Çıkart</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-yellow-300 text-xl font-bold mb-4">Toplam: {total.toLocaleString()}₺</div>
          <button onClick={handleBuy} className="bg-yellow-400 text-black font-bold py-2 px-8 rounded hover:bg-yellow-500 transition">Satın Al</button>
          {message && <div className="text-green-400 font-bold text-center mt-4">{message}</div>}
        </div>
      )}
    </div>
  );
} 