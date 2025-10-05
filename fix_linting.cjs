const fs = require('fs');
const path = require('path');

// Files and their unused imports to remove
const fixes = {
  'src/components/AlienNameGenerator.tsx': ['Mail'],
  'src/components/BibleVerseGenerator.tsx': ['Code', 'Mail', 'Star', 'Gamepad2', 'Briefcase', 'Building2', 'MessageCircle', 'Music2', 'Smile'],
  'src/components/DjNameGenerator.tsx': ['Code', 'Mail', 'Globe'],
  'src/components/DwarfNameGenerator.tsx': ['Mail', 'Globe'],
  'src/components/FakeCompanyGenerator.tsx': ['Code', 'Mail', 'Globe', 'User'],
  'src/components/FakeMailGenerator.tsx': ['Code', 'Palette', 'Gamepad2', 'Building2'],
  'src/components/FakeNameGenerator.tsx': ['Code', 'Mail', 'Star'],
  'src/components/FakePhoneNumberGenerator.tsx': ['Code', 'Palette', 'Mail', 'Star', 'Sparkles', 'AtSign', 'Building2', 'MessageCircle', 'Music2', 'Smile'],
  'src/components/Generators.tsx': ['Globe', 'Shield'],
  'src/components/GodNameGenerator.tsx': ['Mail', 'Code'],
  'src/components/Home.tsx': ['Mail', 'CreditCard', 'Download', 'Lock'],
  'src/components/HorseNameGenerator.tsx': ['Mail', 'Globe'],
  'src/components/IMEINumberGenerator.tsx': ['Code', 'TestTube2', 'Palette', 'Mail', 'Star', 'Globe', 'Building2', 'MessageCircle', 'Music2', 'Smile'],
  'src/components/InsultNameGenerator.tsx': ['Code', 'Mail', 'Globe', 'Briefcase', 'Hash', 'AtSign', 'Building2', 'MessageCircle', 'Music2'],
  'src/components/NicknameGenerator.tsx': ['Code', 'Mail', 'Building2'],
  'src/components/OrcNameGenerator.tsx': ['Code', 'Mail'],
  'src/components/PasswordGenerator.tsx': ['Code', 'TestTube2', 'Mail', 'Star', 'Globe', 'AtSign', 'Building2', 'MessageCircle', 'Music2', 'Smile', 'User'],
  'src/components/PersonalityGenerator.tsx': ['TestTube2', 'Mail', 'Star', 'Globe', 'Gamepad2', 'Building2', 'MessageCircle', 'Music2'],
  'src/components/PlanetNameGenerator.tsx': ['Mail'],
  'src/components/RandomNameGenerator.tsx': ['Mail'],
  'src/components/UsernameGenerator.tsx': ['Mail'],
  'src/components/WarriorCatNameGenerator.tsx': ['Mail', 'Globe'],
  'src/components/WhatsAppGenerator.tsx': ['Star', 'Globe', 'Mail'],
  'src/components/WowNameGenerator.tsx': ['Mail', 'Globe']
};

// Process each file
Object.entries(fixes).forEach(([filePath, unusedImports]) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove unused imports
    unusedImports.forEach(importName => {
      const regex = new RegExp(`\\s*${importName},?\\s*`, 'g');
      content = content.replace(regex, '');
    });
    
    // Clean up any double commas or trailing commas
    content = content.replace(/,\s*,/g, ',');
    content = content.replace(/,\s*}/g, '}');
    content = content.replace(/{\s*,/g, '{');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
});

console.log('Import fixes completed!');
