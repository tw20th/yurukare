// app/result/[type]/page.tsx

import { typeData } from "@/lib/types";
import { notFound } from "next/navigation";
import ResultClient from "./ResultClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { type: string };
}): Promise<Metadata> {
  const data = typeData[params.type];
  if (!data) return {};

  return {
    title: `あなたのタイプは「${data.name}」｜ゆるっと彼診断`,
    description: data.message,
    openGraph: {
      title: `あなたのタイプは「${data.name}」｜ゆるっと彼診断`,
      description: data.message,
      url: `https://yurukare.jp/result/${params.type}`,
      images: [
        {
          url: `/ogp/yurukare-${params.type}.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `あなたのタイプは「${data.name}」｜ゆるっと彼診断`,
      description: data.message,
      images: [`/ogp/yurukare-${params.type}.jpg`],
    },
  };
}

export default function ResultPage({ params }: { params: { type: string } }) {
  const data = typeData[params.type];
  if (!data) return notFound();

  return <ResultClient type={params.type} data={data} />;
}
