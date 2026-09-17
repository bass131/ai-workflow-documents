import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
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
      description: '목표, 판단, 검증의 근거를 남기는 AI 개발 워크플로.',
      defaultLocale: 'root',
      locales: { root: { label: '한국어', lang: 'ko' } },
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
