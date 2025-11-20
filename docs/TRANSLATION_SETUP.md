# Document-Level Translation Setup Complete ✅

## What Changed

I've added the `'page'` schema type to the document internationalization configuration in `sanity.config.ts`. This enables the same multi-language document creation UI that header and footer already have.

## How to Use Document-Level Translation

### Step 1: Refresh Sanity Studio

1. Open your Sanity Studio at: http://localhost:3000/studio
2. **Hard refresh the page** (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. The translation plugin should now be active for page documents

### Step 2: Create Your First Homepage

1. Navigate to **Pages > Homepage** in Sanity Studio
2. Click **"+ Create"**
3. You should now see a **language selector dropdown** at the top of the form
4. Select your base language (e.g., "English")
5. Fill in the following fields:
   - **Page Title**: "Homepage (English)"
   - **Sections**: Click "+ Add item" and select "Hero Section"
     - Title: Your main heading (use `\n` for line breaks)
     - Subtitle: Optional subheading
     - CTA Text: Button text (optional)
     - CTA Link: Button URL (e.g., `/contact`)
     - Slides: Add at least one slide (image or video)
   - **SEO Tab**: Fill in SEO metadata (highly recommended)
     - SEO Title: 50-60 characters
     - SEO Description: 150-160 characters
     - Keywords: Add relevant keywords
     - OG Image: Upload a 1200x630px image for social sharing
6. **Save** the document
7. **Publish** when ready

### Step 3: Create Translations

After creating your first homepage version, you'll see a **translation panel** on the right side of the editor:

1. Click **"Create translation"** or the **"+ Add translation"** button
2. Select the target language (e.g., "Turkish", "Arabic", "Russian")
3. A new document will be created with the same structure
4. Fill in the translated content:
   - Translate title, subtitle, CTA text
   - Keep the same images/videos or upload localized versions
   - Translate SEO fields for better local search ranking
5. **Save** and **Publish**

### Step 4: Verify Translations Work

1. Visit http://localhost:3000/en - should show English homepage
2. Visit http://localhost:3000/tr - should show Turkish homepage
3. Visit http://localhost:3000/ar - should show Arabic homepage
4. Visit http://localhost:3000/ru - should show Russian homepage

Each language should display its own hero content based on what you configured in Sanity.

## Translation Panel Features

Once document internationalization is enabled, you'll see:

### In the Editor

- **Language selector** at the top (shows current language)
- **Translation status indicator** (shows which languages have content)
- **Quick switch** between language versions
- **Copy from another language** option (to duplicate structure)

### Translation Management

- See all translations in one place
- Delete a specific translation
- Create missing translations
- View translation status (draft, published, etc.)

## Best Practices

### Content Strategy

1. **Start with one language**: Create your primary language version first
2. **Use consistent structure**: Keep the same number of slides across languages
3. **Localize, don't just translate**:
   - Consider cultural differences
   - Use local imagery when appropriate
   - Adjust CTAs for local markets
   - Optimize keywords for local search

### SEO for Each Language

1. **Unique meta titles**: Don't just translate - optimize for local search
2. **Local keywords**: Research keywords in each language
3. **OG images**: Consider language-specific social sharing images
4. **Canonical URLs**: Let Next.js handle this automatically

### Image Strategy

1. **Shared images**: Use the same hero images if they're universal
2. **Localized images**: Upload different images if they contain text or cultural references
3. **Alt text**: Always translate alt text for accessibility and SEO

## Troubleshooting

### "I don't see the language selector"

- Make sure you hard-refreshed Sanity Studio (Cmd+Shift+R)
- Check that `sanity.config.ts` includes `'page'` in schemaTypes
- Try clearing browser cache

### "Translation panel is not showing"

- The document must be saved first before translations can be created
- Check that the document type is 'page' (not another type)
- Verify the plugin is loaded in sanity.config.ts

### "Changes not reflecting on website"

- Wait for revalidation (1 hour) or clear `.next` folder
- Check that the locale in the URL matches the language in Sanity
- Verify data is being fetched correctly (check browser console)

### "Getting 404 for different locales"

- Make sure you created a page document for that specific language
- Check that `pageKey` is set to "homepage"
- Verify `language` field matches the locale (en, tr, ar, ru)

## Technical Details

### What the Plugin Does

The `@sanity/document-internationalization` plugin:

- Adds language metadata to documents
- Creates relationships between translations
- Provides UI for managing translations
- Ensures proper document structure
- Handles draft/published state per language

### Schema Configuration

```typescript
// sanity.config.ts
documentInternationalization({
  supportedLanguages: [
    { id: "tr", title: "Turkish" },
    { id: "en", title: "English" },
    { id: "es", title: "Spanish" },
    { id: "ar", title: "Arabic" },
    { id: "ru", title: "Russian" },
  ],
  schemaTypes: ["header", "footer", "page"], // ← 'page' added!
});
```

### How It Works with Our Query

The GROQ query filters by language:

```groq
*[_type == "page" && pageKey == "homepage" && language == $language][0]
```

This ensures each locale URL shows the correct language version.

## Next Steps

1. **Create homepage for all languages** you want to support
2. **Test each language version** in the browser
3. **Verify SEO metadata** is properly set for each language
4. **Add more page types** (About, Contact, etc.) using the same pattern

---

**Need Help?** Check the main documentation at `docs/HOMEPAGE_SETUP.md` for more details on creating content and optimizing performance.
