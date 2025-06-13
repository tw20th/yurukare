// lib/resultLogic.ts

export function calculateResult(
  answers: { type: string; score: number }[]
): string {
  const scoreMap: Record<string, number> = {};

  for (const answer of answers) {
    scoreMap[answer.type] = (scoreMap[answer.type] || 0) + answer.score;
  }

  const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);

  return sorted[0][0]; // 最もスコアの高いタイプを返す
}
