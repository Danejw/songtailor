export interface Song {
  title: string;
  style: string;
  lyrics: string;
  themes: string;
  reference_links: string;
}

export interface Profile {
  email: string;
}

export interface Order {
  id: string;
  created_at: string;
  status: string;
  songs?: Song;
  profiles?: Profile;
}