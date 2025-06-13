"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShareButtons } from "@/components/ShareButtons";
import { saveFeedback } from "@/lib/saveFeedback";

type Props = {
  type: string;
  data: {
    name: string;
    message: string;
    quote: string; // テンプレートセリフ（フォールバック用）
  };
};

export default function ResultClient({ type, data }: Props) {
  const [quote, setQuote] = useState(data.quote); // 初期はテンプレ
  const [feedbackSent, setFeedbackSent] = useState<"yes" | "no" | null>(null);
  const [isSending, setIsSending] = useState(false);

  // GPTから癒しセリフを取得
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("/api/generateQuote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type }),
        });
        const json = await res.json();
        if (json.quote) setQuote(json.quote); // GPT成功時に置き換え
      } catch (err) {
        console.error("GPT呼び出し失敗:", err);
        // エラー時はテンプレquoteのまま
      }
    };
    fetchQuote();
  }, [type]);

  // フィードバック送信処理
  const handleFeedback = async (result: "yes" | "no") => {
    if (isSending || feedbackSent) return;
    setIsSending(true);
    const res = await saveFeedback(type, result);
    if (res.success) {
      setFeedbackSent(result);
    } else {
      alert("送信に失敗しました。もう一度お試しください🙏");
    }
    setIsSending(false);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-12 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4 font-zen-maru">
          あなたのタイプは…
        </h1>
        <p className="text-3xl sm:text-4xl mb-4">{data.name} 💘</p>

        <div className="mb-6">
          <picture>
            <source srcSet={`/ogp/yurukare-${type}.webp`} type="image/webp" />
            <img
              src={`/ogp/yurukare-${type}.jpg`}
              alt={data.name}
              width={600}
              height={315}
              className="rounded-xl mx-auto shadow-lg"
            />
          </picture>
        </div>

        <p className="text-lg text-gray-800 mb-4">{data.message}</p>

        <blockquote className="italic text-purple-600 mt-6 mb-10 border-l-4 pl-4 border-purple-300">
          「{quote}」
        </blockquote>

        <ShareButtons type={type} />

        <div className="mt-10">
          <Link
            href="/diagnose"
            className="inline-block bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-6 py-2 rounded-full transition"
          >
            🔁 もう一度診断する
          </Link>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          {feedbackSent ? (
            <p>
              {feedbackSent === "yes"
                ? "癒されたみたいで嬉しいです☺️"
                : "そっか、次はもっと寄り添えるようにがんばります💪"}
            </p>
          ) : (
            <>
              この診断、癒された？
              <div className="flex justify-center gap-4 mt-2">
                <button
                  className="px-4 py-1 border rounded-full hover:bg-green-100"
                  onClick={() => handleFeedback("yes")}
                  disabled={isSending}
                >
                  はい
                </button>
                <button
                  className="px-4 py-1 border rounded-full hover:bg-red-100"
                  onClick={() => handleFeedback("no")}
                  disabled={isSending}
                >
                  いいえ
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
