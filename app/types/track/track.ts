import type { Artist } from "../artist/artist";

export type Track = {
  id: number;
  yandexId: number;
  title: string;
  downloadLink: string;
  coverBlob: any | null;
  artists: Artist[];
  durationMs: number;
};
