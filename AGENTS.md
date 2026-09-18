# Moodie’s Agentic Workflow

영어·한국어 개발 포트폴리오와 목표 기반 AI 워크플로 문서다. 현재 사이트와 상황 시뮬레이션은 구현되어 있지만 실제 에이전트 실행기는 제안 단계다.

## 먼저 볼 곳

- 사람용 시작 안내와 명령: [README.md](README.md)
- 문서 위치·메타데이터·문체·근거: [docs/authoring.md](docs/authoring.md)
- 실제 배포 대상/상태와 갱신·복구: [docs/deployment.md](docs/deployment.md)
- 당시 검증 기록: [VALIDATION.md](VALIDATION.md)

스택은 Astro + Starlight + TypeScript, npm이다. 정확한 버전은 package.json / package-lock.json, 실행 Node 계열은 .node-version에 있다. 홈은 src/components/WorkshopHome.astro, 문서는 src/content/docs, 공유 문서 목록은 src/data/navigation.ts, Starlight 설정은 astro.config.mjs, 공개 파일은 public, 검증 도구는 scripts에 있다.

시각 방향은 목재·종이 색의 미니멀한 작업실이다. 밝음·어두움·자동 테마를 유지하며 공통 색상은 src/styles/theme.css에 모은다. 세부 기준은 작성 가이드에 있다.

## 문서의 가독성

사람과 AI가 모두 읽기 좋은 문서를 목표로 한다. 핵심을 먼저 짧게 보여주고, 개념·방법·관계·순서는 도해와 흐름도, 비교는 표, 구체적인 상황은 예시로 설명한다. 중요한 정보는 이미지에만 넣지 않고 제목·본문·표·대체 텍스트에서도 읽을 수 있게 하며 그림과 글의 의미를 일치시킨다. 추가 배경은 접을 수 있게 하되 중요한 조건과 한계는 바로 보이게 둔다. 도움이 되는 사진·스크린샷·AI 생성 삽화를 활용하고, 출처와 실제/가상 여부를 표시한다. 원문의 의도와 확실성은 보존한다. 형식이나 이미지를 억지로 채우지 않으며 세부 기준은 [문서 작성 가이드](docs/authoring.md#읽기-쉬운-구성)를 따른다.

## 수정과 검증

프로젝트 루트에서 npm ci, npm run dev를 사용한다. 검색은 npm run build 뒤 npm run preview에서 확인한다. npm run verify는 설정 테스트·타입 검사·로컬 빌드·링크/공개 출력 검사다. Pages 변경은 배포 가이드대로 build:pages, check:pages, test:pages도 실행한다. 브라우저 설치 방법도 그 가이드에 있다.

변경한 동작에 맞는 실패 사례를 확인하고 구현한 뒤 관련 검사를 최종 코드에 적용한다. 문서·주석만 고칠 때 인위적인 RED를 만들지 않는다. 홈의 시뮬레이션·검색·테마·모바일 메뉴를 바꿨다면 실제 브라우저 동작을 확인한다.

## 지킬 경계

- 기존 사용자 변경을 보존하고 현재 Git 상태/원격을 확인한다. 다른 저장소나 Notion을 이 작업 범위에 포함하지 않는다.
- 구현됨·측정됨·제안을 구분한다. 가상 예시는 표시하고, 새 실험 없이 과거 수치를 현재 성과로 바꾸지 않는다.
- 1–7단계는 필요에 따른 상한이다. 팀·모델·세션 수나 승인 절차를 고정하지 않는다.
- 작은 가역적 선택은 이유를 남기고 진행한다. 위임 밖의 중요한 결정만 확인하며 관련 없는 작업은 계속한다.
- 비밀키, 개인 경로, 대화 원문, 비공개 원본 자료를 사이트 출력에 넣지 않는다. public은 그대로 배포된다. 저장소가 공개되면 운영 문서도 공개 소스가 된다.
- 배포는 GitHub Pages를 사용한다. 로컬 검증 완료, Actions 실행, 공개 사이트 배포 성공을 구별해 보고한다.
