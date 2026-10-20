import { createMarkdownProcessor, type MarkdownRenderer } from '@astrojs/markdown-remark';

let rendererPromise: Promise<MarkdownRenderer> | null = null;

/**
 * Renderuje ciąg znaków Markdown do HTML z wykorzystaniem procesora Astro
 * (wspiera GitHub Flavored Markdown, tabele, autolinki, listy zadań).
 */
export async function renderMarkdown(content: string): Promise<string> {
  if (!content || !content.trim()) return '';
  if (!rendererPromise) {
    rendererPromise = createMarkdownProcessor();
  }
  const renderer = await rendererPromise;
  const result = await renderer.render(content);
  return result.code;
}
