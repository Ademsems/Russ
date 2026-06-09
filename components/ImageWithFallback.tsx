"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackClassName?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackClassName,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={
          fallbackClassName ||
          `w-full h-full bg-gradient-to-br from-[#0A1628] to-[#2D7DD2] flex items-center justify-center ${className || ""}`
        }
        aria-label={alt as string}
      >
        <div className="text-white/20 text-xs font-medium tracking-widest uppercase select-none">
          {alt || "Image"}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
