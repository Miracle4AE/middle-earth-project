"use client";

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
      <h2 className="font-[Ringbearer] text-2xl text-yellow-300 drop-shadow-[0_0_10px_gold] mb-4">
        Orta Dünya&apos;ya Işınlanıyorsun...
      </h2>
      <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
} 