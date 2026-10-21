// Writes src/data/themes.json, the themes the landing page shows, from
// shellwing's own theme files. Run from landing/ with the path to a shellwing
// checkout: node scripts/themes.mjs ../../shellwing
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Those the page's swatches offer, in this order: the default first.
const PICKED = [
  'dusk',
  'neon-nebula',
  'sakura-night',
  'sunset-glow',
  'matrix-rain',
  'aurora-borealis',
  'tokyo-night',
  'dracula',
  'catppuccin',
  'nord',
  'gruvbox-dark',
  'dawn',
];

const checkout = process.argv[2];
if (!checkout) {
  console.error('usage: node scripts/themes.mjs <path to shellwing>');
  process.exit(1);
}
const dir = join(checkout, 'crates/config/themes');

// The theme files are flat TOML: a string a line, the gradient an inline
// table, the palette an array over several lines.
function parse(text) {
  const str = (key) => text.match(new RegExp(`^${key} = "([^"]*)"`, 'm'))?.[1];
  const gradient = text.match(
    /^gradient = \{ angle = (\d+), stops = \[([^\]]*)\] \}/m
  );
  const palette =
    text.match(/^palette = \[([^\]]*)\]/m)?.[1].match(/#[0-9a-fA-F]{6}/g) ?? [];
  return {
    name: str('name'),
    group: str('group'),
    accent: str('accent'),
    background: str('background'),
    foreground: str('foreground'),
    cursor: str('cursor'),
    gradient: gradient
      ? `linear-gradient(${gradient[1]}deg, ${gradient[2]
          .match(/"([^"]*)"/g)
          .map((s) => s.slice(1, -1))
          .join(', ')})`
      : null,
    palette,
  };
}

const themes = PICKED.map((id) => ({
  id,
  ...parse(readFileSync(join(dir, `${id}.toml`), 'utf8')),
}));
const total = readdirSync(dir).filter((f) => f.endsWith('.toml')).length;
const gradients = readdirSync(dir).filter(
  (f) =>
    f.endsWith('.toml') &&
    /^gradient = /m.test(readFileSync(join(dir, f), 'utf8'))
).length;

writeFileSync(
  'src/data/themes.json',
  JSON.stringify({ total, gradients, themes }, null, 2) + '\n'
);
console.log(
  `src/data/themes.json: ${themes.length} of ${total} themes (${gradients} gradient)`
);
