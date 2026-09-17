import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
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
        Sidebar: './src/components/WorkshopSidebar.astro',
      },
      sidebar: [
        { label: '시작', items: [
          { label: '홈', link: '/' },
          { label: '전체 흐름', slug: 'workflow/overview' },
        ] },
        { label: '워크플로 가이드', items: [
          { label: '단계 기록과 재개', slug: 'workflow/phase-and-resume' },
          { label: 'TDD와 완료 검증', slug: 'workflow/verification' },
        ] },
        { label: '사례 연구', items: [
          { label: 'AgentDeck에서 배운 것', slug: 'experiments/agentdeck' },
        ] },
        { label: '설계와 변화', items: [
          { label: '현재 선택과 재검토 기준', slug: 'design/decisions' },
        ] },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    }),
  ],
});
