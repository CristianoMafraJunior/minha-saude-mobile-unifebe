export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface ContentItem {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  text: string;
  tips: string[];
  references: string[];
}

export type ScreenType = 'home' | 'category' | 'content';

export interface NavigationState {
  screen: ScreenType;
  params?: {
    categoryId?: string;
    contentId?: string;
  };
}
