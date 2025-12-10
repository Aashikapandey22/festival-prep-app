export type FestivalType = 'Diwali' | 'Holi' | 'Navratri' | 'Eid' | 'Christmas' | 'Default';

export interface ThemeConfig {
  id: FestivalType;
  name: string;
  colors: {
    background: string; // CSS Gradient
    cardBg: string; // Tailwind class
    primary: string; // Tailwind text color
    secondary: string; // Tailwind text color
    accent: string; // Tailwind bg color
    border: string; // Tailwind border color
    textMain: string;
    textMuted: string;
  };
  icons: {
    main: string; // Lucide icon name placeholder or emoji
    currency: string;
  };
  visuals: {
    particleEmoji: string;
    bgPatternOpacity: string;
  };
}

export interface ChecklistItem {
  id: string;
  category: 'Rituals' | 'Food' | 'Decor' | 'Gifts' | 'Cleaning';
  task: string;
  estimatedCost: number;
  isCompleted: boolean;
  ecoTip?: string;
  assignee?: string; // New field for family assignment
}

export interface FestivalPlan {
  festival: FestivalType;
  familySize: number;
  totalBudget: number;
  items: ChecklistItem[];
  generatedAt: number;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  note: string;
}
