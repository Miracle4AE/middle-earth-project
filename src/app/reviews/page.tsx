"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { doc, updateDoc, deleteDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from '../../lib/firebase';
import Image from "next/image";
import { initialProducts, Product } from "../shop/productsData";

type Review = {
  productName: string;
  productCategory: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt?: { toDate: () => Date };
};

export default function ReviewsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editModal, setEditModal] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !db) return;
    const fetchReviews = async () => {
      if (!db) return;
      const q = query(collection(db, "reviews"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      setReviews(snap.docs.map(doc => doc.data() as Review));
    };
    fetchReviews();
  }, [user]);

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("Görsel en fazla 2 MB olmalı!");
        return;
      }
      setEditImage(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (review: Review) => {
    setEditReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditPreview(review.imageUrl || null);
    setEditImage(null);
    setEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (!user || !db || !editReview) return;
    let imageUrl = editReview.imageUrl || '';
    if (editImage) {
      // Eski görseli sil
      if (imageUrl) {
        const storage = getStorage();
        const oldRef = storageRef(storage, imageUrl);
        try { await deleteObject(oldRef); } catch {}
      }
      const storage = getStorage();
      const imgRef = storageRef(storage, `reviews/${user.uid}_${Date.now()}_${editImage.name}`);
      await uploadBytes(imgRef, editImage);
      imageUrl = await getDownloadURL(imgRef);
    }
    // Yorumu bul
    const q = query(collection(db, "reviews"), where("userId", "==", user.uid), where("createdAt", "==", editReview.createdAt));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docRef = doc(db, "reviews", snap.docs[0].id);
      await updateDoc(docRef, {
        rating: editRating,
        comment: editComment,
        imageUrl
      });
    }
    setEditModal(false);
    setEditReview(null);
    setEditImage(null);
    setEditPreview(null);
    // Refresh
    const q2 = query(collection(db, "reviews"), where("userId", "==", user.uid));
    const snap2 = await getDocs(q2);
    setReviews(snap2.docs.map(doc => doc.data() as Review));
  };

  const handleDelete = async (review: Review) => {
    if (!user || !db) return;
    // Yorumu bul
    const q = query(collection(db, "reviews"), where("userId", "==", user.uid), where("createdAt", "==", review.createdAt));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docRef = doc(db, "reviews", snap.docs[0].id);
      await deleteDoc(docRef);
      // Görseli sil
      if (review.imageUrl) {
        const storage = getStorage();
        const imgRef = storageRef(storage, review.imageUrl);
        try { await deleteObject(imgRef); } catch {}
      }
    }
    // Refresh
    const q2 = query(collection(db, "reviews"), where("userId", "==", user.uid));
    const snap2 = await getDocs(q2);
    setReviews(snap2.docs.map(doc => doc.data() as Review));
  };

  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Değerlendirmelerim</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.length === 0 ? (
          <div className="text-yellow-200 text-center col-span-2">Henüz bir yorumunuz yok.</div>
        ) : (
          reviews.map((r, i) => {
            // Ürünü bul
            let product = null;
            for (const cat in initialProducts) {
              product = (initialProducts[cat] as Product[]).find((p: Product) => p.name.tr === r.productName && p.category === r.productCategory);
              if (product) break;
            }
            return (
              <div key={i} className="bg-black/70 rounded-2xl border-2 border-yellow-700 shadow-xl flex flex-col items-center p-6 relative mb-8">
                {product && (
                  <>
                    <Image src={product.img} alt={product.name.tr} width={128} height={128} className="w-32 h-32 object-contain mb-2 rounded" />
                    <h3 className="font-[Ringbearer] text-2xl text-yellow-300 mb-1 drop-shadow-[0_0_10px_gold]">{product.name.tr}</h3>
                    <div className="text-yellow-400 font-bold text-lg mb-1">{product.price}</div>
                    <div className="text-gray-200 text-center text-base mb-2">{product.desc.tr}</div>
                  </>
                )}
                <span className="text-yellow-500 text-lg mb-1">{r.rating} ★</span>
                <div className="text-yellow-100 text-sm mb-2">{r.comment}</div>
                {r.imageUrl && <Image src={r.imageUrl} alt="yorum görseli" width={128} height={128} className="mb-2 max-h-32 rounded object-contain" />}
                <span className="text-yellow-200 text-xs">{r.createdAt && r.createdAt.toDate ? r.createdAt.toDate().toLocaleString() : ''}</span>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(r)} className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600">Düzenle</button>
                  <button onClick={() => handleDelete(r)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Sil</button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {editModal && editReview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-yellow-100 rounded-xl p-8 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-black text-2xl" onClick={() => setEditModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Yorumu Düzenle</h2>
            <div className="flex items-center mb-4">
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  className={`text-3xl cursor-pointer ${star <= editRating ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => setEditRating(star)}
                >★</span>
              ))}
            </div>
            <textarea
              className="w-full p-2 rounded border border-yellow-400 mb-4 text-black"
              rows={3}
              placeholder="Yorumunuzu yazın..."
              value={editComment}
              onChange={e => setEditComment(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              className="mb-2 text-black"
            />
            {editPreview && (
              <Image src={editPreview} alt="Önizleme" width={128} height={128} className="mb-2 max-h-32 rounded object-contain" />
            )}
            <button
              className="w-full mt-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 transition"
              onClick={handleEditSubmit}
            >
              Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 