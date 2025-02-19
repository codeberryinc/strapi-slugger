import slugify from 'slugify';

export const generateSlug = async (text: string, model: any, strapi: any): Promise<string> => {
  let slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  let counter = 1;
  let existingEntry = await strapi.db.query(model.uid).findOne({ where: { slug } });

  while (existingEntry) {
    slug = `${slug}-${counter}`;
    existingEntry = await strapi.db.query(model.uid).findOne({ where: { slug } });
    counter++;
  }

  return slug;
};
