import { z } from 'astro/zod';
import { TAG_SLUGS } from '../data/tags.mjs';
import {
  FILE_PREFIX,
  IMAGE_EXTENSIONS,
  IMAGE_PREFIX,
  MODEL_EXTENSIONS,
  SLUG_MAX,
  SLUG_PATTERN,
  VIDEO_EXTENSIONS,
  emptyToUndefined,
  isMediaPath,
  parseYouTubeId,
} from './content-rules.mjs';

/** Opcjonalny tekst: "" / null z Pages CMS → undefined. */
const optionalText = (max = 500) => z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

const imagePath = z
  .string()
  .trim()
  .refine((v) => isMediaPath(v, IMAGE_PREFIX, IMAGE_EXTENSIONS), {
    message: `Obraz musi pochodzić z biblioteki mediów (${IMAGE_PREFIX}…, rozszerzenia: ${IMAGE_EXTENSIONS.join(', ')})`,
  });

const optionalImagePath = z.preprocess(emptyToUndefined, imagePath.optional());

const modelPath = z
  .string()
  .trim()
  .refine((v) => isMediaPath(v, FILE_PREFIX, MODEL_EXTENSIONS), {
    message: `Model 3D musi być plikiem .glb z biblioteki plików (${FILE_PREFIX}…)`,
  });

const videoPath = z
  .string()
  .trim()
  .refine((v) => isMediaPath(v, FILE_PREFIX, VIDEO_EXTENSIONS), {
    message: `Plik wideo musi być .mp4 lub .webm z biblioteki plików (${FILE_PREFIX}…)`,
  });

const width = z.preprocess(emptyToUndefined, z.enum(['tekst', 'szeroki', 'pelny']).default('szeroki'));

export const textBlock = z.object({
  type: z.literal('text'),
  body: z.preprocess((v) => (v == null ? '' : v), z.string()),
});

export const imageBlock = z.object({
  type: z.literal('image'),
  image: imagePath,
  alt: z.string().trim().min(1, 'Opis alternatywny (alt) jest wymagany'),
  caption: optionalText(400),
  width,
});

export const galleryBlock = z.object({
  type: z.literal('gallery'),
  caption: optionalText(400),
  images: z
    .array(
      z.object({
        image: imagePath,
        alt: z.string().trim().min(1, 'Każde zdjęcie w galerii wymaga opisu alt'),
        caption: optionalText(300),
      }),
    )
    .min(1, 'Galeria musi zawierać co najmniej jedno zdjęcie'),
});

export const CODE_LANGUAGES = [
  'text',
  'bash',
  'powershell',
  'c',
  'cpp',
  'python',
  'javascript',
  'typescript',
  'json',
  'yaml',
  'html',
  'css',
  'astro',
  'markdown',
  'ini',
  'toml',
  'diff',
  'sql',
] as const;

export const codeBlock = z.object({
  type: z.literal('code'),
  language: z.preprocess(emptyToUndefined, z.enum(CODE_LANGUAGES).default('text')),
  filename: optionalText(120),
  code: z.preprocess((v) => (v == null ? '' : v), z.string()),
});

export const videoBlock = z
  .object({
    type: z.literal('video'),
    title: z.string().trim().min(1, 'Tytuł wideo jest wymagany (dostępność)'),
    youtube: optionalText(200),
    file: z.preprocess(emptyToUndefined, videoPath.optional()),
    poster: optionalImagePath,
    caption: optionalText(400),
  })
  .superRefine((v, ctx) => {
    const hasYt = Boolean(v.youtube);
    const hasFile = Boolean(v.file);
    if (hasYt === hasFile) {
      ctx.addIssue({ code: 'custom', message: 'Podaj dokładnie jedno źródło: adres YouTube albo plik wideo', path: ['youtube'] });
    }
    if (hasYt && !parseYouTubeId(v.youtube)) {
      ctx.addIssue({ code: 'custom', message: 'Nieprawidłowy adres YouTube', path: ['youtube'] });
    }
  })
  .transform((v) => ({ ...v, youtubeId: v.youtube ? (parseYouTubeId(v.youtube) ?? undefined) : undefined }));

export const modelBlock = z.object({
  type: z.literal('model'),
  file: modelPath,
  alt: z.string().trim().min(1, 'Opis modelu 3D jest wymagany (dostępność)'),
  caption: optionalText(400),
  poster: optionalImagePath,
});

export const block = z.discriminatedUnion('type', [
  textBlock,
  imageBlock,
  galleryBlock,
  codeBlock,
  videoBlock,
  modelBlock,
]);

export const postSchema = z
  .object({
    title: z.string().trim().min(1, 'Tytuł jest wymagany').max(160),
    slug: z
      .string()
      .trim()
      .max(SLUG_MAX)
      .regex(SLUG_PATTERN, 'Slug: tylko małe litery a–z, cyfry i pojedyncze myślniki (np. moj-pierwszy-wpis)'),
    excerpt: z.string().trim().min(1, 'Krótki opis (zajawka) jest wymagany').max(320),
    date: z.coerce.date(),
    updated: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
    draft: z.preprocess((v) => (v == null ? false : v), z.boolean()).default(false),
    featured: z.preprocess((v) => (v == null ? false : v), z.boolean()).default(false),
    tags: z.preprocess((v) => (v == null ? [] : v), z.array(z.enum(TAG_SLUGS as [string, ...string[]]))).default([]),
    cover: optionalImagePath,
    coverAlt: optionalText(300),
    seed: optionalText(64),
    seoDescription: optionalText(200),
    blocks: z.preprocess((v) => (v == null ? [] : v), z.array(block)).default([]),
    /** Ustawiane tylko w danych testowych (src/fixtures). */
    fixture: z.boolean().optional(),
  })
  .superRefine((v, ctx) => {
    // coverAlt jest opcjonalny - przy braku szablony używają fallbacku do post.data.title
    if (v.updated && v.updated < v.date) {
      ctx.addIssue({ code: 'custom', message: 'Data aktualizacji nie może być wcześniejsza niż publikacji', path: ['updated'] });
    }
    if (new Set(v.tags).size !== v.tags.length) {
      ctx.addIssue({ code: 'custom', message: 'Tagi nie mogą się powtarzać', path: ['tags'] });
    }
  });

export type PostData = z.infer<typeof postSchema>;
export type Block = z.infer<typeof block>;
