const fs = require('fs');
const jsContent = fs.readFileSync('script.js', 'utf8');
const htmlContent = fs.readFileSync('index.html', 'utf8');

const regex = /document\.getElementById\('([^']+)'\)/g;
let match;
const expectedIds = new Set();
while ((match = regex.exec(jsContent)) !== null) {
  expectedIds.add(match[1]);
}

const missingIds = [];
for (const id of expectedIds) {
  if (!htmlContent.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
}

console.log("Missing IDs:", missingIds);
