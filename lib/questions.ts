import { Question } from "@/types/question";
import generalQuestions from "@/data/general-questions.json";
import stateQuestionsData from "@/data/state-questions.json";

// Flatten state questions into a single array
const stateQuestions: Question[] = Object.values(stateQuestionsData).flat() as Question[];

// Combine all questions
export const allQuestions: Question[] = [
  ...(generalQuestions as Question[]),
  ...stateQuestions,
];

export const generalQuestionsList: Question[] = generalQuestions as Question[];

export function getStateQuestions(state: string): Question[] {
  return (stateQuestionsData as Record<string, Question[]>)[state] || [];
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getQuestionsByCategory(category: string): Question[] {
  return allQuestions.filter((q) => q.category === category);
}

export function getRandomQuestions(
  count: number,
  state?: string
): Question[] {
  const generalPool = [...generalQuestionsList];
  const statePool = state ? getStateQuestions(state) : [];
  
  // Shuffle arrays
  const shuffle = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledGeneral = shuffle(generalPool);
  const shuffledState = shuffle(statePool);

  // Select 30 general + 3 state-specific (matching real test format)
  const selectedGeneral = shuffledGeneral.slice(0, Math.min(30, count - 3));
  const selectedState = state
    ? shuffledState.slice(0, Math.min(3, count - selectedGeneral.length))
    : [];

  return shuffle([...selectedGeneral, ...selectedState]);
}

export function getCategories(): string[] {
  const categories = new Set(allQuestions.map((q) => q.category));
  return Array.from(categories).sort();
}

export function getStates(): string[] {
  return Object.keys(stateQuestionsData);
}

