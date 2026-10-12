import type { Metadata } from "next";
import { QuizPageContent } from "@/components/quiz/quiz-page-content";
import { getPageLanguageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IPv4 Subnetting Quiz",
  description: "Practice subnet masks, host counts, network ranges, and subnet design with short quizzes and worked explanations.",
  alternates: { canonical: "/quiz", languages: getPageLanguageAlternates("/quiz") },
};

export default function QuizPage() {
  return <QuizPageContent />;
}
