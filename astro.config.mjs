import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightLocales } from './src/data/languages';
import { documentNavigation } from './src/data/navigation';
import { pagesLocation } from './scripts/pages-location.mjs';

const pages = process.env.BUILD_TARGET === 'pages';
const location = pages ? pagesLocation() : { base: '/' };

export default defineConfig({
  ...location,
  output: 'static',
  outDir: pages ? './dist-pages' : './dist',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Moodie’s Agentic Workflow',
      disable404Route: true,
      description: 'An AI development workflow that records goals, decisions, and verification evidence.',
      defaultLocale: 'root',
      locales: starlightLocales,
      favicon: '/favicon.svg',
      customCss: ['./src/styles/theme.css'],
      components: {
        Head: './src/components/DocumentHead.astro',
        Header: './src/components/WorkshopHeader.astro',
        PageFrame: './src/components/WorkshopPageFrame.astro',
        Sidebar: './src/components/WorkshopSidebar.astro',
      },
      sidebar: documentNavigation,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    }),
  ],
});
