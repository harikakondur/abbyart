import { contentfulClient } from './contentful';

export async function getContentTypeDetails(contentTypeId: string) {
  try {
    const contentType = await contentfulClient.getContentType(contentTypeId);
    return {
      id: contentType.sys.id,
      name: contentType.name,
      description: contentType.description,
      fields: contentType.fields.map(field => ({
        id: field.id,
        name: field.name,
        type: field.type,
        required: field.required,
        validations: field.validations,
        localized: field.localized,
      })),
    };
  } catch (error) {
    console.error(`Error fetching content type ${contentTypeId}:`, error);
    return null;
  }
}

export async function getAllContentTypes() {
  try {
    const response = await contentfulClient.getContentTypes();
    return response.items.map(type => ({
      id: type.sys.id,
      name: type.name,
      description: type.description,
    }));
  } catch (error) {
    console.error('Error fetching content types:', error);
    return [];
  }
}

export async function getEntriesByType(contentTypeId: string, limit = 10) {
  try {
    const response = await contentfulClient.getEntries({
      content_type: contentTypeId,
      limit,
    });
    return response.items;
  } catch (error) {
    console.error(`Error fetching entries for ${contentTypeId}:`, error);
    return [];
  }
}
