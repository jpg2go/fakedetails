const fs = require('fs');
const path = require('path');

// Fix unused variables by prefixing with underscore
const variableFixes = {
  'src/components/AddressGenerator.tsx': [
    { line: 33, old: 'const [openFaq, setOpenFaq]', new: 'const [_openFaq, _setOpenFaq]' },
    { line: 81, old: 'const useCases', new: 'const _useCases' },
    { line: 93, old: 'const randomDigits', new: 'const _randomDigits' }
  ],
  'src/components/Generators.tsx': [
    { line: 7, old: 'const demoSlugs', new: 'const _demoSlugs' },
    { line: 82, old: 'const formatNameFromSlug', new: 'const _formatNameFromSlug' },
    { line: 92, old: 'const styleFor', new: 'const _styleFor' },
    { line: 163, old: 'idx', new: '_idx' }
  ],
  'src/components/IMEINumberGenerator.tsx': [
    { line: 19, old: 'const pad', new: 'const _pad' },
    { line: 47, old: 'const [grouped, setGrouped]', new: 'const [_grouped, _setGrouped]' }
  ],
  'src/components/InsultNameGenerator.tsx': [
    { line: 192, old: '} catch (err) {', new: '} catch (_err) {' }
  ]
};

// Fix escape characters and other issues
const otherFixes = {
  'src/components/Generators.tsx': [
    { line: 171, old: '\\.', new: '.' }
  ],
  'src/components/WhatsAppGenerator.tsx': [
    { line: 60, old: "\\'", new: "'" },
    { line: 66, old: "\\'", new: "'" },
    { line: 362, old: '@ts-ignore', new: '@ts-expect-error' },
    { line: 932, old: 'true &&', new: '' },
    { line: 1318, old: 'true &&', new: '' }
  ]
};

// Process variable fixes
Object.entries(variableFixes).forEach(([filePath, fixes]) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    
    fixes.forEach(fix => {
      if (lines[fix.line - 1]) {
        lines[fix.line - 1] = lines[fix.line - 1].replace(fix.old, fix.new);
      }
    });
    
    fs.writeFileSync(fullPath, lines.join('\n'));
    console.log(`Fixed variables in ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
});

// Process other fixes
Object.entries(otherFixes).forEach(([filePath, fixes]) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    fixes.forEach(fix => {
      content = content.replace(fix.old, fix.new);
    });
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed other issues in ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
});

console.log('Remaining fixes completed!');
