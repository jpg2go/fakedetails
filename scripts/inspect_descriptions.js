const fs = require('fs');
const vm = require('vm');

const src = fs.readFileSync('src/components/Generators.tsx', 'utf8');

function extractBaseDescriptions(text) {
  const start = text.indexOf('const baseDescriptions');
  if (start === -1) return {};
  const braceStart = text.indexOf('{', start);
  let i = braceStart;
  let depth = 0;
  for (; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') {
      depth--;
      if (depth === 0) {
        const objText = text.slice(braceStart, i + 1);
        // Evaluate safely
        const script = new vm.Script('(' + objText + ')');
        return script.runInNewContext();
      }
    }
  }
  return {};
}

function extractTools(text) {
  const arrStart = text.indexOf('const tools = [');
  if (arrStart === -1) return [];
  const start = text.indexOf('[', arrStart);
  let i = start;
  let depth = 0;
  for (; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') {
      depth--;
      if (depth === 0) {
        const arrText = text.slice(start, i + 1);
        // We'll parse keys and features via regex from the original slice to avoid evaluating icons
        const items = [];
        const itemRegex = /\{([\s\S]*?)\}(?=\s*,\s*\{|\s*\])/g;
        let m;
        while ((m = itemRegex.exec(arrText))) {
          const itemText = m[1];
          const keyMatch = /key\s*:\s*'([^']+)'/.exec(itemText);
          const nameMatch = /name\s*:\s*'([^']+)'/.exec(itemText);
          const featuresMatch = /features\s*:\s*\[([^\]]*)\]/.exec(itemText);
          const key = keyMatch ? keyMatch[1] : undefined;
          const name = nameMatch ? nameMatch[1] : undefined;
          const features = featuresMatch ? featuresMatch[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')) .filter(Boolean) : [];
          if (key) items.push({ key, name, features });
        }
        return items;
      }
    }
  }
  return [];
}

const base = extractBaseDescriptions(src);
const tools = extractTools(src);

function formatDescription(tool, idx) {
  const baseDesc = base[tool.key] || tool.name || '';
  let text = baseDesc.replace(/\s+/g, ' ').trim();
  if (!text.endsWith('.')) text = text + '.';
  if (text.length > 100) {
    let cut = text.slice(0, 100);
    const lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > 0) cut = cut.slice(0, lastSpace);
    cut = cut.replace(/[\.,;:\-\s]+$/g, '');
    if (!cut.endsWith('.')) cut = cut + '.';
    const pads = ['Local', 'Export', 'Privacy', 'Fast', 'Reliable', 'Developer'];
    let i = 0;
    while (cut.length < 100) {
      const add = ' ' + pads[(idx + i) % pads.length];
      if (cut.length + add.length > 100) {
        const rem = 100 - cut.length;
        if (rem > 0) cut = cut + '.'.repeat(rem);
      } else {
        cut = cut + add;
      }
      i++;
    }
    return cut;
  }
  const pads = ['Local', 'Export', 'Privacy', 'Fast', 'Reliable', 'Developer'];
  let i = 0;
  while (text.length < 100) {
    const add = ' ' + pads[(idx + i) % pads.length];
    if (text.length + add.length > 100) {
      const rem = 100 - text.length;
      if (rem > 0) text = text + '.'.repeat(rem);
    } else {
      text = text + add;
    }
    i++;
  }
  return text;
}

const results = tools.map((t, i) => ({ key: t.key, name: t.name, desc: formatDescription(t, i), len: formatDescription(t, i).length }));
console.log(JSON.stringify(results, null, 2)); 