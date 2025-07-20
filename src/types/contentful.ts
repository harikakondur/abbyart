export interface ArtistProfile {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    biography: string;
    artistStatement?: string;
    profileImage?: {
      fields: {
        file: {
          url: string;
          fileName: string;
        };
      };
    };
    socialMediaLinks?: string[];
    contactEmail: string;
    websiteTitle?: string;
    websiteDescription?: string;
  };
}

export interface Artwork {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    description: string;
    images: Array<{
      fields: {
        file: {
          url: string;
          fileName: string;
        };
      };
    }>;
    dimensions?: string;
    price?: number;
    availability: 'Available' | 'Sold' | 'Not for Sale';
    categories?: string[];
    creationDate?: string;
    technique?: string;
    slug: string;
    featured?: boolean;
  };
}

export interface AboutPage {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    content: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  };
}

export interface ContactForm {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
    status: 'New' | 'Responded' | 'Spam';
    artworkReference?: {
      sys: {
        id: string;
      };
    };
  };
}
