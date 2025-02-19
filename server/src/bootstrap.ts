import type { Core } from '@strapi/strapi';
import slugify from 'slugify';

interface LifecycleEvent {
  action: string;
  model?: { uid: string };
  params: { data?: Record<string, any> };
}

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.log.info('✅ Slugger Plugin Bootstrapped');

  const slugConfig = strapi.plugin('slugger')?.config('slugConfig') as Record<
    string,
    { sourceField: string; slugField: string }
  >;

  if (!slugConfig) {
    strapi.log.error('❌ Slug Config is undefined! Check your `config/plugins.ts`.');
    return;
  }

  strapi.log.info(`📌 Loaded Slug Config:`, slugConfig);

  strapi.db.lifecycles.subscribe(async (event) => {
    if (event.action === 'beforeCreate' || event.action === 'beforeUpdate') {
      const modelName = event.model?.uid.split('.').pop(); // Extract model name
      if (!modelName || !slugConfig[modelName]) {
        strapi.log.warn(`⚠️ ${modelName} is not in slugConfig. Skipping.`);
        return;
      }

      const { sourceField, slugField } = slugConfig[modelName];
      const { data } = event.params;

      if (!data || !data[sourceField]) {
        strapi.log.warn(`⚠️ No value found for '${sourceField}' in ${modelName}. Skipping slug.`);
        return;
      }

      if (!data[slugField]) {
        let slug = slugify(data[sourceField], { lower: true, strict: true });

        // ✅ Ensure uniqueness within the same collection
        let counter = 1;
        let existingEntry = await strapi.db
          .query(event.model.uid)
          .findOne({ where: { [slugField]: slug } });

        while (existingEntry) {
          slug = `${slug}-${counter}`;
          existingEntry = await strapi.db
            .query(event.model.uid)
            .findOne({ where: { [slugField]: slug } });
          counter++;
        }

        data[slugField] = slug;
        strapi.log.info(`✅ Generated Unique Slug: ${data[slugField]} for ${modelName}`);
      }
    }
  });

  strapi.log.info('✅ Slugger Lifecycle Hooks Registered Successfully');
};

export default bootstrap;
