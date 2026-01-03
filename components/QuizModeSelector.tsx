"use client";

import React, { useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { getRandomQuestions, allQuestions } from "@/lib/questions";
import { getStates } from "@/lib/questions";

export function QuizModeSelector() {
  const { startQuiz } = useQuiz();
  const [selectedState, setSelectedState] = useState<string>("");
  const [showStateSelector, setShowStateSelector] = useState(false);

  const handleStartSequential = () => {
    startQuiz(allQuestions, "sequential");
  };

  const handleStartRandom = () => {
    if (!selectedState && showStateSelector) {
      alert("Bitte wählen Sie ein Bundesland aus.");
      return;
    }
    const questions = getRandomQuestions(33, selectedState || undefined);
    startQuiz(questions, "random", selectedState || undefined);
  };

  const handleStartPractice = () => {
    const questions = getRandomQuestions(33, selectedState || undefined);
    startQuiz(questions, "practice", selectedState || undefined);
  };

  const states = getStates();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        Einbürgerungstest Vorbereitung
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={handleStartSequential}
          className="p-6 border-2 border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
        >
          <h3 className="text-xl font-semibold mb-2">Alle Fragen durchgehen</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Gehen Sie durch alle 460 Fragen nacheinander
          </p>
        </button>

        <button
          onClick={() => setShowStateSelector(!showStateSelector)}
          className="p-6 border-2 border-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
        >
          <h3 className="text-xl font-semibold mb-2">Zufälliger Test</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Simulieren Sie den echten Test (33 Fragen, 60 Minuten)
          </p>
        </button>

        <button
          onClick={() => {
            setShowStateSelector(true);
            handleStartPractice();
          }}
          className="p-6 border-2 border-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left"
        >
          <h3 className="text-xl font-semibold mb-2">Übungsmodus</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Üben Sie mit sofortigem Feedback
          </p>
        </button>
      </div>

      {showStateSelector && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <label className="block mb-2 font-semibold">
            Bundesland auswählen (für landesspezifische Fragen):
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Kein Bundesland</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleStartRandom}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Test starten
            </button>
            <button
              onClick={handleStartPractice}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Übung starten
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

