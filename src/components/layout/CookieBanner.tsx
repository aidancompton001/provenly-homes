"use client";

interface CookieBannerProps {
  children?: React.ReactNode;
}

export default function CookieBanner({ children }: CookieBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">[CookieBanner]</p>
        {children}
      </div>
    </div>
  );
}
