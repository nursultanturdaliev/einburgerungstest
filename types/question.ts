export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation: string;
  state: string | null;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizSession {
  id: string;
  mode: "sequential" | "random" | "practice" | "test";
  questions: Question[];
  answers: QuizAnswer[];
  startTime: number;
  endTime?: number;
  state?: string;
}

export interface UserProgress {
  answeredQuestions: Set<string>;
  correctAnswers: Set<string>;
  incorrectAnswers: Set<string>;
  bookmarks: Set<string>;
  categoryStats: Record<string, { total: number; correct: number }>;
  totalTimeSpent: number;
  lastActivity: number;
  streak: number;
}

export interface Statistics {
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
  categoryPerformance: Record<string, { total: number; correct: number; accuracy: number }>;
  completionPercentage: number;
  timeSpent: number;
  streak: number;
}

