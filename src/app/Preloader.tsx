"use client";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
      <h2 className="font-[Ringbearer] text-2xl text-yellow-300 drop-shadow-[0_0_10px_gold] mb-4">
        Orta Dünya&apos;ya Işınlanıyorsun...
      </h2>
      <div className="w-80 h-4 bg-black/50 border-2 border-yellow-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-4xl font-bold text-yellow-400 mt-2">{Math.round(progress)}%</p>
    </div>
  );
} 