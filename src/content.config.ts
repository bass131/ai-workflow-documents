import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema({ extend: z.object({
      'workshop.documentList': z.string(),
      'workshop.openDocuments': z.string(),
      'workshop.closeDocuments': z.string(),
      'workshop.home': z.string(),
      'workshop.mainMenu': z.string(),
      'workshop.guide': z.string(),
      'workshop.cases': z.string(),
      'workshop.design': z.string(),
      'workshop.notFoundTitle': z.string(),
      'workshop.notFoundDescription': z.string(),
      'workshop.notFoundText': z.string(),
      'workshop.returnHome': z.string(),
    }) }) }),
};
