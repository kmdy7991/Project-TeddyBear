export interface Category {
  category: string;
  categoryId: number;
}

export interface CategoryVideo {
  thumbnailUrl: string;
  difficulty: string;
  title: string;
  description: string;
}

const Categories: Category[] = [
  {
    category: "사회",
    categoryId: 1,
  },
  {
    category: "정치",
    categoryId: 2,
  },
  {
    category: "경제",
    categoryId: 3,
  },
  {
    category: "생활문화",
    categoryId: 4,
  },
  {
    category: "IT과학",
    categoryId: 5,
  },
  {
    category: "스포츠",
    categoryId: 6,
  },
  {
    category: "세계",
    categoryId: 7,
  },
];

export default Categories;
