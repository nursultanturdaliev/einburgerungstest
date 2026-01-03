import { UserProgress, Statistics, Question } from "@/types/question";
import { allQuestions } from "./questions";

export function calculateStatistics(progress: UserProgress): Statistics {
  const totalAnswered = progress.answeredQuestions.size;
  const totalCorrect = progress.correctAnswers.size;
  const accuracy = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0;
  const completionPercentage =
    (totalAnswered / allQuestions.length) * 100;

  // Calculate category performance
  const categoryPerformance: Record<
    string,
    { total: number; correct: number; accuracy: number }
  > = {};

  allQuestions.forEach((question) => {
    const category = question.category;
    if (!categoryPerformance[category]) {
      categoryPerformance[category] = { total: 0, correct: 0, accuracy: 0 };
    }
    categoryPerformance[category].total++;

    if (progress.answeredQuestions.has(question.id)) {
      if (progress.correctAnswers.has(question.id)) {
        categoryPerformance[category].correct++;
      }
    }
  });

  // Calculate accuracy for each category
  Object.keys(categoryPerformance).forEach((category) => {
    const cat = categoryPerformance[category];
    cat.accuracy =
      cat.total > 0 ? (cat.correct / cat.total) * 100 : 0;
  });

  return {
    totalAnswered,
    totalCorrect,
    accuracy,
    categoryPerformance,
    completionPercentage,
    timeSpent: progress.totalTimeSpent,
    streak: progress.streak,
  };
}

export function getWeakAreas(
  progress: UserProgress,
  limit: number = 3
): string[] {
  const stats = calculateStatistics(progress);
  const categories = Object.entries(stats.categoryPerformance)
    .filter(([_, perf]) => perf.total > 0)
    .sort((a, b) => a[1].accuracy - b[1].accuracy)
    .slice(0, limit)
    .map(([category]) => category);

  return categories;
}

