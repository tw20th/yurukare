// components/ShareButtons.tsx
"use client";

import { usePathname } from "next/navigation";

export const ShareButtons = ({ type }: { type: string }) => {
  const pathname = usePathname();
  const url = `https://yurukare.jp${pathname}`;
  const text = `あなたの癒しタイプは「${type}」！#ゆるっと彼診断`;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p className="text-sm text-gray-500">診断結果をシェアしよう！</p>
      <div className="flex gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
        >
          X（Twitter）でシェア
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
        >
          LINEでシェア
        </a>
      </div>
    </div>
  );
};
