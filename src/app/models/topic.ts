export interface QuizQuestion {
  question: { en: string; ru: string };
  options: { en: string[]; ru: string[] };
  correctAnswer: number;
}

export interface Topic {
  id: string;
  title: { en: string; ru: string };
  theory?: { en: string; ru: string };
  practice?: { en: string; ru: string };
  interviewQuestions?: { en: string; ru: string }[];
  summary?: { en: string; ru: string };
  quiz?: QuizQuestion[];
  subtopics?: Topic[];
  parentId?: string;
}

export type Language = 'en' | 'ru';
