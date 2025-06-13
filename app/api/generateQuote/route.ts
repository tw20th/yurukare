// app/api/generateQuote/route.ts

import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert, getApps } from "firebase-admin/app";

// 🔐 Firebase Admin SDK 初期化（base64から復元）
if (!getApps().length) {
  const serviceAccountJson = Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64!,
    "base64"
  ).toString("utf-8");

  initializeApp({
    credential: cert(JSON.parse(serviceAccountJson)),
  });
}
const db = getFirestore();

// 🤖 OpenAI 初期化（APIキーは.envに保存）
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { type } = await req.json();

  // ① Firestore にセリフがあるかチェック
  const docRef = db.collection("quotes").doc(type);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    const { quote } = docSnap.data()!;
    return NextResponse.json({ quote });
  }

  // ② なければ GPT で生成
  const prompt = `あなたは女性の気持ちに寄り添う優しいイケメンです。「${type}」という性格タイプの女性に、優しく寄り添うひとことを20〜30文字で届けてください。`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 60,
      temperature: 0.9,
    });

    const quote = chat.choices[0].message.content?.trim() || "";

    // ③ Firestore に保存
    await docRef.set({
      quote,
      createdAt: new Date(),
    });

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("GPT生成エラー:", error);
    return NextResponse.json({ quote: null }, { status: 500 });
  }
}
