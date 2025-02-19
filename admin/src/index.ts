import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${PLUGIN_ID}.plugin.name`,
    //     defaultMessage: PLUGIN_ID,
    //   },
    //   Component: async () => {
    //     const { App } = await import('./pages/App');
    //     return App;
    //   },
    // });

    // ✅ Register the Slug Custom Field
    app.customFields.register({
      name: 'slug',
      pluginId: 'slugger', // ✅ Ensure this matches the server registration
      type: 'string',
      intlLabel: {
        id: 'slugger.slug.label',
        defaultMessage: 'Slug',
      },
      intlDescription: {
        id: 'slugger.slug.description',
        defaultMessage: 'Automatically generates a URL-friendly slug.',
      },
      // icon: PluginIcon,
      components: {
        Input: async () =>
          import(/* webpackChunkName: "slug-input-component" */ './components/SlugInput'),
      },
    });

    // ✅ Register the Plugin in the Admin Panel
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    console.log('✅ Slugger custom field registered successfully in Strapi admin');
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
