import { describe, it, expect } from 'vitest';
import { generateAsciiGrid, createPRNG, type AsciiPatternStyle } from '../components/ascii/engine';

describe('Ascii Engine', () => {
  it('jest w 100% deterministyczny dla tego samego ziarna', () => {
    const run1 = generateAsciiGrid({ seed: 'test-seed-42', cols: 40, rows: 15 });
    const run2 = generateAsciiGrid({ seed: 'test-seed-42', cols: 40, rows: 15 });
    expect(run1).toEqual(run2);
  });

  it('generuje odmienne rezultaty dla różnych ziaren', () => {
    const runA = generateAsciiGrid({ seed: 'ziarno-alfa', cols: 40, rows: 15 });
    const runB = generateAsciiGrid({ seed: 'ziarno-beta', cols: 40, rows: 15 });
    expect(runA).not.toEqual(runB);
  });

  it('utrzymuje żądane wymiary siatki znaków', () => {
    const cols = 48;
    const rows = 16;
    const grid = generateAsciiGrid({ cols, rows });
    expect(grid.length).toBe(rows);
    for (const line of grid) {
      expect(line.length).toBe(cols);
    }
  });

  const styles: AsciiPatternStyle[] = [
    'poster-hero',
    'contour-mesh',
    'dither-cluster',
    'breakcore-strata',
    'thumbnail',
  ];

  for (const style of styles) {
    it(`poprawnie generuje styl: ${style}`, () => {
      const grid = generateAsciiGrid({ style, cols: 32, rows: 10 });
      expect(grid.length).toBe(10);
      expect(grid[0].length).toBe(32);
    });
  }

  it('PRNG generuje wartości w przedziale [0, 1)', () => {
    const rng = createPRNG('test');
    for (let i = 0; i < 50; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });
});
