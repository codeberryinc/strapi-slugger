import { Context, Next } from 'koa';
import slugify from 'slugify';

export default async (ctx: Context, next: Next) => {
  strapi.log.info(`✅ I AM IN A MIDDLEWARE:`);
  const { body } = ctx.request;
  const { model } = ctx.state;

  if (!model || !body) {
    return next();
  }

  const modelName = model.uid.split('::')[1];
  const pluginConfig = (strapi.plugin('slugger')?.config('slugFieldMapping') || {}) as Record<
    string,
    string
  >;

  if (pluginConfig[modelName]) {
    const slugField = pluginConfig[modelName];

    if (body[slugField] && !body.slug) {
      let slug = slugify(body[slugField], { lower: true, strict: true });

      // Ensure uniqueness within the same collection
      let counter = 1;
      let existingEntry = await strapi.db.query(model.uid).findOne({ where: { slug } });

      while (existingEntry) {
        slug = `${slug}-${counter}`;
        existingEntry = await strapi.db.query(model.uid).findOne({ where: { slug } });
        counter++;
      }

      body.slug = slug;
      strapi.log.info(`✅ Middleware Generated Slug: ${slug}`);
    }
  }

  await next();
};
