/**
 * Generatywny silnik ASCII dla Szymon Potyra / Journal (Blankeu).
 * Inspirowany plakatem riso/breakcore: znaki M, @, Z, J, 0, /, %, #, :, .
 * Działa w 100% deterministycznie na serwerze (SSR/SSG) i opcjonalnie animuje się w przeglądarce.
 */

export type AsciiPatternStyle = 'poster-hero' | 'contour-mesh' | 'dither-cluster' | 'breakcore-strata' | 'thumbnail' | 'glitch';

export interface AsciiOptions {
  seed?: string;
  cols?: number;
  rows?: number;
  style?: AsciiPatternStyle;
  time?: number;
  pointerX?: number; // 0..1
  pointerY?: number; // 0..1
  intensity?: number;
}

// Rampa gęstości znaków oparta bezpośrednio na plakacie referencyjnym
const CHAR_RAMP = [' ', '.', ':', '/', 'r', 'c', 'd', 'z', 'Z', 'J', '0', '%', '#', 'Q', 'M', '@'];

export function createPRNG(seedString: string = 'blankeu') {
  let h = 1779033703 ^ seedString.length;
  for (let i = 0; i < seedString.length; i++) {
    h = Math.imul(h ^ seedString.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function next(): number {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Prosty, szybki i deterministyczny szum 2D
function smoothNoise(x: number, y: number, seedNum: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seedNum * 43758.5453) * 43758.5453;
  return n - Math.floor(n);
}

function valueNoise2D(x: number, y: number, seedNum: number): number {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;

  // Cubic Hermite curve
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);

  const a = smoothNoise(i, j, seedNum);
  const b = smoothNoise(i + 1, j, seedNum);
  const c = smoothNoise(i, j + 1, seedNum);
  const d = smoothNoise(i + 1, j + 1, seedNum);

  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

function fbm(x: number, y: number, seedNum: number, octaves: number = 3): number {
  let total = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let maxVal = 0;

  for (let i = 0; i < octaves; i++) {
    total += valueNoise2D(x * frequency, y * frequency, seedNum + i * 17.13) * amplitude;
    maxVal += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return total / maxVal;
}

/**
 * Generuje siatkę znaków ASCII.
 */
export function generateAsciiGrid(opts: AsciiOptions = {}): string[] {
  const seed = opts.seed || 'blankeu';
  const cols = Math.max(10, opts.cols || 64);
  const rows = Math.max(5, opts.rows || 24);
  const style = opts.style || 'poster-hero';
  const time = opts.time || 0;
  const px = opts.pointerX ?? -1;
  const py = opts.pointerY ?? -1;
  const intensity = opts.intensity ?? 1;

  const rng = createPRNG(seed);
  const seedNum = rng() * 1000;

  const lines: string[] = [];
  const rampLen = CHAR_RAMP.length;

  for (let y = 0; y < rows; y++) {
    let rowChars = '';
    const ny = y / rows; // 0..1

    // Breakcore glitch shift dla niektórych linii
    let rowShift = 0;
    if (style === 'breakcore-strata' || style === 'poster-hero') {
      const sliceCheck = Math.sin(y * 1.8 + seedNum);
      if (sliceCheck > 0.82) {
        rowShift = (Math.sin(y * 5 + time) * 0.12 * intensity);
      }
    }

    for (let x = 0; x < cols; x++) {
      let nx = x / cols + rowShift; // 0..1

      // Interakcja ze wskaźnikiem myszy (subtelne zakłócenie)
      if (px >= 0 && py >= 0) {
        const dx = nx - px;
        const dy = ny - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.28) {
          const repel = (1 - dist / 0.28) * 0.08 * intensity;
          nx += (dx / (dist || 0.001)) * repel;
        }
      }

      let val = 0;

      switch (style) {
        case 'poster-hero': {
          // Asymetryczna kompozycja: pionowa kolumna fal, rozpadające się pikselowe kafle po bokach
          const wave = Math.sin(nx * 14 + ny * 6 + Math.cos(ny * 8 + time * 0.4)) * 0.5 + 0.5;
          const noise = fbm(nx * 3.5, ny * 2.8 + time * 0.05, seedNum, 3);
          // Ograniczenie asymetryczne - gęstsze po prawej stronie i w centrum
          const centerBias = Math.exp(-Math.pow((nx - 0.55), 2) / 0.12);
          const strata = (Math.sin(ny * 25 + time * 0.2) > 0.75) ? 0.25 : 0;
          val = (wave * 0.45 + noise * 0.45 + strata) * (0.3 + centerBias * 0.85);

          // Halftone clusters na brzegach (jak w plakacie)
          if ((nx < 0.18 && ny < 0.35) || (nx > 0.82 && ny > 0.65)) {
            const dither = (Math.floor(x / 2) % 2 === 0 && Math.floor(y / 2) % 2 === 0) ? 0.6 : 0.05;
            val = Math.max(val, dither);
          }
          break;
        }

        case 'contour-mesh': {
          // Topograficzne linie poziomicowe i fale
          const c1 = Math.sin(nx * 12 + ny * 8 + time * 0.3);
          const c2 = Math.cos(nx * 8 - ny * 10 + time * 0.2);
          const raw = (c1 + c2) * 0.5;
          // Zmiana w ostre pasy poziomicowe
          val = Math.pow(Math.sin(raw * 5), 2);
          break;
        }

        case 'dither-cluster': {
          // Siatka pikselowych klastrów
          const baseNoise = fbm(nx * 6, ny * 6 + time * 0.1, seedNum, 2);
          const gridPattern = ((x % 3 === 0) ? 0.3 : 0) + ((y % 2 === 0) ? 0.2 : 0);
          val = baseNoise * 0.7 + gridPattern * 0.3;
          break;
        }

        case 'glitch':
        case 'breakcore-strata': {
          // Ostre, rytmiczne, poszatkowane warstwy
          const band = Math.floor(ny * 16);
          const bandPhase = Math.sin(band * 3.7 + seedNum);
          const wave = Math.sin(nx * (8 + bandPhase * 4) + time * (bandPhase > 0 ? 0.5 : -0.5));
          val = (wave > 0 ? 0.75 : 0.1) * (0.5 + Math.sin(ny * 20) * 0.5);
          break;
        }

        case 'thumbnail':
        default: {
          // Kompaktowy, wyrazisty motyw dla karty wpisu
          const dist = Math.sqrt(Math.pow(nx - 0.5, 2) + Math.pow(ny - 0.5, 2));
          const ring = Math.sin(dist * 18 - time * 0.3) * 0.5 + 0.5;
          const noise = valueNoise2D(nx * 4, ny * 4, seedNum);
          val = (ring * 0.6 + noise * 0.4) * Math.max(0, 1 - dist * 1.5);
          break;
        }
      }

      // Normalizacja do zakresu rampy
      val = Math.max(0, Math.min(1, val));
      const charIndex = Math.floor(val * (rampLen - 1));
      rowChars += CHAR_RAMP[charIndex];
    }

    lines.push(rowChars);
  }

  return lines;
}
