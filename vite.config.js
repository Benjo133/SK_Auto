import { defineConfig } from 'vite';
import { createMpaPlugin } from 'vite-plugin-virtual-mpa';
import path from 'path';
import fs from 'fs';

const localesDir = path.resolve(__dirname, 'locales');
const languages = ['en', 'dk'];

console.log('📁 Project root:', __dirname);
console.log('📁 Locales directory:', localesDir);

// Check if index.html exists in root
const templatePath = path.resolve(__dirname, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('❌ index.html not found in root!');
  process.exit(1);
} else {
  console.log('✅ Found index.html template');
}

// Check locales
languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${lang}.json not found at:`, filePath);
    process.exit(1);
  } else {
    console.log(`✅ Found ${lang}.json`);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      JSON.parse(content); // Validate JSON
      console.log(`  ✅ ${lang}.json is valid`);
    } catch (e) {
      console.error(`  ❌ ${lang}.json is invalid:`, e.message);
      process.exit(1);
    }
  }
});

const pages = languages.map(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const t = (key) => {
    return translations[key] || key;
  };

  return {
    name: lang,
    filename: `${lang}/index.html`,
    template: 'index.html',
    data: { t }
  };
});

console.log('\n📋 Generated pages:', pages.map(p => p.filename).join(', '));

export default defineConfig({
  plugins: [
    createMpaPlugin({
      pages: pages,
      engine: "ejs"
    })
  ],
  server: {
    open: '/dk/',
    proxy: {
      '^/$': {
        target: 'http://localhost:5173',
        rewrite: () => '/dk/',
      },
    },
    // Add this to handle the routes
    historyApiFallback: {
      rewrites: [
        { from: /^\/dk\/.*$/, to: '/dk/index.html' },
        { from: /^\/en\/.*$/, to: '/en/index.html' },
      ],
    },
  },
  build: {
    rollupOptions: {
      input: {
        dk: path.resolve(__dirname, 'index.html'),
        en: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  base: '/',
});