import contentful from 'contentful-management';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

if (!process.env.CONTENTFUL_CMA_TOKEN) {
  throw new Error('CONTENTFUL_CMA_TOKEN is not set');
}

const CMA_CLIENT = contentful.createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

async function createContentTypes() {
  try {
    const space = await CMA_CLIENT.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    console.log('🚀 Creating content types...');

    // 1. Create Artist Profile Content Type
    console.log('📝 Creating Artist Profile...');
    const artistProfile = await environment.createContentTypeWithId(
      'artistProfile',
      {
        name: 'Artist Profile',
        description: 'Artist information and profile data',
        fields: [
          {
            id: 'name',
            name: 'Name',
            type: 'Symbol',
            required: true,
            localized: false,
            validations: [{ size: { max: 100 } }],
            // Help Text: Your full name as it should appear on the website
          },
          {
            id: 'biography',
            name: 'Biography',
            type: 'Text',
            required: true,
            localized: false,
            validations: [{ size: { max: 2000 } }],
            // Help Text: Tell visitors about your artistic journey and background
          },
          {
            id: 'artistStatement',
            name: 'Artist Statement',
            type: 'Text',
            required: false,
            localized: false,
            validations: [{ size: { max: 1500 } }],
            // Help Text: Share your artistic philosophy and approach
          },
          {
            id: 'profileImage',
            name: 'Profile Image',
            type: 'Link',
            linkType: 'Asset',
            required: false,
            localized: false,
            validations: [{ linkMimetypeGroup: ['image'] }],
            // Help Text: A photo of yourself
          },
          {
            id: 'instagramHandle',
            name: 'Instagram Handle',
            type: 'Symbol',
            required: false,
            localized: false,
            validations: [{ size: { max: 50 } }],
            // Help Text: Your Instagram handle (without @)
          },
          {
            id: 'instagramLink',
            name: 'Instagram Link',
            type: 'Symbol',
            required: false,
            localized: false,
            validations: [{ size: { max: 200 } }],
            // Help Text: Your Instagram profile URL
          },
          {
            id: 'contactEmail',
            name: 'Contact Email',
            type: 'Symbol',
            required: true,
            localized: false,
            validations: [
              {
                regexp: {
                  pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
                  flags: '',
                },
              },
            ],
            // Help Text: Email address for customer inquiries
          },
        ],
      }
    );

    // 2. Create Artwork Content Type
    console.log('🎨 Creating Artwork...');
    const artwork = await environment.createContentTypeWithId('artwork', {
      name: 'Artwork',
      description: 'Artwork information and images',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [{ size: { max: 100 } }],
          // Help Text: Give your artwork a title
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true,
          localized: false,
          validations: [{ size: { max: 2000 } }],
          // Help Text: Tell the story behind your artwork - inspiration, process, meaning
        },
        {
          id: 'images',
          name: 'Images',
          type: 'Array',
          required: true,
          localized: false,
          validations: [{ size: { min: 1, max: 10 } }],
          items: {
            type: 'Link',
            linkType: 'Asset',
            validations: [{ linkMimetypeGroup: ['image'] }],
          },
          // Help Text: Upload high-quality photos. Drag multiple images here.
        },
        {
          id: 'dimensions',
          name: 'Dimensions',
          type: 'Symbol',
          required: false,
          // helpText: 'Include both inches and centimeters if possible',
          localized: false,
          validations: [{ size: { max: 100 } }],
        },
        {
          id: 'price',
          name: 'Price',
          type: 'Number',
          required: false,
          localized: false,
          validations: [{ range: { min: 0 } }],
        },
        {
          id: 'availability',
          name: 'Availability',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [{ in: ['Available', 'Sold', 'Not for Sale'] }],
        },
        {
          id: 'categories',
          name: 'Categories',
          type: 'Array',
          required: false,
          localized: false,
          items: {
            type: 'Symbol',
            validations: [{ size: { max: 50 } }],
          },
        },
        {
          id: 'creationDate',
          name: 'Creation Date',
          type: 'Date',
          required: false,
          localized: false,
        },
        {
          id: 'medium',
          name: 'Medium',
          type: 'Symbol',
          required: false,
          // Help Text: What materials and medium did you use? (e.g., "Oil on Canvas", "Digital Art", "Mixed Media on Wood")
          localized: false,
          validations: [{ size: { max: 100 } }],
        },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          // Help Text: URL-friendly version of the title (auto-generated)
          localized: false,
          validations: [{ size: { max: 100 } }],
        },
        {
          id: 'featured',
          name: 'Featured',
          type: 'Boolean',
          required: false,
          localized: false,
          // Help Text: Featured artwork appears on the homepage
        },
        {
          id: 'priority',
          name: 'Priority',
          type: 'Integer',
          required: false,
          localized: false,
          validations: [{ range: { min: 1, max: 100 } }],
          // Help Text: Higher numbers appear first (1 = highest priority, 100 = lowest)
        },
      ],
    });

    // 3. Create About Page Content Type
    console.log('📄 Creating About Page...');
    const aboutPage = await environment.createContentTypeWithId('aboutPage', {
      name: 'About Page',
      description: 'About page content',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [{ size: { max: 100 } }],
        },
        {
          id: 'content',
          name: 'Content',
          type: 'RichText',
          required: true,
          localized: false,
          validations: [
            { size: { max: 5000 } },
            { enabledMarks: ['bold', 'italic', 'underline'] },
            {
              enabledNodeTypes: [
                'paragraph',
                'heading-2',
                'heading-3',
                'unordered-list',
                'ordered-list',
              ],
            },
          ],
          // helpText: 'Write your about page content here. Use formatting to make it look great!'
        },
      ],
    });

    // 4. Create Contact Form Content Type
    console.log('📧 Creating Contact Form...');
    const contactForm = await environment.createContentTypeWithId(
      'contactForm',
      {
        name: 'Contact Form',
        description: 'Contact form submissions',
        fields: [
          {
            id: 'name',
            name: 'Name',
            type: 'Symbol',
            required: true,
            localized: false,
            validations: [{ size: { max: 100 } }],
            // Help Text: Customer's full name
          },
          {
            id: 'email',
            name: 'Email',
            type: 'Symbol',
            required: true,
            // helpText: "Customer's email address (required for all inquiries)",
            localized: false,
            validations: [
              {
                regexp: {
                  pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
                  flags: '',
                },
              },
            ],
          },
          {
            id: 'phone',
            name: 'Phone',
            type: 'Symbol',
            required: false,
            // helpText: "Customer's phone number (optional)",
            localized: false,
            validations: [{ size: { max: 20 } }],
          },
          {
            id: 'preferredContactMethod',
            name: 'Preferred Contact Method',
            type: 'Symbol',
            required: true,
            // helpText: 'How would the customer prefer to be contacted?',
            localized: false,
            validations: [{ in: ['Email', 'Phone', 'Either'] }],
          },
          {
            id: 'subject',
            name: 'Subject',
            type: 'Symbol',
            required: true,
            // helpText: 'Subject of the inquiry',
            localized: false,
            validations: [{ size: { max: 200 } }],
          },
          {
            id: 'message',
            name: 'Message',
            type: 'Text',
            required: true,
            localized: false,
            // helpText: "Customer's message",
            validations: [{ size: { max: 1000 } }],
          },
          {
            id: 'urgency',
            name: 'Urgency',
            type: 'Symbol',
            required: false,
            localized: false,
            // helpText: 'How urgent is this inquiry?',
            validations: [{ in: ['Low', 'Medium', 'High', 'Urgent'] }],
          },
          {
            id: 'budget',
            name: 'Budget Range',
            type: 'Symbol',
            required: false,
            // helpText: 'Customer\'s budget range (if applicable)',
            localized: false,
            validations: [
              {
                in: [
                  'Under $50',
                  '$50-100',
                  '$100-$250',
                  '$250-$500',
                  '$500+',
                  'Not specified',
                ],
              },
            ],
          },
          {
            id: 'timestamp',
            name: 'Timestamp',
            type: 'Date',
            required: true,
            // helpText: 'When the inquiry was submitted',
            localized: false,
          },
          {
            id: 'status',
            name: 'Status',
            type: 'Symbol',
            required: true,
            // helpText: 'Current status of this inquiry',
            localized: false,
            validations: [{ in: ['New', 'Responded', 'Spam', 'Archived'] }],
          },
          {
            id: 'artworkReference',
            name: 'Artwork Reference',
            type: 'Link',
            linkType: 'Entry', // <-- Add this line
            required: false,
            // helpText: 'If this inquiry is about a specific artwork',
            localized: false,
            validations: [{ linkContentType: ['artwork'] }],
          },
          {
            id: 'inquiryType',
            name: 'Inquiry Type',
            type: 'Symbol',
            required: true,
            // helpText: 'Type of inquiry for better organization',
            localized: false,
            validations: [
              {
                in: [
                  'General Contact',
                  'Artwork Inquiry',
                  'Commission Request',
                  'Other',
                ],
              },
            ],
          },
          {
            id: 'respondedAt',
            name: 'Responded At',
            type: 'Date',
            required: false,
            // helpText: 'When you responded to this inquiry',
            localized: false,
          },
          {
            id: 'notes',
            name: 'Notes',
            type: 'Text',
            required: false,
            // helpText: 'Private notes about this inquiry (only visible to you)',
            localized: false,
            validations: [{ size: { max: 500 } }],
          },
          {
            id: 'emailSent',
            name: 'Email Sent',
            type: 'Boolean',
            required: false,
            // helpText: 'Whether notification email was sent to artist',
            localized: false,
          },
          {
            id: 'emailSentAt',
            name: 'Email Sent At',
            type: 'Date',
            required: false,
            // helpText: 'When notification email was sent',
            localized: false,
          },
        ],
      }
    );

    // Publish all content types
    console.log('📤 Publishing content types...');
    await artistProfile.publish();
    await artwork.publish();
    await aboutPage.publish();
    await contactForm.publish();

    console.log('✅ All content types created and published successfully!');
    console.log('📋 Created content types:');
    console.log('  - Artist Profile (artistProfile)');
    console.log('  - Artwork (artwork)');
    console.log('  - About Page (aboutPage)');
    console.log('  - Contact Form (contactForm)');
  } catch (error) {
    console.error('❌ Error creating content types:', error);
    throw error;
  }
}

// Run the script
createContentTypes()
  .then(() => {
    console.log('🎉 Content types setup complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  });

export { createContentTypes };
