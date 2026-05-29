export type Article = {
  id: number;
  title: string;
  category: string;
  timeToRead: string;
  description: string;
  image: string;
};

export type FeaturedTip = {
  title: string;
  description: string;
};

export type InsightData = {
  categories: string[];
  featuredTip: FeaturedTip;
  articles: Article[];
};
