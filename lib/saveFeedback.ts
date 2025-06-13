// lib/saveFeedback.ts
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveFeedback(type: string, result: "yes" | "no") {
  try {
    const docRef = await addDoc(collection(db, "feedbacks"), {
      type,
      result,
      createdAt: serverTimestamp(),
    });
    console.log("フィードバック保存成功:", docRef.id);
    return { success: true };
  } catch (error) {
    console.error("フィードバック保存エラー:", error);
    return { success: false, error };
  }
}
