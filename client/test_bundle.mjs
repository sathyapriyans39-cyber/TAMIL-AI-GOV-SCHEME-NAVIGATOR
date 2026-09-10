import fs from 'fs';

try {
  const html = fs.readFileSync('./dist/index.html', 'utf8');
  console.log('HTML loaded:', html.slice(0, 100));
} catch (e) {
  console.error('Error:', e);
}
