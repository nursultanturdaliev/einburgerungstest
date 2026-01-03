"use client";

import React, { useState } from "react";
import { QuizModeSelector } from "@/components/QuizModeSelector";
import { StudyModes } from "@/components/StudyModes";
import { Quiz } from "@/components/Quiz";
import { Statistics } from "@/components/Statistics";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PWAInstaller } from "@/components/PWAInstaller";
import { useQuiz } from "@/contexts/QuizContext";

type View = "home" | "quiz" | "statistics" | "study";

export default function Home() {
  const { isQuizActive } = useQuiz();
  const [currentView, setCurrentView] = useState<View>("home");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Einbürgerungstest Vorbereitung
            </h1>
            <div className="flex items-center gap-4">
              {!isQuizActive && (
                <>
                  <button
                    onClick={() => setCurrentView("home")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentView === "home"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    Start
                  </button>
                  <button
                    onClick={() => setCurrentView("study")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentView === "study"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    Übungsmodi
                  </button>
                  <button
                    onClick={() => setCurrentView("statistics")}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentView === "statistics"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    Statistiken
                  </button>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isQuizActive ? (
          <Quiz />
        ) : currentView === "statistics" ? (
          <Statistics />
        ) : currentView === "study" ? (
          <StudyModes />
        ) : (
          <QuizModeSelector />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Vorbereitung auf den deutschen Einbürgerungstest. Alle Fragen basieren
            auf dem offiziellen Fragenkatalog des BAMF.
          </p>
        </div>
      </footer>

      <PWAInstaller />
    </div>
  );
}
