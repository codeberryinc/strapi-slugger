# **Slugger - Strapi Plugin**  
🚀 **Slugger** is a Strapi plugin that automatically generates **SEO-friendly slugs** for your content entries based on specified fields.  

## **✨ Features**  
- ✅ **Automatic slug generation** on `beforeCreate` and `beforeUpdate` events  
- ✅ **Per collection type configuration** to specify source and slug fields  
- ✅ **Ensures unique slugs within a collection** to avoid duplicates  
- ✅ **Custom slug field** for each collection type  

---

## **📦 Installation**  

### **Via npm:**  
```sh
npm install @codeberry/slugger
```

### **Via yarn:**  
```sh
yarn add @codeberry/slugger
```

---

## **⚙️ Configuration**  

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

### **Configuration Breakdown:**  
- **`article`** → The collection type where slug generation should be applied  
- **`sourceField: "title"`** → Field from which the slug is generated  
- **`slugField: "slug"`** → Field where the generated slug is stored  

---

## **🔧 Adding the Slug Field to Your Collection**  

This plugin **does not** automatically add the slug field. You need to **manually** add it using the Strapi Admin Panel:  

### **Steps to Add the Slug Field:**  
1. **Go to Strapi Admin Panel → Content-Type Builder**  
2. Open the **collection type** where you want to generate slugs (e.g., `article`)  
3. **Click "Add another field"**  
4. Navigate to the **Custom Fields** tab  
5. **Select the field named "Slug"**  
6. **Enter a name for the field** (e.g., `slugHere` or `slug`)  
   - This name must match the **`slugField`** value in your **plugin configuration**  
7. **Save and apply the changes**  

Now, the plugin will **store the generated slugs** in this field automatically.

---

## **🛠 Usage**  

Once configured, the plugin will **automatically generate slugs** before an entry is created or updated.  

- If an entry in `article` has a **title**, it will generate a **slug** from it.  
- If a slug already exists, a unique version will be created (e.g., `my-title`, `my-title-1`).  

### **📌 Example Behavior**  

| Title                      | Generated Slug         |
|----------------------------|------------------------|
| "Hello World"              | `hello-world`          |
| "Hello World" (duplicate)  | `hello-world-1`        |
| "Strapi is Awesome!"       | `strapi-is-awesome`    |

---

## **🔍 Ensuring Slug Uniqueness**  

Slugs are made **unique within the collection type** by appending an incremental counter if necessary.

---

## **📝 Notes**  
- This plugin **does not** modify existing slugs unless the `sourceField` is updated.  
- Ensure the **slug field is added** using the **Custom Fields tab** in Strapi Admin.  
- The **slug field name** must match what is set in `slugField` inside the plugin configuration.  

---

## **🤝 Contributing**  

Want to contribute? Feel free to **fork the repository**, open issues, or submit PRs! 🚀  

---

## **📄 License**  

This project is licensed under the **MIT License**.  

---

### **🎉 Now you're all set! Happy slugging! 🚀**
