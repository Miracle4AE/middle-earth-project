console.log("BUILD ENV API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Ortam değişkenlerinin eksik olup olmadığını kontrol et
function checkEnvVar(name: string) {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is not defined!`);
  }
  return process.env[name];
}

const firebaseConfig = {
  apiKey: checkEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: checkEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: checkEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: checkEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: checkEnvVar("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: checkEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: checkEnvVar("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
};

// Firebase'i sadece client-side'da initialize et
let app;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
} else {
  // SSR sırasında tekrar tekrar initialize olmaması için
  if (!global._firebaseApp) {
    global._firebaseApp = initializeApp(firebaseConfig);
  }
  app = global._firebaseApp;
}

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// globalThis'a tip eklemesi
declare global {
  // eslint-disable-next-line no-var
  var _firebaseApp: ReturnType<typeof initializeApp> | undefined;
}

export { auth, db, analytics }; 