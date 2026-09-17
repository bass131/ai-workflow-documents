export const documentNavigation = [
  { label: 'Start here', translations: { ko: '시작' }, items: [
    { label: 'Home', translations: { ko: '홈' }, link: '/' },
    { label: 'Workflow overview', translations: { ko: '전체 흐름' }, slug: 'workflow/overview' },
  ] },
  { label: 'Workflow guides', translations: { ko: '워크플로 가이드' }, items: [
    { label: 'Goals and success criteria', translations: { ko: '목표와 성공 기준' }, slug: 'workflow/goals-and-scope' },
    { label: 'Autonomy and decisions to confirm', translations: { ko: '자율성과 확인이 필요한 결정' }, slug: 'workflow/autonomy' },
    { label: 'Phase records and resuming work', translations: { ko: '단계 기록과 재개' }, slug: 'workflow/phase-and-resume' },
    { label: 'TDD and completion checks', translations: { ko: 'TDD와 완료 검증' }, slug: 'workflow/verification' },
  ] },
  { label: 'Case studies', translations: { ko: '사례 연구' }, items: [
    { label: 'Lessons from AgentDeck', translations: { ko: 'AgentDeck에서 배운 것' }, slug: 'experiments/agentdeck' },
  ] },
  { label: 'Design choices', translations: { ko: '설계와 변화' }, items: [
    { label: 'Current choices and when to revisit them', translations: { ko: '현재 선택과 재검토 기준' }, slug: 'design/decisions' },
  ] },
];
