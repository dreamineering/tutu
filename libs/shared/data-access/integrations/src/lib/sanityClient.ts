import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: process.env['SANITY_CMS_PROJECT_ID'],
  dataset: process.env['SANITY_CMS_DATASET'],
  apiVersion: process.env['SANITY_CMS_API_VERSION'],
  token: process.env['SANITY_CMS_PROJECT_ID'],
  useCdn: false,
});
