import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.log.info('✅ Slugger Plugin Registering');

  // ✅ Register the Slug Custom Field
  strapi.customFields.register({
    name: 'slug',
    plugin: 'slugger',
    type: 'string',
  });

  strapi.log.info('✅ Custom Slug field registered successfully');
};

export default register;
