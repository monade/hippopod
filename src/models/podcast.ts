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
  lastBuildDate?: Date;
  language?: string;
  copyright?: string;
}
