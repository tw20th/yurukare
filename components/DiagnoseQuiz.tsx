"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { calculateResult } from "@/lib/resultLogic";

export const DiagnoseQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ type: string; score: number }[]>([]);
  const router = useRouter();

  const handleSelect = (answer: { type: string; score: number }) => {
    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const result = calculateResult(nextAnswers);
      router.push(`/result/${result}`);
    }
  };

  const q = questions[current];

  return (
    <div className="max-w-xl mx-auto text-center p-4">
      <h2 className="text-2xl font-bold mb-4">🧠 あなたのイケメンタイプ診断</h2>
      <p className="mb-2 text-sm text-gray-500">
        質問 {current + 1} / {questions.length}
      </p>
      <h3 className="text-lg font-semibold mb-6">{q.text}</h3>
      <div className="flex flex-col gap-4">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect({ type: opt.type, score: opt.score })}
            className="bg-white border hover:bg-purple-100 rounded px-4 py-2 shadow transition"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
