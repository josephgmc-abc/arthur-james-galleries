export interface Artist {
  slug: string;
  name: string;
  bio: string;
  imageSrc: string;
  artworkThumbnail: string;
  featured: boolean;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  artist: string;
  artistFeatured: boolean;
  year: string;
  medium: string;
  dimensions: string;
  provenance: string;
  price: string;
  imageSrc: string;
  featured: boolean;
  status: string;
}

export interface Report {
  slug: string;
  title: string;
  summary: string;
  date: string;
  pdfUrl?: string;
}

export interface Exhibition {
  slug: string;
  title: string;
  subtitle?: string;
  location: string;
  dates: string;
  type: string;
  imageSrc: string;
  description: string;
}
