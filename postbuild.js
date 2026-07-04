import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const rootDir = path.resolve('.');

// 1. Copy dist/dev.html to ./index.html
const compiledHtmlPath = path.join(distDir, 'dev.html');
const targetHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(compiledHtmlPath)) {
  fs.copyFileSync(compiledHtmlPath, targetHtmlPath);
  console.log('Copied dist/dev.html to ./index.html');
} else {
  console.error('Error: dist/dev.html not found!');
}

// 2. Copy dist/assets to ./assets
const distAssetsDir = path.join(distDir, 'assets');
const targetAssetsDir = path.join(rootDir, 'assets');

if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(targetAssetsDir)) {
    fs.mkdirSync(targetAssetsDir, { recursive: true });
  }
  const files = fs.readdirSync(distAssetsDir);
  // Clear old files in assets folder first
  const existingFiles = fs.readdirSync(targetAssetsDir);
  for (const file of existingFiles) {
    if (fs.statSync(path.join(targetAssetsDir, file)).isFile()) {
      fs.unlinkSync(path.join(targetAssetsDir, file));
    }
  }
  
  for (const file of files) {
    fs.copyFileSync(
      path.join(distAssetsDir, file),
      path.join(targetAssetsDir, file)
    );
  }
  console.log('Copied dist/assets/ to ./assets/');
} else {
  console.log('No assets folder found in dist.');
}
