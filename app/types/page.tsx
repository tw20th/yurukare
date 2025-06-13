// app/types/page.tsx

import { typeData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function TypesPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-8 font-zen-maru">
        イケメン図鑑 💘
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {Object.entries(typeData).map(([key, data]) => (
          <Link
            key={key}
            href={`/result/${key}`}
            className="border rounded-xl shadow hover:shadow-lg transition p-4 text-left"
          >
            <div className="mb-4">
              <Image
                src={`/ogp/yurukare-${key}.webp`}
                alt={data.name}
                width={400}
                height={210}
                className="rounded-lg mx-auto"
              />
            </div>
            <h2 className="text-xl font-semibold text-purple-800 mb-2">
              {data.name}
            </h2>
            <p className="text-sm text-gray-700 mb-2 line-clamp-3">
              {data.message}
            </p>
            <p className="text-xs text-gray-500 italic">「{data.quote}」</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
