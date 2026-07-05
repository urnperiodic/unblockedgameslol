export interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  featured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  gameId?: string;
  isCustomGenerated?: boolean;
}

