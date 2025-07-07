import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase config interface'i
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Firebase config'i sadece client-side'da oluştur
let firebaseConfig: FirebaseConfig | null = null;
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

// Sadece client-side'da Firebase'i initialize et
if (typeof window !== "undefined") {
  // Ortam değişkenlerinin eksik olup olmadığını kontrol et
  function checkEnvVar(name: string): string {
    if (!process.env[name]) {
      console.warn(`Environment variable ${name} is not defined!`);
      return "";
    }
    return process.env[name] || "";
  }

  firebaseConfig = {
    apiKey: checkEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: checkEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: checkEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: checkEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: checkEnvVar("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: checkEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID"),
    measurementId: checkEnvVar("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
  };

  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  // SSR sırasında null değerler döndür
  auth = null;
  db = null;
  analytics = null;
}

export { auth, db, analytics }; 