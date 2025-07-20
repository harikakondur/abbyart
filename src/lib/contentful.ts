import { createClient } from 'contentful';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is not defined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined');
}

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export const contentfulPreviewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com',
});

// Test connection function
export async function testContentfulConnection() {
  try {
    const response = await contentfulClient.getSpace();
    console.log('✅ Contentful connection successful');
    console.log('Space name:', response.name);
    return true;
  } catch (error) {
    console.error('❌ Contentful connection failed:', error);
    return false;
  }
}
