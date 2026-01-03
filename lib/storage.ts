import { UserProgress, QuizSession } from "@/types/question";

const STORAGE_KEYS = {
  PROGRESS: "einburgerungstest_progress",
  BOOKMARKS: "einburgerungstest_bookmarks",
  SESSIONS: "einburgerungstest_sessions",
  PREFERENCES: "einburgerungstest_preferences",
} as const;

export interface UserPreferences {
  language: string;
  theme: "light" | "dark";
  state?: string;
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return getDefaultProgress();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        answeredQuestions: new Set(parsed.answeredQuestions || []),
        correctAnswers: new Set(parsed.correctAnswers || []),
        incorrectAnswers: new Set(parsed.incorrectAnswers || []),
        bookmarks: new Set(parsed.bookmarks || []),
      };
    }
  } catch (error) {
    console.error("Error loading progress:", error);
  }

  return getDefaultProgress();
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;

  try {
    const serialized = {
      ...progress,
      answeredQuestions: Array.from(progress.answeredQuestions),
      correctAnswers: Array.from(progress.correctAnswers),
      incorrectAnswers: Array.from(progress.incorrectAnswers),
      bookmarks: Array.from(progress.bookmarks),
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(serialized));
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

export function getBookmarks(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch (error) {
    console.error("Error loading bookmarks:", error);
  }

  return new Set();
}

export function saveBookmarks(bookmarks: Set<string>): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEYS.BOOKMARKS,
      JSON.stringify(Array.from(bookmarks))
    );
  } catch (error) {
    console.error("Error saving bookmarks:", error);
  }
}

export function getPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return { language: "de", theme: "light" };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading preferences:", error);
  }

  return { language: "de", theme: "light" };
}

export function savePreferences(preferences: UserPreferences): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEYS.PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (error) {
    console.error("Error saving preferences:", error);
  }
}

export function getSessions(): QuizSession[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading sessions:", error);
  }

  return [];
}

export function saveSession(session: QuizSession): void {
  if (typeof window === "undefined") return;

  try {
    const sessions = getSessions();
    sessions.push(session);
    // Keep only last 50 sessions
    const recentSessions = sessions.slice(-50);
    localStorage.setItem(
      STORAGE_KEYS.SESSIONS,
      JSON.stringify(recentSessions)
    );
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

function getDefaultProgress(): UserProgress {
  return {
    answeredQuestions: new Set(),
    correctAnswers: new Set(),
    incorrectAnswers: new Set(),
    bookmarks: new Set(),
    categoryStats: {},
    totalTimeSpent: 0,
    lastActivity: Date.now(),
    streak: 0,
  };
}

