"use client";

import React, { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { allQuestions, getQuestionsByCategory, getCategories } from "@/lib/questions";
import { Question } from "@/types/question";

export function StudyModes() {
  const { startQuiz, bookmarks, progress } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const categories = getCategories();

  const handleReviewBookmarked = () => {
    const bookmarkedQuestions = allQuestions.filter((q) =>
      bookmarks.has(q.id)
    );
    if (bookmarkedQuestions.length === 0) {
      alert("Sie haben keine Fragen mit Lesezeichen versehen.");
      return;
    }
    startQuiz(bookmarkedQuestions, "practice");
  };

  const handleReviewIncorrect = () => {
    const incorrectQuestions = allQuestions.filter((q) =>
      progress.incorrectAnswers.has(q.id)
    );
    if (incorrectQuestions.length === 0) {
      alert("Sie haben noch keine falschen Antworten.");
      return;
    }
    startQuiz(incorrectQuestions, "practice");
  };

  const handleCategoryPractice = () => {
    if (!selectedCategory) {
      alert("Bitte wählen Sie eine Kategorie aus.");
      return;
    }
    const categoryQuestions = getQuestionsByCategory(selectedCategory);
    startQuiz(categoryQuestions, "practice");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Weitere Übungsmodi</h2>

      <div className="space-y-4">
        <button
          onClick={handleReviewBookmarked}
          disabled={bookmarks.size === 0}
          className="w-full p-4 border-2 border-yellow-500 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <h3 className="text-lg font-semibold mb-1">
            Lesezeichen ({bookmarks.size})
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Üben Sie Ihre gespeicherten Fragen
          </p>
        </button>

        <button
          onClick={handleReviewIncorrect}
          disabled={progress.incorrectAnswers.size === 0}
          className="w-full p-4 border-2 border-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <h3 className="text-lg font-semibold mb-1">
            Falsche Antworten ({progress.incorrectAnswers.size})
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Wiederholen Sie Fragen, die Sie falsch beantwortet haben
          </p>
        </button>

        <div className="p-4 border-2 border-blue-500 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Nach Kategorie üben</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 mb-3"
          >
            <option value="">Kategorie auswählen</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={handleCategoryPractice}
            disabled={!selectedCategory}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Übung starten
          </button>
        </div>
      </div>
    </div>
  );
}

