import { describe, it, expect } from 'vitest';
import { postSchema } from '../lib/schema';

describe('postSchema', () => {
  const validPost = {
    title: 'Mój pierwszy wpis',
    slug: 'moj-pierwszy-wpis',
    excerpt: 'Krótki opis wpisu testowego',
    date: new Date('2026-10-20T12:00:00'),
    tags: ['elektronika-esp32', 'diy-maker'],
    blocks: [
      {
        type: 'text',
        body: 'Treść akapitu testowego.',
      },
      {
        type: 'code',
        language: 'typescript',
        code: 'const a = 1;',
      },
      {
        type: 'image',
        image: '/images/test.jpg',
        alt: 'Opis obrazka',
      },
      {
        type: 'model',
        file: '/files/model.glb',
        alt: 'Opis modelu 3D',
      },
    ],
  };

  it('akceptuje poprawny obiekt wpisu z blokami multimedialnymi', () => {
    const res = postSchema.safeParse(validPost);
    expect(res.success).toBe(true);
  });

  it('odrzuca wpis bez wymaganego opisu alt dla obrazu', () => {
    const invalid = {
      ...validPost,
      blocks: [
        {
          type: 'image',
          image: '/images/test.jpg',
          alt: '', // pusty alt
        },
      ],
    };
    const res = postSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('odrzuca wpis z nieprawidłowym formatem sluga', () => {
    const invalid = { ...validPost, slug: 'Niepoprawny Slug!' };
    const res = postSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('zezwala na brak opisu coverAlt gdy podano cover (fallback w szablonie do title)', () => {
    const postWithCover = {
      ...validPost,
      cover: '/images/test.jpg',
      coverAlt: '', // brak opisu alt
    };
    const res = postSchema.safeParse(postWithCover);
    expect(res.success).toBe(true);
  });

  it('wymaga dokładnie jednego źródła w bloku wideo', () => {
    const bothSources = {
      ...validPost,
      blocks: [
        {
          type: 'video',
          title: 'Wideo testowe',
          youtube: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
          file: '/files/local.mp4',
        },
      ],
    };
    expect(postSchema.safeParse(bothSources).success).toBe(false);

    const noSources = {
      ...validPost,
      blocks: [
        {
          type: 'video',
          title: 'Wideo testowe',
        },
      ],
    };
    expect(postSchema.safeParse(noSources).success).toBe(false);
  });
});
