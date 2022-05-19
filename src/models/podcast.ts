import { Episode } from "./episode";

export interface Podcast {
  feedUrl: string;
  title?: string;
  description?: string;
  author?: string;
  email?: string;
  categories: string[];
  imageUrl?: string;
  episodes: Episode[];
  lastUpdate?: Date;
  language?: string;
  copyright?: string;
}