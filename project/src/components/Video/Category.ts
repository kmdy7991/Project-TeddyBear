export interface Category {
  category: string;
  categoryId: number;
  videos: CategoryVideo[];
}

export interface CategoryVideo {
  thumbnailUrl: string;
  difficulty: string;
  title: string;
  description: string;
  hashtags: string[];
}
