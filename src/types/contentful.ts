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
    availability: 'Available' | 'Sold' | 'Reserved';
    categories?: string[];
    creationDate?: string;
    technique?: string;
    slug: string;
    featured?: boolean;
  };
}

export interface ArtistInfo {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    biography: string;
    artistStatement?: string;
    socialMediaLinks?: string[];
    contactEmail: string;
    profileImage?: {
      fields: {
        file: {
          url: string;
          fileName: string;
        };
      };
    };
    websiteTitle?: string;
    websiteDescription?: string;
  };
}

export interface ContactSubmission {
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
  };
}

export interface PurchaseInquiry {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    artworkReference: {
      sys: {
        id: string;
      };
    };
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    message: string;
    timestamp: string;
    status: 'New' | 'Responded' | 'Closed';
    budgetRange?: string;
    timeline?: string;
  };
}

export interface SiteContent {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    pageTitle: string;
    pageSlug: string;
    content?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    isActive: boolean;
  };
}
