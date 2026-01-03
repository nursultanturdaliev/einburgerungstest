"use client";

import React from "react";
import { Question } from "@/types/question";
import { useQuiz } from "@/contexts/QuizContext";

interface QuestionCardProps {
  question: Question;
  showAnswer?: boolean;
  showExplanation?: boolean;
  mode?: "practice" | "test" | "sequential" | "random";
}

export function QuestionCard({
  question,
  showAnswer = false,
  showExplanation = false,
  mode = "sequential",
}: QuestionCardProps) {
  const { answers, answerQuestion, isBookmarked, toggleBookmark } = useQuiz();
  const userAnswer = answers.get(question.id);
  const isAnswered = userAnswer !== undefined;
  const isCorrect = userAnswer?.isCorrect ?? false;
  const isBookmarkedQuestion = isBookmarked(question.id);

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered && mode !== "practice") return;
    answerQuestion(question.id, selectedIndex);
  };

  const getOptionClass = (index: number) => {
    if (!isAnswered && !showAnswer) {
      return "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer";
    }

    const isSelected = userAnswer?.selectedAnswer === index;
    const isCorrectOption = index === question.correctAnswer;

    if (showAnswer || (isAnswered && mode === "practice")) {
      if (isCorrectOption) {
        return "bg-green-100 dark:bg-green-900/30 border-green-500";
      }
      if (isSelected && !isCorrect) {
        return "bg-red-100 dark:bg-red-900/30 border-red-500";
      }
    }

    if (isSelected) {
      return "bg-blue-100 dark:bg-blue-900/30 border-blue-500";
    }

    return "";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {question.category}
            </span>
            {question.state && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({question.state})
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
        </div>
        <button
          onClick={() => toggleBookmark(question.id)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label={isBookmarkedQuestion ? "Lesezeichen entfernen" : "Lesezeichen hinzufügen"}
        >
          {isBookmarkedQuestion ? (
            <svg
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={isAnswered && mode !== "practice"}
            className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${getOptionClass(
              index
            )} ${
              isAnswered && mode !== "practice"
                ? "cursor-not-allowed opacity-60"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-600 dark:text-gray-300">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{option}</span>
              {(showAnswer || (isAnswered && mode === "practice")) &&
                index === question.correctAnswer && (
                  <span className="ml-auto text-green-600 dark:text-green-400 font-semibold">
                    ✓ Richtig
                  </span>
                )}
              {isAnswered &&
                mode === "practice" &&
                userAnswer?.selectedAnswer === index &&
                !isCorrect &&
                index !== question.correctAnswer && (
                  <span className="ml-auto text-red-600 dark:text-red-400 font-semibold">
                    ✗ Falsch
                  </span>
                )}
            </div>
          </button>
        ))}
      </div>

      {(showExplanation || (isAnswered && mode === "practice")) && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold mb-2">Erklärung:</h4>
          <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

