const fs = require('fs');
const path = require('path');

const devHtmlPath = path.join(__dirname, 'dist/dev.html');
if (!fs.existsSync(devHtmlPath)) {
  console.warn('dev.html not found, skipping...');
  // Don't throw an error, continue with other operations
} else {
  // Process dev.html as needed
}
