"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Creative Megamart logo mark.
 * Abstract geometric "M" formed by two ascending peaks + a central spark,
 * suggesting growth, quality and discovery.
 */
export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Megamart"
    >
      {/* Soft outer ring */}
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="url(#ring)"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* Main geometric M - left peak */}
      <path
        d="M18 54 L18 28 L32 46 L40 32"
        stroke="url(#main)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Main geometric M - right peak */}
      <path
        d="M40 32 L48 46 L62 28 L62 54"
        stroke="url(#main)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Accent spark / node at the center peak */}
      <circle cx="40" cy="30" r="4.5" fill="url(#spark)" />
      <circle cx="40" cy="30" r="2" fill="white" opacity="0.9" />

      {/* Subtle base underline */}
      <path
        d="M22 58 H58"
        stroke="url(#base)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      <defs>
        <linearGradient id="main" x1="18" y1="28" x2="62" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6A00" />
          <stop offset="1" stopColor="#FF9F1A" />
        </linearGradient>
        <linearGradient id="spark" x1="35" y1="25" x2="45" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9F1A" />
          <stop offset="1" stopColor="#FF6A00" />
        </linearGradient>
        <linearGradient id="ring" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6A00" />
          <stop offset="1" stopColor="#FFB347" />
        </linearGradient>
        <linearGradient id="base" x1="22" y1="58" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6A00" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#FF6A00" />
          <stop offset="1" stopColor="#FF6A00" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
