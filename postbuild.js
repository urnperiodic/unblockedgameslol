import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const distAssetsDir = path.join(distDir, 'assets');
const targetAssetsDir = path.resolve('assets');

// Copy dist/assets to ./assets for production static serving if needed
if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(targetAssetsDir)) {
    fs.mkdirSync(targetAssetsDir, { recursive: true });
  }
  const files = fs.readdirSync(distAssetsDir);
  for (const file of files) {
    fs.copyFileSync(
      path.join(distAssetsDir, file),
      path.join(targetAssetsDir, file)
    );
  }
  console.log('Postbuild asset synchronization complete.');
}
