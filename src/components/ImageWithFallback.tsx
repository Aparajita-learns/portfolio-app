"use client";
import { useState } from "react";

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ImageWithFallback({ src, alt, className, containerClassName }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={containerClassName || "w-full h-full bg-(--color-ink)/5"} />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className || "w-full h-full object-cover"}
      onError={() => setHasError(true)}
    />
  );
}