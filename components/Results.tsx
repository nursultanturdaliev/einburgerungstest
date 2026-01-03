"use client";

import React from "react";
import { QuizSession } from "@/types/question";
import { QuestionCard } from "./QuestionCard";

interface ResultsProps {
  session: QuizSession;
  onClose: () => void;
}

export function Results({ session, onClose }: ResultsProps) {
  const totalQuestions = session.questions.length;
  const correctAnswers = session.answers.filter((a) => a.isCorrect).length;
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const passed = correctAnswers >= 17; // Passing score is 17/33

  const timeSpent = session.endTime
    ? Math.floor((session.endTime - session.startTime) / 1000 / 60)
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Testergebnis</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {correctAnswers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Richtig von {totalQuestions}
            </div>
          </div>

          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {Math.round(accuracy)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Genauigkeit</div>
          </div>

          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {timeSpent}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Minuten</div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg text-center mb-6 ${
            passed
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
              : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
          }`}
        >
          <div className="text-2xl font-bold">
            {passed ? "✓ Bestanden!" : "✗ Nicht bestanden"}
          </div>
          <div className="text-sm mt-2">
            {passed
              ? "Sie haben den Test erfolgreich bestanden!"
              : `Sie benötigen mindestens 17 richtige Antworten. Sie haben ${correctAnswers} von ${totalQuestions} Fragen richtig beantwortet.`}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zurück zum Start
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold mb-4">Fragen und Antworten</h3>
        {session.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            showAnswer={true}
            showExplanation={true}
            mode="test"
          />
        ))}
      </div>
    </div>
  );
}

