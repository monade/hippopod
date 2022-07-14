export interface Episode {
  id: number;
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  sizeBytes?: number;
  imageUrl?: string;
  durationSeconds?: number;
  publicationDate?: Date;
  language?: string;
  copyright?: string;
}
