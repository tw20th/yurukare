// lib/questions.ts

export type Question = {
  text: string;
  options: {
    label: string;
    type: "sniper" | "prince" | "vampire" | "childhood" | "glasses";
    score: number;
  }[];
};

export const questions: Question[] = [
  {
    text: "今日はどんな気分？",
    options: [
      { label: "人に気を遣いすぎて疲れた", type: "prince", score: 2 },
      { label: "なんか孤独を感じる", type: "vampire", score: 2 },
      {
        label: "ちょっと落ち込んでるけど強がっちゃう",
        type: "childhood",
        score: 2,
      },
      { label: "冷静に状況を考えたい", type: "glasses", score: 2 },
      { label: "何も言わずにそばにいてほしい", type: "sniper", score: 2 },
    ],
  },
  {
    text: "恋人に求めるものは？",
    options: [
      { label: "とにかく優しく癒してくれる人", type: "prince", score: 2 },
      { label: "影のあるミステリアスな人", type: "vampire", score: 2 },
      { label: "信頼できる昔からの仲", type: "childhood", score: 2 },
      { label: "知的で頼れる感じ", type: "glasses", score: 2 },
      { label: "多くを語らなくても通じる空気感", type: "sniper", score: 2 },
    ],
  },
  {
    text: "落ち込んだときどうする？",
    options: [
      { label: "寝る・お風呂・のんびりする", type: "prince", score: 2 },
      { label: "1人で妄想に浸る", type: "vampire", score: 2 },
      { label: "友達に会って笑い飛ばす", type: "childhood", score: 2 },
      { label: "解決策を紙に書き出す", type: "glasses", score: 2 },
      { label: "じっと無になって過ごす", type: "sniper", score: 2 },
    ],
  },
  {
    text: "好きな言葉は？",
    options: [
      { label: "だいじょうぶ〜", type: "prince", score: 2 },
      { label: "孤独を恐れるな", type: "vampire", score: 2 },
      { label: "俺がいるだろ", type: "childhood", score: 2 },
      { label: "論理的に考えよう", type: "glasses", score: 2 },
      { label: "黙ってついてこい", type: "sniper", score: 2 },
    ],
  },
  {
    text: "気になるのはどんな人？",
    options: [
      { label: "動きがゆっくりで優しい人", type: "prince", score: 2 },
      { label: "目がどこか寂しそうな人", type: "vampire", score: 2 },
      { label: "やたらちょっかいかけてくる人", type: "childhood", score: 2 },
      { label: "静かに気配りしてくれる人", type: "glasses", score: 2 },
      { label: "目が合うとすぐ逸らされる人", type: "sniper", score: 2 },
    ],
  },
];
