// app/diagnose/page.tsx
"use client";

import { DiagnoseQuiz } from "@/components/DiagnoseQuiz";

export default function DiagnosePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <DiagnoseQuiz />
    </main>
  );
}
