import fs from 'fs';
import path from 'path';

// Copies the compiled dist/ directory to build/ for compatibility with
// Hostinger presets that expect 'build/' instead of 'dist/'
const distDir = path.resolve('dist');
const buildDir = path.resolve('build');

try {
  if (fs.existsSync(distDir)) {
    // 1. Mirror to build/
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true });
    }
    fs.cpSync(distDir, buildDir, { recursive: true });
    console.log('✓ Build output mirrored to build/ for Hostinger compatibility.');

    // 2. Copy assets to root assets/ so both /assets and /dist/assets work seamlessly
    const distAssets = path.join(distDir, 'assets');
    const rootAssets = path.resolve('assets');
    if (fs.existsSync(distAssets)) {
      if (!fs.existsSync(rootAssets)) {
        fs.mkdirSync(rootAssets, { recursive: true });
      }
      fs.cpSync(distAssets, rootAssets, { recursive: true });
      console.log('✓ Assets synchronized to root assets/ directory for direct web serving.');
    }
  }
} catch (err) {
  console.warn('Warning: Could not mirror build directory:', err.message);
}
