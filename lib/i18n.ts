// Basic i18n structure - can be extended with next-intl later
export const translations = {
  de: {
    // Navigation
    start: "Start",
    statistics: "Statistiken",
    studyModes: "Übungsmodi",
    
    // Quiz modes
    sequentialMode: "Alle Fragen durchgehen",
    randomMode: "Zufälliger Test",
    practiceMode: "Übungsmodus",
    
    // Common
    next: "Weiter",
    previous: "Zurück",
    finish: "Abschließen",
    correct: "Richtig",
    incorrect: "Falsch",
    explanation: "Erklärung",
  },
  en: {
    start: "Start",
    statistics: "Statistics",
    studyModes: "Study Modes",
    sequentialMode: "Go through all questions",
    randomMode: "Random test",
    practiceMode: "Practice mode",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    correct: "Correct",
    incorrect: "Incorrect",
    explanation: "Explanation",
  },
  tr: {
    start: "Başla",
    statistics: "İstatistikler",
    studyModes: "Çalışma Modları",
    sequentialMode: "Tüm soruları gözden geçir",
    randomMode: "Rastgele test",
    practiceMode: "Pratik modu",
    next: "İleri",
    previous: "Geri",
    finish: "Bitir",
    correct: "Doğru",
    incorrect: "Yanlış",
    explanation: "Açıklama",
  },
  ar: {
    start: "ابدأ",
    statistics: "الإحصائيات",
    studyModes: "أوضاع الدراسة",
    sequentialMode: "مراجعة جميع الأسئلة",
    randomMode: "اختبار عشوائي",
    practiceMode: "وضع التدريب",
    next: "التالي",
    previous: "السابق",
    finish: "إنهاء",
    correct: "صحيح",
    incorrect: "خطأ",
    explanation: "شرح",
  },
};

export type Language = keyof typeof translations;

export function getTranslation(lang: Language, key: string): string {
  return translations[lang]?.[key as keyof typeof translations[Language]] || key;
}

