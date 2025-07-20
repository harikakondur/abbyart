import { NextResponse } from 'next/server';
import {
  getAllContentTypes,
  getContentTypeDetails,
} from '@/lib/contentful-utils';

export async function GET() {
  try {
    const contentTypes = await getAllContentTypes();

    // Get detailed information for each content type
    const detailedContentTypes = await Promise.all(
      contentTypes.map(async type => {
        const details = await getContentTypeDetails(type.id);
        return {
          ...type,
          fields: details?.fields || [],
        };
      })
    );

    return NextResponse.json({
      success: true,
      contentTypes: detailedContentTypes,
    });
  } catch (error) {
    console.error('Error fetching content types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content types' },
      { status: 500 }
    );
  }
}
