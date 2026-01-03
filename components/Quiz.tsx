"use client";

import React, { useState, useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";
import { Results } from "./Results";
import { QuizSession } from "@/types/question";

export function Quiz() {
  const {
    questions,
    currentQuestionIndex,
    isQuizActive,
    mode,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    finishQuiz,
    resetQuiz,
    startTime,
  } = useQuiz();

  const [showResults, setShowResults] = useState(false);
  const [session, setSession] = useState<QuizSession | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Timer for random quiz mode
  useEffect(() => {
    if (isQuizActive && mode === "random" && startTime) {
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = 60 * 60 * 1000 - elapsed; // 60 minutes
        setTimeRemaining(Math.max(0, remaining));

        if (remaining <= 0) {
          handleFinish();
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeRemaining(null);
    }
  }, [isQuizActive, mode, startTime]);

  const handleFinish = () => {
    const finishedSession = finishQuiz();
    if (finishedSession) {
      setSession(finishedSession);
      setShowResults(true);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setSession(null);
    resetQuiz();
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isQuizActive) {
    return null;
  }

  if (showResults && session) {
    return <Results session={session} onClose={handleCloseResults} />;
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p>Keine Fragen verfügbar.</p>
        <button
          onClick={resetQuiz}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Zurück
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with progress and timer */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Frage {currentQuestionIndex + 1} von {totalQuestions}
          </h2>
          {timeRemaining !== null && (
            <div
              className={`text-xl font-mono font-semibold ${
                timeRemaining < 5 * 60 * 1000
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={totalQuestions}
        />
      </div>

      {/* Question Card */}
      <QuestionCard question={currentQuestion} mode={mode || "sequential"} />

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Zurück
        </button>

        <div className="flex gap-2">
          {mode === "random" && (
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Test beenden
            </button>
          )}
          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={nextQuestion}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Weiter →
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Abschließen
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation Dots */}
      {totalQuestions <= 50 && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestionIndex
                  ? "bg-blue-600 dark:bg-blue-400"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Gehe zu Frage ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

