// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-white px-6 py-16 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4 font-zen-maru">
        ゆるっと彼診断 💘
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        ちょっと疲れたあなたに。
        <br />
        癒し系イケメンタイプを診断してみませんか？
      </p>
      <Link
        href="/diagnose"
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full transition duration-200 shadow-md"
      >
        診断をはじめる
      </Link>
    </main>
  );
}
