export interface QuizQuestion {
    questionText: string;
    options: {
      text: string;
      correct: boolean;
    }[];
    explanation: string;
  }
  