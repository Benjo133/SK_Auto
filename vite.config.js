import { defineConfig } from 'vite';
import { createMpaPlugin } from 'vite-plugin-virtual-mpa';
import path from 'path';
import fs from 'fs';

const localesDir = path.resolve(__dirname, 'locales');
const languages = ['en', 'dk']; 

const pages = languages.map(lang => {
  const translations = JSON.parse(
    fs.readFileSync(path.join(localesDir, `${lang}.json`), 'utf-8')
  );

  return {
    name: lang,
    filename: `${lang}/index.html`,
    template: 'index.html',
    data: {
      t: translations 
    }
  };
});

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
  },
  base: '/',
});