export const documentNavigation = [
  { label: '시작', items: [
    { label: '홈', link: '/' },
    { label: '전체 흐름', slug: 'workflow/overview' },
  ] },
  { label: '워크플로 가이드', items: [
    { label: '목표와 성공 기준', slug: 'workflow/goals-and-scope' },
    { label: '자율성과 확인이 필요한 결정', slug: 'workflow/autonomy' },
    { label: '단계 기록과 재개', slug: 'workflow/phase-and-resume' },
    { label: 'TDD와 완료 검증', slug: 'workflow/verification' },
  ] },
  { label: '사례 연구', items: [
    { label: 'AgentDeck에서 배운 것', slug: 'experiments/agentdeck' },
  ] },
  { label: '설계와 변화', items: [
    { label: '현재 선택과 재검토 기준', slug: 'design/decisions' },
  ] },
];
