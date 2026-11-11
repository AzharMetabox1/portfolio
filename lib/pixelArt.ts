// Procedural 8-Bit Pixel Art Matrices & Coordinate Engines
// Zero external image files required. All graphics are computed directly in code.

export type PixelMatrix = string[];

export interface PixelPoint {
  x: number;
  y: number;
  color: string;
  origX?: number;
  origY?: number;
  vx?: number;
  vy?: number;
}

// Global Color Tokens
export const PIXEL_COLORS = {
  black: '#0E0E0E',
  offWhite: '#F5F5F0',
  lime: '#B8FF01',
  limeDark: '#84CC16',
  gold: '#EAB308',
  cyan: '#38BDF8',
  magenta: '#EC4899',
  orange: '#F97316',
  purple: '#A855F7',
  red: '#EF4444',
  skin: '#F5D0A9',
  skinShadow: '#D8A070',
  hair: '#583618',
  hairDark: '#3A200B',
  hoodie: '#1F2937',
  hoodieShadow: '#111827',
  blueDenim: '#3B82F6',
  brainPink: '#F472B6',
  brainDark: '#DB2777',
  cream: '#FEF3C7',
  grayBorder: '#475569',
};

// ==========================================
// 1. HERO DEVELOPER BUST (Glasses, Brown Hair)
// Matrix 20 cols x 22 rows
// Keys:
// '.' = transparent, 'H' = hair, 'h' = dark hair, 'S' = skin, 's' = skin shadow
// 'G' = glasses frame (cream), 'L' = glasses lens (cyan tint), 'E' = eye pupil
// 'B' = beard/stubble, 'C' = clothes/hoodie (dark slate), 'c' = hoodie collar (lime)
// ==========================================
export const HERO_BUST_PALETTE: Record<string, string> = {
  '.': 'transparent',
  H: '#633B18',
  h: '#3E2108',
  S: '#F5CCA0',
  s: '#D89E6E',
  G: '#F8FAFC', // Crisp glasses frame
  L: '#0284C7', // Lens reflection
  l: '#38BDF8', // Cyan lens glint
  E: '#0E0E0E', // Eye pupil
  B: '#A07048', // Stubble
  C: '#1E293B', // Dark hoodie
  c: '#B8FF01', // Acid lime collar tag
};

export const HERO_BUST_MATRIX: PixelMatrix = [
  ".....HHHHHHHHHH.....",
  "...HHHHHHHHHHHHHH...",
  "..HHHHHHHHHHHHHHHH..",
  ".HHHHHHHHHHHHHHHHHH.",
  ".HHhhhhHHHHHHhhhhHH.",
  "HHHHSSSSSSSSSSSSHHHH",
  "HHHSSSSSSSSSSSSSSHHH",
  "HHSSSSSSSSSSSSSSSSHH",
  "HHSSGGGGSSGGGGSSHH",
  "HHSSGLEESSGLEESSHH",
  "HHSSGllESSGllESSHH",
  "HHSSGGGGSSGGGGSSHH",
  "..SSSSSSSSSSSSSS..",
  "..SSSSSsSSSSsSSS..",
  "..SSSSSSSSSSSSSS..",
  "..SSSSBBBBSBBSSS..",
  "...SSSSSSSSSSSS...",
  "....SSsSSSSsSS....",
  "...CCCCCCCCCCCC...",
  "..CCCCCCCCCCCCCC..",
  ".CCCCCCcccCCCCCC.",
  "CCCCCCCCCCCCCCCCCC",
];

// ==========================================
// 2. PRELOADER ICONS
// Heart, Brackets/Code, Lime Dino
// ==========================================
export const HEART_MATRIX: PixelMatrix = [
  ".RR...RR.",
  "RRRR.RRRR",
  "RRRRRRRRR",
  "RRRRRRRRR",
  ".RRRRRRR.",
  "..RRRRR..",
  "...RRR...",
  "....R....",
];

export const CODE_MATRIX: PixelMatrix = [
  ".WW...WW.",
  "..WW.WW..",
  "...WWW...",
  "..WW.WW..",
  ".WW...WW.",
  ".........",
  ".GGGGGGG.",
];

export const DINO_MATRIX: PixelMatrix = [
  "......LLLLL.",
  ".....LLLELLL",
  ".....LLLLLLL",
  ".....LLLL...",
  ".....LLLLLLL",
  "L...LLLLLL..",
  "LL.LLLLLL...",
  "LLLLLLLL....",
  ".LLLLLLLL...",
  "..LLLLLL....",
  "...LL.LL....",
  "...LL.LL....",
  "...L...L....",
];

// ==========================================
// 3. RPG AVATAR SPRITES (Developer & Creative)
// 16 cols x 26 rows
// ==========================================
export const RPG_DEV_PALETTE: Record<string, string> = {
  '.': 'transparent',
  H: '#583618',
  S: '#F5CCA0',
  G: '#F8FAFC',
  E: '#0E0E0E',
  P: '#B8FF01', // Headphones (Acid lime)
  C: '#18181B', // Dark hoodie
  K: '#27272A', // Dark pants
  W: '#F5F5F0', // Sneakers
};

export const RPG_DEV_MATRIX: PixelMatrix = [
  ".....HHHHHH.....",
  "...HHHHHHHHHH...",
  "..HHHHHHHHHHHH..",
  "..P.SSSSSSSS.P..",
  "..P.SGGSGGSP.P..",
  "....SESSEESS....",
  "....SSSSSSSS....",
  ".....SSSSSS.....",
  "....CCCCCCCC....",
  "...CCCCCCCCCC...",
  "..CCCCCCCCCCCC..",
  "..CC.CCCCCC.CC..",
  "..CC.CCCCCC.CC..",
  "..CC.CCCCCC.CC..",
  "..SS.CCCCCC.SS..",
  ".....CCCCCC.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  "....WW....WW....",
  "....WW....WW....",
];

export const RPG_CREATIVE_PALETTE: Record<string, string> = {
  '.': 'transparent',
  H: '#FBBF24', // Blonde/stylish undercut
  h: '#D97706',
  S: '#F5CCA0',
  G: '#EC4899', // Magenta chic glasses
  E: '#0E0E0E',
  C: '#F8FAFC', // White graphic tee
  L: '#38BDF8', // Cyan graphic chest print
  K: '#2563EB', // Blue denim jeans
  W: '#B8FF01', // Lime sneakers
};

export const RPG_CREATIVE_MATRIX: PixelMatrix = [
  "....HHHHHHHH....",
  "...HHHHHHHHHH...",
  "..hhHHHHHHHHhh..",
  "....SSSSSSSS....",
  "....SGGSGGSS....",
  "....SESSEESS....",
  "....SSSSSSSS....",
  ".....SSSSSS.....",
  "....CCCCCCCC....",
  "...CCCCCCCCCC...",
  "..CC..LLLL..CC..",
  "..CC..LLLL..CC..",
  "..CC.CCCCCC.CC..",
  "..SS.CCCCCC.SS..",
  "..SS.CCCCCC.SS..",
  ".....CCCCCC.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  ".....KK..KK.....",
  "....WW....WW....",
  "....WW....WW....",
];

// ==========================================
// 4. HUMAN HEAD SILHOUETTE & EXPOSED BRAIN
// Matrix: 24 cols x 24 rows
// 'W' = white head silhouette, 'P' = brain pink, 'D' = brain dark, 'L' = lime neural spark
// ==========================================
export const BRAIN_PALETTE: Record<string, string> = {
  '.': 'transparent',
  W: '#F5F5F0', // Head silhouette
  P: '#F472B6', // Pink brain
  D: '#DB2777', // Dark pink folds
  L: '#B8FF01', // Acid lime spark
  l: '#84CC16', // Spark trail
};

export const HEAD_AND_BRAIN_MATRIX: PixelMatrix = [
  ".......WWWWWWWWW........",
  ".....WWWWWWWWWWWWW......",
  "...WWWWPPPPPPPPWWWWW....",
  "..WWWPPPDLPPDPPPDWWWW...",
  ".WWWPPPDPPPLDPPPPWWWW...",
  ".WWWPDDPPPPDDPPDDPWWW...",
  "WWWWPPPDDDPPPDDPPWWWW...",
  "WWWWPPPPPPLLPPPPPWWWW...",
  "WWWWWWWWWWWWWWWWWWWW....",
  "WWWWWWWWWWWWWWWWWWWW....",
  "WWWWWWWWWWWWWWWWWW......",
  "WWWWWWWWWWWWWWWWWW......",
  "WWWWWWWWWWWWWWWWWW......",
  "WWWWWWWWWWWWWWWWWW......",
  "..WWWWWWWWWWWWWW........",
  "..WWWWWWWWWWWW..........",
  "...WWWWWWWWWWWW.........",
  "....WWWWWWWWWWWW........",
  "....WWWWWWWWWWWW........",
  "....WWWWWWWWWWWW........",
  ".....WWWWWWWWWW.........",
  ".....WWWWWWWWWW.........",
];

export const SPLIT_BRAIN_LEFT: PixelMatrix = [
  ".....PPPPP.",
  "...PPPDPPLP",
  "..PPPDDDPPP",
  ".PPPDPPDDPP",
  "PPPPDDPPPPP",
  "PPPDDDPPPDD",
  "PPPPPPLLPPP",
  ".PPPPDPDPP.",
  "..PPDPDDP..",
  "...PPPPP...",
];

export const SPLIT_BRAIN_RIGHT: PixelMatrix = [
  ".PPPPP.....",
  "PLPPDPPPP..",
  "PPPDDDPPP..",
  "PPDDPDPPPP.",
  "PPPPPDDPPPP",
  "DDPPPDDDPPP",
  "PPPLLPPPPPP",
  ".PPDPDPPPP.",
  "..PDDPDPP..",
  "...PPPPP...",
];

// ==========================================
// 5. ACE OF HEARTS PLAYING CARD
// Matrix: 22 cols x 30 rows
// ==========================================
export const CARD_PALETTE: Record<string, string> = {
  '.': 'transparent',
  B: '#0E0E0E', // Thick black border
  W: '#F8FAFC', // White card face
  R: '#EF4444', // Heart red
  r: '#B91C1C', // Dark red shading
};

export const ACE_CARD_MATRIX: PixelMatrix = [
  "BBBBBBBBBBBBBBBBBBBBBB",
  "BWWWWWWWWWWWWWWWWWWWWB",
  "BWRWWWWWWWWWWWWWWWWWWWB",
  "BWRWWWWWWWWWWWWWWWWWWWB",
  "BWRRRWWWWWWWWWWWWWWWWWB",
  "BWRWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWRRRWWWWWWWWWB",
  "BWWWWWWWRRRRRWWWWWWWWB",
  "BWWWWWWRRRRRRRWWWWWWWB",
  "BWWWWWWRRRRRRRWWWWWWWB",
  "BWWWWWWWRRRRRWWWWWWWWB",
  "BWWWWWWWWRRRWWWWWWWWWB",
  "BWWWWWWWWWRWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BWWWWWWWWWWWWWWWWWRWWB",
  "BWWWWWWWWWWWWWWWWWRWWB",
  "BWWWWWWWWWWWWWWWWRRRWB",
  "BWWWWWWWWWWWWWWWWWRWWB",
  "BWWWWWWWWWWWWWWWWWWWWWB",
  "BBBBBBBBBBBBBBBBBBBBBB",
];

// ==========================================
// 6. GIANT PIXEL EYEGLASSES
// 42 cols x 14 rows
// 'C' = Cream frame, 'L' = Lens dark tint, 'G' = Lime reflection, 'W' = Bright white reflection
// ==========================================
export const GLASSES_PALETTE: Record<string, string> = {
  '.': 'transparent',
  C: '#FEF3C7', // Cream frame
  c: '#D97706', // Frame shadow
  L: '#18181B', // Dark lens
  G: '#B8FF01', // Acid lime glint
  W: '#FFFFFF', // Glint shine
};

export const GLASSES_MATRIX: PixelMatrix = [
  "CCCCCCCCCCCCCCCCCC......CCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCC......CCCCCCCCCCCCCCCCCC",
  "CCLLLLLLLLLLLLLLCC......CCLLLLLLLLLLLLLLCC",
  "CCLLLLLLLLLLLLLLCCCCCCCCCCLLLLLLLLLLLLLLCC",
  "CCLLLLLLLLLLLLLLCCCCCCCCCCLLLLLLLLLLLLLLCC",
  "CCLLLLGLLLLLLLLLCC......CCLLLLGLLLLLLLLLCC",
  "CCLLLGWGLLLLLLLLCC......CCLLLGWGLLLLLLLLCC",
  "CCLLLLGLLLLLLLLLCC......CCLLLLGLLLLLLLLLCC",
  "CCLLLLLLLLLLLLLLCC......CCLLLLLLLLLLLLLLCC",
  "CCLLLLLLLLLLLLLLCC......CCLLLLLLLLLLLLLLCC",
  "CCCCCCCCCCCCCCCCCC......CCCCCCCCCCCCCCCCCC",
  "cccccccccccccccccc......cccccccccccccccccc",
];

// ==========================================
// 7. CREATION OF ADAM HANDS
// Left: Lime cybernetic hand reaching right
// Right: Cream organic hand reaching left
// ==========================================
export const HAND_LIME_MATRIX: PixelMatrix = [
  "LL....................",
  "LLLL..................",
  ".LLLLLL...............",
  "..LLLLLLLL............",
  "...LLLLLLLLLL.........",
  "....LLLLLLLLLLLL......",
  ".....LLLLLLLLLLLLLL...",
  "......LLLLLLLLLLLLLLL.",
  ".......LLLLLLLLLLLLLLLL",
  "........LLLLLLLLLLLLLL.",
  ".........LLLLLLLLLL....",
  "..........LLLLLL.......",
  "...........LLL.........",
];

export const HAND_CREAM_MATRIX: PixelMatrix = [
  "....................CC",
  "..................CCCC",
  "...............CCCCCC.",
  "............CCCCCCCC..",
  ".........CCCCCCCCCC...",
  "......CCCCCCCCCCCC....",
  "...CCCCCCCCCCCCCC.....",
  ".CCCCCCCCCCCCCCC......",
  "CCCCCCCCCCCCCCCC.......",
  ".CCCCCCCCCCCCCC........",
  "....CCCCCCCCCC.........",
  ".......CCCCCC..........",
  ".........CCC...........",
];

// Helper: Convert Matrix to Array of Point Coordinates with Colors
export function matrixToPixelList(
  matrix: PixelMatrix,
  palette: Record<string, string>,
  pixelSize: number = 8,
  offsetX: number = 0,
  offsetY: number = 0
): PixelPoint[] {
  const points: PixelPoint[] = [];
  const rows = matrix.length;

  for (let r = 0; r < rows; r++) {
    const rowStr = matrix[r];
    for (let c = 0; c < rowStr.length; c++) {
      const char = rowStr[c];
      const color = palette[char];
      if (color && color !== 'transparent') {
        points.push({
          x: offsetX + c * pixelSize,
          y: offsetY + r * pixelSize,
          origX: offsetX + c * pixelSize,
          origY: offsetY + r * pixelSize,
          color,
        });
      }
    }
  }

  return points;
}

// 3D DNA Double Helix Point Generator
export interface DNANode {
  x: number;
  y: number;
  z: number;
  strand: 1 | 2;
  color: string;
  size: number;
  alpha: number;
}

export function generateDNAFrame(
  rotationAngle: number,
  height: number = 420,
  radius: number = 75,
  steps: number = 32
): { nodes: DNANode[]; rungs: { p1: DNANode; p2: DNANode; color: string }[] } {
  const nodes: DNANode[] = [];
  const rungs: { p1: DNANode; p2: DNANode; color: string }[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const y = (t - 0.5) * height;
    const baseAngle = t * Math.PI * 4 + rotationAngle;

    // Strand 1
    const x1 = Math.sin(baseAngle) * radius;
    const z1 = Math.cos(baseAngle) * radius;

    // Strand 2 (180 deg shifted)
    const x2 = Math.sin(baseAngle + Math.PI) * radius;
    const z2 = Math.cos(baseAngle + Math.PI) * radius;

    // Depth perspective scaling
    const scale1 = (z1 + radius * 1.5) / (radius * 2.5);
    const scale2 = (z2 + radius * 1.5) / (radius * 2.5);

    const node1: DNANode = {
      x: x1,
      y,
      z: z1,
      strand: 1,
      color: z1 > 0 ? '#EF4444' : '#DC2626', // Red/Crimson
      size: Math.max(4, Math.round(7 * scale1)),
      alpha: 0.4 + 0.6 * scale1,
    };

    const node2: DNANode = {
      x: x2,
      y,
      z: z2,
      strand: 2,
      color: z2 > 0 ? '#F472B6' : '#BE185D', // Pink
      size: Math.max(4, Math.round(7 * scale2)),
      alpha: 0.4 + 0.6 * scale2,
    };

    nodes.push(node1, node2);

    // Connecting rungs every 2 steps
    if (i % 2 === 0) {
      rungs.push({
        p1: node1,
        p2: node2,
        color: '#FEF3C7', // Cream pixel bridge
      });
    }
  }

  // Sort nodes by Z for proper 3D depth layering
  nodes.sort((a, b) => a.z - b.z);

  return { nodes, rungs };
}

// 3D Sphere Pixel Earth Generator
export interface GlobePixel {
  lon: number;
  lat: number;
  isLand: boolean;
}

// Procedural World Continent Map approximation on a 28x14 grid
export const GLOBE_MAP_DATA: boolean[][] = [
  // 14 latitudes, 28 longitudes
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false],
  [false,true,true,true,true,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false],
  [false,true,true,true,true,true,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false],
  [false,false,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false],
  [false,false,false,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false],
  [false,false,false,true,true,false,false,false,false,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,true,true,true,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,true,true,true,true,false,false,false,true,true,true,true,false,false,false,false,false,false,false,false,true,true,false,false,false,false],
  [false,false,false,false,true,true,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,true,true,true,true,false,false,false],
  [false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false],
  [false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
];
