import { useState } from "react";
import Image, { ImageProps } from "next/image";

export default function ShimmerImage({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative block overflow-hidden">
      {!loaded && (
        <span
          className="absolute inset-0 shimmer-bg"
          aria-hidden="true"
        />
      )}
      <Image
        {...props}
        className={className}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
