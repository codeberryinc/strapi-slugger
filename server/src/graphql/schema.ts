export default ({ nexus }: { nexus: any }) => ({
  typeDefs: `
    type Query {
      articleBySlug(slugHere: String!): Article
      articleByDocumentId(documentId: ID!): Article
    }
  `,

  resolvers: {
    Query: {
      // ✅ Query by `slugHere`
      articleBySlug: async (
        _parent: any,
        { slugHere }: { slugHere: string },
        { strapi }: { strapi: any }
      ) => {
        const [article] = await strapi.entityService.findMany('api::article.article', {
          filters: { slugHere },
          limit: 1,
        });
        return article || null;
      },

      // ✅ Query by `documentId`
      articleByDocumentId: async (
        _parent: any,
        { documentId }: { documentId: string },
        { strapi }: { strapi: any }
      ) => {
        const [article] = await strapi.entityService.findMany('api::article.article', {
          filters: { documentId },
          limit: 1,
        });
        return article || null;
      },
    },
  },

  resolversConfig: {
    'Query.articleBySlug': {
      auth: false, // Adjust authentication rules if needed
    },
    'Query.articleByDocumentId': {
      auth: false,
    },
  },
});
