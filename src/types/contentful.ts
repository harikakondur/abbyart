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
    instagramHandle?: string;
    instagramLink?: string;
    contactEmail: string;
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
    medium?: string;
    slug: string;
    featured?: boolean;
    priority?: number;
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
  };
}

export interface ContactForm {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    email: string;
    phone?: string;
    preferredContactMethod: 'Email' | 'Phone' | 'Either';
    subject: string;
    message: string;
    timestamp: string;
    status: 'New' | 'Responded' | 'Spam' | 'Archived';
    artworkReference?: {
      sys: {
        id: string;
        type: 'Link';
        linkType: 'Entry';
      };
    };
    inquiryType:
      | 'General Contact'
      | 'Artwork Inquiry'
      | 'Commission Request'
      | 'Other';
    urgency?: 'Low' | 'Medium' | 'High' | 'Urgent';
    budget?:
      | 'Under $100'
      | '$100-$500'
      | '$500-$1500'
      | '$1500+'
      | 'Not specified';
    respondedAt?: string;
    notes?: string;
    emailSent: boolean;
    emailSentAt?: string;
  };
}
