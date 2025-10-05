const fs = require('fs');
const path = require('path');

// Fix the remaining specific issues
const fixes = [
  {
    file: 'src/components/Generators.tsx',
    replacements: [
      { old: 'function formatNameFromSlug', new: 'function _formatNameFromSlug' },
      { old: 'function styleFor', new: 'function _styleFor' }
    ]
  },
  {
    file: 'src/components/WhatsAppGenerator.tsx',
    replacements: [
      { old: '// @ts-expect-error', new: '// @ts-expect-error MediaRecorder type checking for browser compatibility' },
      { old: '&& false &&', new: '&&' },
      { old: '{false &&', new: '{(' }
    ]
  }
];

fixes.forEach(fix => {
  try {
    const fullPath = path.join(process.cwd(), fix.file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    fix.replacements.forEach(replacement => {
      content = content.replace(replacement.old, replacement.new);
    });
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${fix.file}`);
  } catch (error) {
    console.error(`Error fixing ${fix.file}:`, error.message);
  }
});

console.log('Final fixes completed!');
