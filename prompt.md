# MASTER PROMPT — Experimental Personal Blog
## Szymon Potyra / Creative Journal

BARZDZO ZALEZY MI NA TAKIEJ STYLISTYCE BREAK CORE
### ROLE AND OBJECTIVE

You are a senior creative developer, art director, frontend engineer, interaction designer, and software architect.

Build a complete, production-ready personal blog and devlog for Szymon Potyra.

This is an implementation task, not a concept exercise or static mockup.

The blog should feel like an experimental editorial artwork translated into an interactive website.

Prioritize distinctive visual identity, precise typography, generative ASCII artwork, exceptional motion design, usability, and maintainable code.

Implement, test, document, and prepare the complete website for GitHub Pages deployment.

## 1. PROJECT IDENTITY

Owner: Szymon Potyra  
GitHub account: Blankeuu  
Public contact: potyraszymon@gmail.com  
Language: Polish only  
Project type: Personal blog + maker/devlog  
Hosting: GitHub Pages  
Repository: Separate repository from the existing portfolio  
Working repository name: journal

Provisional URL:

https://blankeuu.github.io/journal/

The final brand name has not been selected. Use a restrained, configurable editorial identity based on "Szymon Potyra" and "Journal" or "Notes" as working labels.

Do not invent a permanent brand name or logo.

### Relationship to existing portfolio

The owner's main portfolio lives at:

https://blankeuu.github.io/

It has a restrained, dark, Vercel-inspired visual language with purple accents.

This blog is a separate project, repository, deployment, and visual identity.

Do not reuse the portfolio's design system.

Include a discreet link to the portfolio in the blog navigation or footer.

Do not modify the portfolio repository without explicit authorization.

## 2. VISUAL REFERENCE AND ART DIRECTION

The design is inspired by an experimental typography poster provided by the project owner.

Reference characteristics:

- Warm ivory, paper-like background.
- Dense cobalt-blue textures created from repeated typographic characters.
- Hot pink/magenta typography.
- Oversized headlines.
- Asymmetric composition.
- Forms resembling ASCII drawings, printed halftones, and fragmented digital patterns.
- Strong contrasts between typography and negative space.
- Experimental Korean graphic design and independent zine influences.
- Overprinting and subtle risograph-inspired imperfections.

If the original reference image is supplied locally, inspect it before implementing the visual system.

Suggested reference location:

`design/reference-poster.png`

If the file is unavailable, follow the detailed art direction in this prompt. Do not pretend to have inspected an unavailable image.

### Important

Do not copy the exact reference poster.

Create an original visual system derived from its design principles.

Avoid conventional SaaS landing page aesthetics.

Avoid generic bento cards, generic gradient backgrounds, glassmorphism, and excessive rounded panels.

The result should be recognizable and aesthetically independent.

Aim for the level of polish associated with high-quality experimental editorial websites.

## 3. VISUAL DESIGN SYSTEM

### Light theme

Initial palette:

- Paper: #F3F0E4
- Electric blue: #075AB3
- Magenta: #D11160
- Primary ink: #171717

### Dark theme

Initial palette:

- Background: #10141B
- Electric blue: #68A8FF
- Magenta: #FF559A
- Primary text: #F1EDE4

Refine the palette to meet contrast requirements and visual goals.

The website must automatically follow the visitor's operating-system color scheme.

Implement using `prefers-color-scheme` and CSS custom properties.

Do not simply invert the entire page with CSS filters. Develop intentional compositions for both light and dark palettes.

Ensure that generative ASCII art, textures, borders, and text maintain adequate contrast.

### Typography

Use a distinctive typographic pairing.

Suggested approach:

- Editorial display sans-serif for large titles.
- Highly readable sans-serif for article content.
- Monospaced font for ASCII graphics, dates, labels, metadata, and code.

Use open-license fonts.

Create a consistent typography system covering mobile and desktop.

Experiment with:

- Large scale changes.
- Controlled irregular spacing.
- Asymmetrical alignment.
- Oversized numbers.
- Vertical labels where appropriate.
- Cropped decorative typography.
- Small mono metadata elements.

Avoid compromising article readability.

## 4. EXPERIMENTAL HOMEPAGE

The homepage must behave like an interactive digital poster.

This is the visual centerpiece of the project.

### Full-viewport hero

Create a composition featuring:

- Experimental generative ASCII art.
- Strong editorial typography.
- A clear entry point to the writing archive.
- Szymon Potyra as author.
- A small but usable navigation system.

The opening composition should feel curated and distinctive.

Typography and generative graphics should have meaningful visual relationships.

Do not simply position random decorations around a centered heading.

Use grid structures, asymmetrical alignment, layers, and negative space.

### Homepage content

Below the full-screen composition, include:

1. Latest posts.
2. Featured or editorially selected content, if real content exists.
3. Exploration by topic.
4. Entry into the complete archive.
5. A minimal author/footer section.

Maintain an overall artistic character without turning every section into an unreadable collage.

### Empty content

No initial posts have been selected.

Do not invent personal stories, technical achievements, or fictional articles.

If the blog has no published posts, design a beautiful intentional empty state, with Polish copy.

Development fixtures may be used for testing but must not appear as real published content.

## 5. GENERATIVE ASCII ART SYSTEM

Develop a dedicated reusable generative ASCII artwork engine.

This is a core visual feature, not an afterthought.

### Rendering techniques

Evaluate an appropriate technique, such as:

- HTML text grids.
- SVG text.
- Canvas 2D.
- A hybrid text/Canvas approach.

Choose the implementation that offers the strongest balance of aesthetics, performance, responsiveness, and maintainability.

WebGL is unnecessary unless justified.

### Visual behavior

Generate abstract shapes from characters such as:

`M @ Z J 0 / % # : .`

Experiment with:

- Character density maps.
- Distorted fields.
- ASCII halftone patterns.
- Waves and contours.
- Broken geometric shapes.
- Organic text-based structures.
- Character-based noise.
- Textual masks.

Create several distinct pattern families rather than one endlessly repeated texture.

### Interactions

Implement carefully restrained interactions:

- Pointer proximity distortion.
- Gentle scroll-driven movement.
- Subtle animated character transitions.
- Motion between predefined states.
- Optional interactive hover areas.

Avoid rapidly flickering symbols.

Avoid distracting continuous motion behind long-form text.

### Determinism

Use stable seeded generation.

An article's artwork should derive from a consistent seed based on article metadata or slug.

The same article should have a coherent visual identity across visits.

### Performance and accessibility

- Avoid generating huge character grids unnecessarily.
- Throttle expensive updates.
- Use requestAnimationFrame appropriately.
- Pause or reduce work when artwork is not visible.
- Provide static artwork on low-powered devices.
- Respect `prefers-reduced-motion`.
- Hide decorative ASCII graphics from screen readers.
- Maintain a clear reading order.
- Prevent horizontal overflow.

Provide a graceful fallback if JavaScript is disabled.

### Developer tooling

Provide a simple development-only mechanism for trying artwork seeds, density, palette, and motion settings.

Do not expose unnecessary configuration controls to public visitors.

## 6. POST LIST AND EDITORIAL ARCHIVE

Create a visually experimental index of published articles.

The archive should resemble an independent editorial publication rather than a conventional blog grid.

### Layout

Use a carefully controlled asymmetric composition.

Combine:

- Featured large entries.
- Smaller text-driven entries.
- Variable image proportions.
- Oversized issue numbers or dates.
- Generative ASCII thumbnails.
- Uneven but intentional whitespace.

Do not randomize placement on every render.

The layout should remain stable.

On mobile, simplify the composition into an elegant readable hierarchy.

### Each article entry

Include:

- Title.
- Publication date.
- Short excerpt.
- Tags.
- Optional cover image.
- Optional generative ASCII motif.
- Clear navigation to the article.

### Search and filtering

Implement:

- Full-text search.
- Tag filtering.
- Chronological sorting.
- Chronological archive.
- Empty-result states.

Use Pagefind for static search where appropriate.

Configure search for Polish.

Ensure draft content is excluded from the public search index.

## 7. ARTICLE READING EXPERIENCE

Individual articles must be more restrained than the homepage.

Target balance:

50% experimental visual identity / 50% readable editorial presentation.

### Header

Each article opens with:

- Large editorial title.
- Publication date.
- Tags.
- Optional cover image.
- Generated ASCII artwork or typographic composition.

Use controlled asymmetry.

Allow some visual experimentation without compromising navigation.

### Reading area

After the introductory composition, use a readable article column.

Suggested maximum text measure:

Approximately 65–75 characters per line.

Use comfortable line height, sensible paragraph spacing, and a clear heading hierarchy.

Avoid unnecessary animations inside paragraphs.

### Article features

Support:

- Headings and subheadings.
- Markdown formatting.
- Lists.
- Quotations.
- Links.
- Tables.
- Images with captions.
- Image galleries.
- Code blocks with syntax highlighting.
- Copy-code actions.
- Videos.
- Interactive 3D models.
- Optional related articles.
- Reading time.
- Table of contents for longer posts.

Use lazy loading for heavy media.

### Images

Support optimized responsive images.

Maintain aspect ratio and avoid layout shifts.

Allow full-width editorial images when appropriate.

Do not distort photography with mandatory filters.

### Videos

Support safe, responsive embeds from explicitly supported providers, such as YouTube.

Use privacy-conscious, click-to-load behavior where practical.

Do not allow arbitrary unvalidated iframe URLs.

### Code

Use accessible syntax highlighting.

Ensure long code lines can scroll horizontally without breaking the page.

### 3D models

Support GLB previews using model-viewer.

Features:

- Orbit rotation.
- Zoom.
- Reset view.
- Loading state.
- Helpful error handling.
- Responsive layout.
- Keyboard-accessible controls.

Lazy-load the viewer.

Do not load large 3D libraries on pages that do not contain 3D content.

## 8. CONTENT TOPICS

The blog should accommodate these subjects:

- Personal reflections.
- Photography and creative experiments.
- DIY / Maker.
- AI and coding agents.
- Electronics and ESP32.
- CAD and FreeCAD.
- 3D printing.
- Software development.
- Smart Home.

Implement a flexible tag system rather than creating many mandatory top-level navigation sections.

All editorial interface copy must be in Polish.

Avoid inventing content for these topics.

## 9. CONTENT MANAGEMENT SYSTEM

Use Pages CMS as the primary browser-based editing interface.

Official website:

https://pagescms.org/

Hosted editor:

https://app.pagescms.org/

The public blog remains an Astro static site.

### CMS integration

Create a valid `.pages.yml` configuration in the repository root.

Integrate the CMS with the actual article file structure.

Use GitHub-backed content storage.

Do not introduce an unnecessary database or custom authentication backend.

### Article schema

Provide structured editable fields for:

- Title.
- URL slug.
- Short excerpt.
- Publication date.
- Optional update date.
- Draft/published state.
- Tags.
- Cover image.
- Cover alt text.
- Main article content.
- Optional editorial artwork seed.
- Optional multimedia blocks.
- Optional SEO description.

Use a predictable file naming convention.

Validate slugs and metadata.

### Browser-based authoring

The owner must be able to:

1. Sign in to Pages CMS using GitHub.
2. Create a new article.
3. Write and format content.
4. Upload images.
5. Select tags.
6. Configure article metadata.
7. Save the article.
8. Publish it through the GitHub-backed workflow.
9. Edit existing articles.
10. Mark an article as a draft.

A code editor should not be required for ordinary writing.

### Rich media editing

Do not pretend that arbitrary MDX components can be freely edited by a standard WYSIWYG field.

Implement a realistic authoring experience.

Prefer ordinary Markdown for conventional article text.

For advanced content, use structured CMS blocks where supported, including:

- Text.
- Image.
- Image gallery.
- Code.
- Video.
- 3D model.

Investigate Pages CMS block field capabilities.

Choose and document an actual storage/rendering strategy that preserves block order and allows multimedia to appear between textual sections.

The system must not silently corrupt Markdown or advanced embeds.

Ensure that the resulting content schema works with Astro and the chosen CMS.

If a sophisticated feature is not supported by the editor, implement a safe alternative and document its limitations rather than faking functionality.

### Drafts and publishing

Drafts must not generate publicly accessible article pages, sitemap entries, RSS entries, or search results.

However, explain that drafts committed to a public GitHub repository are still visible in repository source.

Do not represent draft mode as private storage.

New published posts must trigger a production build through GitHub Actions.

CMS authentication must use the hosted provider's supported GitHub integration.

Never commit OAuth secrets, personal access tokens, or credentials.

Do not expose write access to anonymous visitors.

### Media paths

Handle GitHub Pages project-site base paths correctly.

Media uploaded through CMS must resolve correctly under:

`/journal/`

Do not assume all assets are served from the domain root.

Document which paths must change when a custom domain is connected.

## 10. TECHNOLOGY

Preferred stack:

- Astro.
- TypeScript in strict mode.
- Tailwind CSS 4.
- Custom CSS properties.
- Astro Content Collections.
- Markdown for standard articles.
- Structured multimedia components.
- Pages CMS.
- Pagefind.
- model-viewer for GLB files.
- GitHub Actions.
- GitHub Pages.

Use stable, supported versions and consult current official documentation.

Avoid adding React or another heavy framework without a concrete justification.

Prioritize static HTML and selective client-side enhancement.

Keep dependencies minimal.

## 11. RESPONSIVENESS

The design must work on:

- 320px mobile screens.
- Modern smartphones.
- Tablets.
- Laptops.
- Large desktop monitors.

Desktop may use bold typographic compositions and asymmetric layouts.

Mobile must preserve artistic identity while simplifying overlapping elements and complex spatial arrangements.

Ensure:

- No horizontal overflow.
- Readable text.
- Proper touch targets.
- Functional navigation.
- Smooth, performant interactions.
- Appropriate responsive images.
- Responsive code and media containers.

Do not implement a desktop-only piece of art and call it responsive.

## 12. MOTION DESIGN

Implement:

- Smooth page transitions.
- Elegant scroll reveals.
- Subtle parallax.
- Typography entrance animations.
- ASCII motion.
- Hover interactions.
- Responsive transitions.
- Clean navigation interactions.

Motion must support the editorial concept.

Use browser-native capabilities and lightweight JavaScript where possible.

Avoid heavy animation libraries unless they provide genuine benefit.

Respect reduced-motion preferences everywhere.

Do not hijack normal scrolling.

## 13. ACCESSIBILITY

Target WCAG 2.2 AA where feasible.

Implement:

- Semantic HTML.
- Screen reader-friendly content.
- Proper heading structure.
- Keyboard-accessible navigation.
- Visible focus indicators.
- Sufficient color contrast.
- Accessible CMS-independent public UI.
- Alt text for images.
- Reduced motion support.
- Proper Polish language metadata (`lang="pl"`).
- Accessible video and 3D controls.

Ensure decorative artwork never obscures important content.

## 14. SEO AND DISCOVERABILITY

Implement:

- Page titles.
- Meta descriptions.
- Canonical URLs.
- Open Graph metadata.
- RSS feed.
- Sitemap.
- robots.txt.
- Article structured data where appropriate.
- Correct Polish metadata.
- Social sharing images where possible.

Exclude drafts from public discovery.

Use consistent clean URLs.

## 15. PERFORMANCE

The blog must remain lightweight despite its experimental visual design.

Requirements:

- Static generation.
- Optimized responsive images.
- Lazy-loaded 3D content.
- Lazy-loaded video.
- Minimal hydration.
- Efficient ASCII rendering.
- Deferred noncritical JavaScript.
- Stable layout.
- Efficient font loading.
- Sensible caching.

Use Lighthouse or equivalent measurements where available.

Report genuine results rather than invented scores.

Large videos should be externally hosted.

Avoid committing unnecessarily large media assets.

Be mindful of GitHub Pages size and bandwidth limits.

## 16. GITHUB PAGES DEPLOYMENT

The blog is a project site, not the account's main user site.

Working repository:

`Blankeuu/blog`

Expected URL:

`https://blankeuu.github.io/blog/`

Configure Astro's `site` and `base` appropriately.

Support future migration to a custom subdomain.

Use GitHub Actions for deployment.

The workflow must:

- Build on commits to the production branch.
- Support manual deployment.
- Install dependencies reproducibly.
- Validate project content.
- Generate the static site.
- Build the Pagefind index.
- Deploy the finished site using supported Pages actions.

Use minimal workflow permissions.

Ensure CMS-created commits also trigger deployment through the supported GitHub event/workflow path.

Do not modify or redeploy the separate portfolio repository.

Do not create or push to a remote repository without appropriate authorization.

## 17. SUGGESTED DIRECTORY STRUCTURE

Use a maintainable structure similar to:

    /
    ├── .github/
    │   └── workflows/
    │       └── deploy.yml
    ├── .pages.yml
    ├── public/
    │   └── media/
    ├── src/
    │   ├── components/
    │   │   ├── ascii/
    │   │   ├── editorial/
    │   │   ├── articles/
    │   │   └── media/
    │   ├── content/
    │   │   └── posts/
    │   ├── layouts/
    │   ├── pages/
    │   │   ├── index.astro
    │   │   ├── wpisy/
    │   │   ├── tag/
    │   │   ├── archiwum/
    │   │   └── o-mnie/
    │   ├── lib/
    │   ├── styles/
    │   └── content.config.ts
    ├── scripts/
    ├── astro.config.mjs
    ├── package.json
    └── README.md

Adjust according to current Astro and Pages CMS conventions.

Do not introduce unnecessary abstractions.

## 18. TESTING

Implement meaningful verification.

At minimum:

- TypeScript checks.
- Production build.
- Content schema validation.
- Draft filtering tests.
- Slug validation.
- Broken internal link checks.
- Search index validation.
- Responsive layout checks.
- Reduced motion checks.
- Basic accessibility checks.
- Media path validation under `/journal/`.
- CMS configuration validation.
- GitHub Pages workflow validation.

Verify that standard articles render correctly.

Verify that multimedia blocks render correctly.

Verify the result of an actual CMS-created test entry where integration access permits.

If CMS login requires the owner's action, clearly document the remaining manual verification step.

Do not claim a CMS integration is fully tested if no end-to-end login or editing test was performed.

## 19. IMPLEMENTATION WORKFLOW

### Phase A — Inspection

Inspect the current repository and environment.

Read relevant project instructions.

Identify existing files and preserve unrelated work.

Confirm framework and CMS compatibility.

### Phase B — Design system

Create the typographic system, color themes, grids, spacing, and foundational components.

Implement the original ASCII art engine.

### Phase C — Homepage

Build the complete poster-inspired homepage.

Polish desktop and mobile compositions.

### Phase D — Content

Implement the article system, archive, tags, search, and multimedia rendering.

### Phase E — CMS

Configure Pages CMS.

Verify file formats, media paths, and publishing behavior.

Document the initial GitHub App connection steps.

### Phase F — Motion and refinement

Add purposeful animation, scroll effects, and responsive interactions.

Improve visual hierarchy, performance, and accessibility.

### Phase G — Build and deployment

Implement GitHub Pages deployment.

Run tests and builds.

Fix discovered issues.

### Phase H — Documentation

Write clear Polish instructions for using the website.

Explain:

- How to start locally.
- How to deploy.
- How to connect Pages CMS.
- How to publish a new article.
- How to upload media.
- How to embed 3D models.
- How draft mode works.
- How to change colors and typography.
- How to change the blog name.
- How to connect a domain.

## 20. DEFINITION OF DONE

The implementation is complete when:

- The experimental homepage is finished.
- The generative ASCII system works.
- The visual design is original and coherent.
- Light and dark themes work automatically.
- Mobile layouts are polished.
- Posts can be created through the CMS.
- Posts can be published through GitHub.
- The archive is functional.
- Tag filtering works.
- Full-text search works.
- Polish content renders correctly.
- Images, code, video, and GLB embeds work.
- Draft content is excluded from the public site.
- Accessibility requirements are addressed.
- GitHub Pages deployment is configured.
- Production build passes.
- Documentation is complete.

Do not stop at a visual prototype.

Do not substitute screenshots for working features.

Do not fabricate published content.

If external authorization is needed, complete everything possible and report the precise remaining steps.

## FINAL DESIGN DIRECTION

This website should feel like an independent experimental digital publication.

It should combine:

**Swiss editorial precision × digital zine aesthetics × generative typography × creative coding.**

The homepage can be radical.

The archive should be expressive.

The articles must be pleasurable to read.

The implementation should be technically reliable and maintainable.

Build something genuinely distinctive rather than a conventional blog with a few decorative effects.

Proceed with implementation in the current project directory.
