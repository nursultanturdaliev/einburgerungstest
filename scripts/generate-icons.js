// Simple script to generate icons from SVG
// This creates placeholder icons - replace with actual design later

const fs = require('fs');
const path = require('path');

// Create simple colored squares as placeholder icons
// In production, replace these with actual designed icons

const createIcon = (size, filename) => {
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- German flag colors -->
  <rect width="${size}" height="${size/3}" fill="#000000"/>
  <rect y="${size/3}" width="${size}" height="${size/3}" fill="#DD0000"/>
  <rect y="${size*2/3}" width="${size}" height="${size/3}" fill="#FFCE00"/>
  <!-- Question mark overlay -->
  <text x="${size/2}" y="${size/2 + size/12}" font-family="Arial, sans-serif" font-size="${size/3}" font-weight="bold" text-anchor="middle" fill="#FFFFFF" opacity="0.8">?</text>
</svg>`;
  
  fs.writeFileSync(path.join(__dirname, '..', 'public', filename), svg);
  console.log(`Created ${filename} (${size}x${size})`);
};

// Generate icons
createIcon(192, 'icon-192.png');
createIcon(512, 'icon-512.png');

console.log('\nIcons generated! Note: These are SVG files saved as .png');
console.log('For production, replace with actual PNG icons designed by a designer.');

