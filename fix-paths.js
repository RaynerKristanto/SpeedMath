const fs = require('fs');
const path = require('path');

// Read the index.html file
const indexPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Replace absolute paths with relative paths
html = html.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');
html = html.replace(/src="\/_expo\//g, 'src="./_expo/');

// Write the fixed HTML back
fs.writeFileSync(indexPath, html, 'utf8');

// Create .nojekyll file to prevent GitHub Pages from using Jekyll
const nojekyllPath = path.join(__dirname, 'dist', '.nojekyll');
fs.writeFileSync(nojekyllPath, '', 'utf8');

console.log('✓ Fixed paths in index.html for GitHub Pages subdirectory deployment');
console.log('✓ Created .nojekyll file to disable Jekyll processing');
