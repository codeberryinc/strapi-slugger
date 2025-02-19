# Slugger - Strapi Plugin  
**Slugger** is a Strapi plugin that automatically generates **SEO-friendly slugs** for your content entries based on specified fields.  

## 🚀 Features  
- **Automatic slug generation** on `beforeCreate` and `beforeUpdate` events.  
- **Per collection type configuration** to specify source and slug fields.  
- **Ensures unique slugs within a collection** to avoid duplicates.  

## 📦 Installation  

Install the plugin via npm:  

```sh
npm install @codeberry/slugger
```

Or via yarn:  

```sh
yarn add @codeberry/slugger
```

## ⚙️ Configuration  

To configure Slugger, modify your `config/plugins.ts` file:  

```ts
export default {
  slugger: {
    enabled: true,
    config: {
      slugConfig: {
        article: { sourceField: "title", slugField: "slug" },
      },
    },
  },
};
```

### Explanation:
- **`article`** → The collection type to apply slug generation.  
- **`sourceField: "title"`** → Field from which the slug is generated.  
- **`slugField: "slug"`** → Field where the generated slug is stored.  

## 🛠 Usage  

Once configured, the plugin will **automatically generate slugs** before an entry is created or updated.  

- If an entry in `article` has a **title**, it will generate a **slug** from it.  
- If a slug already exists, a unique version will be created (e.g., `my-title`, `my-title-1`).  

## 📌 Example Behavior  

| Title                      | Generated Slug         |
|----------------------------|------------------------|
| "Hello World"              | `hello-world`          |
| "Hello World" (duplicate)  | `hello-world-1`        |
| "Strapi is Awesome!"       | `strapi-is-awesome`    |

## 🔍 Ensuring Slug Uniqueness  

Slugs are made **unique within the collection type** by appending an incremental counter if necessary.

## 📝 Notes  
- This plugin **does not** modify existing slugs unless the `sourceField` is updated.  
- Ensure the `slugField` exists in the collection schema.  

## 🤝 Contributing  

Want to contribute? Feel free to fork, open issues, or submit PRs!  

## 📄 License  

This project is licensed under the **MIT License**.
