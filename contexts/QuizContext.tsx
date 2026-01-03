"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Question, QuizSession, UserProgress, QuizAnswer } from "@/types/question";
import {
  getProgress,
  saveProgress,
  getBookmarks,
  saveBookmarks,
  getPreferences,
  savePreferences,
  saveSession,
} from "@/lib/storage";
import { calculateStatistics } from "@/lib/statistics";

interface QuizContextType {
  // Current quiz state
  currentQuestionIndex: number;
  questions: Question[];
  answers: Map<string, QuizAnswer>;
  mode: "sequential" | "random" | "practice" | "test" | null;
  isQuizActive: boolean;
  startTime: number | null;
  
  // Progress tracking
  progress: UserProgress;
  statistics: ReturnType<typeof calculateStatistics>;
  
  // Actions
  startQuiz: (questions: Question[], mode: QuizContextType["mode"], state?: string) => void;
  answerQuestion: (questionId: string, selectedAnswer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  finishQuiz: () => QuizSession | null;
  resetQuiz: () => void;
  
  // Bookmarks
  bookmarks: Set<string>;
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
  
  // Preferences
  preferences: ReturnType<typeof getPreferences>;
  updatePreferences: (prefs: Partial<ReturnType<typeof getPreferences>>) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Map<string, QuizAnswer>>(new Map());
  const [mode, setMode] = useState<QuizContextType["mode"]>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [bookmarks, setBookmarks] = useState<Set<string>>(getBookmarks());
  const [preferences, setPreferences] = useState(getPreferences());

  // Calculate statistics from progress
  const statistics = calculateStatistics(progress);

  // Load progress and bookmarks on mount
  useEffect(() => {
    setProgress(getProgress());
    setBookmarks(getBookmarks());
    setPreferences(getPreferences());
  }, []);

  const startQuiz = useCallback(
    (newQuestions: Question[], newMode: QuizContextType["mode"], state?: string) => {
      setQuestions(newQuestions);
      setAnswers(new Map());
      setMode(newMode);
      setCurrentQuestionIndex(0);
      setIsQuizActive(true);
      setStartTime(Date.now());
    },
    []
  );

  const answerQuestion = useCallback(
    (questionId: string, selectedAnswer: number) => {
      const question = questions.find((q) => q.id === questionId);
      if (!question) return;

      const isCorrect = selectedAnswer === question.correctAnswer;
      const answer: QuizAnswer = {
        questionId,
        selectedAnswer,
        isCorrect,
        timestamp: Date.now(),
      };

      setAnswers((prev) => {
        const newAnswers = new Map(prev);
        newAnswers.set(questionId, answer);
        return newAnswers;
      });

      // Update progress
      setProgress((prev) => {
        const newProgress: UserProgress = {
          ...prev,
          answeredQuestions: new Set(prev.answeredQuestions).add(questionId),
          correctAnswers: isCorrect
            ? new Set(prev.correctAnswers).add(questionId)
            : prev.correctAnswers,
          incorrectAnswers: !isCorrect
            ? new Set(prev.incorrectAnswers).add(questionId)
            : prev.incorrectAnswers,
          lastActivity: Date.now(),
        };

        // Update category stats
        const category = question.category;
        if (!newProgress.categoryStats[category]) {
          newProgress.categoryStats[category] = { total: 0, correct: 0 };
        }
        newProgress.categoryStats[category].total++;
        if (isCorrect) {
          newProgress.categoryStats[category].correct++;
        }

        saveProgress(newProgress);
        return newProgress;
      });
    },
    [questions]
  );

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [questions.length]);

  const finishQuiz = useCallback((): QuizSession | null => {
    if (!isQuizActive || !startTime) return null;

    const session: QuizSession = {
      id: `session_${Date.now()}`,
      mode: mode || "practice",
      questions,
      answers: Array.from(answers.values()),
      startTime,
      endTime: Date.now(),
    };

    saveSession(session);

    // Update progress with time spent
    setProgress((prev) => {
      const timeSpent = Date.now() - startTime;
      const newProgress: UserProgress = {
        ...prev,
        totalTimeSpent: prev.totalTimeSpent + timeSpent,
      };
      saveProgress(newProgress);
      return newProgress;
    });

    setIsQuizActive(false);
    return session;
  }, [isQuizActive, startTime, mode, questions, answers]);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setAnswers(new Map());
    setMode(null);
    setCurrentQuestionIndex(0);
    setIsQuizActive(false);
    setStartTime(null);
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    setBookmarks((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(questionId)) {
        newBookmarks.delete(questionId);
      } else {
        newBookmarks.add(questionId);
      }
      saveBookmarks(newBookmarks);
      return newBookmarks;
    });
  }, []);

  const isBookmarked = useCallback(
    (questionId: string) => {
      return bookmarks.has(questionId);
    },
    [bookmarks]
  );

  const updatePreferences = useCallback(
    (newPrefs: Partial<ReturnType<typeof getPreferences>>) => {
      setPreferences((prev) => {
        const updated = { ...prev, ...newPrefs };
        savePreferences(updated);
        return updated;
      });
    },
    []
  );

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        questions,
        answers,
        mode,
        isQuizActive,
        startTime,
        progress,
        statistics,
        startQuiz,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        finishQuiz,
        resetQuiz,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        preferences,
        updatePreferences,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

