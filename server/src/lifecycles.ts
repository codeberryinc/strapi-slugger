import { generateSlug } from '../utils/slugify';

export default {
  async beforeCreate(event: { params: { data: Record<string, any>; model: { uid: string } } }) {
    const { data, model } = event.params;
    const modelName = model.uid.split('::')[1];

    // ✅ Ensure pluginConfig has a known structure
    const pluginConfig =
      (strapi.plugin('slugger')?.config('slugFieldMapping') as Record<string, string>) || {};

    if (Object.prototype.hasOwnProperty.call(pluginConfig, modelName)) {
      const slugField = pluginConfig[modelName];
      strapi.log.info(`📌 Processing Collection: ${modelName}, Slug Field: ${slugField}`);

      if (data[slugField] && !data.slug) {
        data.slug = await generateSlug(data[slugField], model, strapi);
        strapi.log.info(`✅ Generated Slug: ${data.slug}`);
      }
    }
  },

  async beforeUpdate(event: { params: { data: Record<string, any>; model: { uid: string } } }) {
    const { data, model } = event.params;
    const modelName = model.uid.split('::')[1];

    const pluginConfig =
      (strapi.plugin('slugger')?.config('slugFieldMapping') as Record<string, string>) || {};

    if (Object.prototype.hasOwnProperty.call(pluginConfig, modelName)) {
      const slugField = pluginConfig[modelName];
      strapi.log.info(`📌 Updating Collection: ${modelName}, Config:`, pluginConfig);

      if (data[slugField] && !data.slug) {
        data.slug = await generateSlug(data[slugField], model, strapi);
        strapi.log.info(`✅ Updated Slug: ${data.slug}`);
      }
    }
  },
};
