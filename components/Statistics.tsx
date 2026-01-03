"use client";

import React from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { ProgressBar } from "./ProgressBar";
import { allQuestions } from "@/lib/questions";

export function Statistics() {
  const { statistics, progress } = useQuiz();

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)} Min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}Min`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Statistiken</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Gesamtübersicht</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Beantwortete Fragen</span>
                <span className="font-semibold">
                  {statistics.totalAnswered} / {allQuestions.length}
                </span>
              </div>
              <ProgressBar
                current={statistics.totalAnswered}
                total={allQuestions.length}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Richtige Antworten</span>
                <span className="font-semibold">{statistics.totalCorrect}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Genauigkeit</span>
                <span className="font-semibold">
                  {Math.round(statistics.accuracy)}%
                </span>
              </div>
              <ProgressBar
                current={statistics.totalCorrect}
                total={statistics.totalAnswered || 1}
              />
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <div className="flex justify-between">
                <span>Zeit investiert</span>
                <span className="font-semibold">
                  {formatTime(statistics.timeSpent / 60)}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span>Serie</span>
              <span className="font-semibold">{statistics.streak} Tage</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Kategorien</h3>
          <div className="space-y-4">
            {Object.entries(statistics.categoryPerformance)
              .sort((a, b) => b[1].accuracy - a[1].accuracy)
              .map(([category, perf]) => (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{category}</span>
                    <span className="text-sm font-semibold">
                      {perf.correct} / {perf.total} ({Math.round(perf.accuracy)}%)
                    </span>
                  </div>
                  <ProgressBar
                    current={perf.correct}
                    total={perf.total || 1}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Lesezeichen</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Sie haben {progress.bookmarks.size} Fragen mit Lesezeichen versehen.
        </p>
      </div>
    </div>
  );
}

