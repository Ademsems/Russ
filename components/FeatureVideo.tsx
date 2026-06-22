"use client";

import { useState } from "react";

interface FeatureVideoProps {
  src: string | null;
  label?: string;
  className?: string;
}

export default function FeatureVideo({ src, label, className = "" }: FeatureVideoProps) {
  const [failed, setFailed] = useState(false);

  const placeholderClass =
    "w-full h-full bg-gradient-to-br from-[#163F7A] to-[#0D2E5A] flex items-center justify-center";

  if (!src || failed) {
    return (
      <div className={placeholderClass}>
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00B89F 0%, transparent 60%)" }}
        />
        {label && (
          <span className="text-white/10 text-8xl font-bold select-none relative">{label}</span>
        )}
      </div>
    );
  }

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
