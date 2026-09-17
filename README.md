# Moodie’s Agentic Workflow

AI 개발의 목표·판단·검증 근거를 기록하는 한국어 포트폴리오와 문서 사이트입니다. 맞춤 홈, 상황 시뮬레이션, 워크플로 가이드, AgentDeck 사례, 설계 변화 기록이 있습니다. 실제 에이전트 실행기는 제안 단계입니다.

## 시작

프로젝트 루트에서 실행합니다. Node 24와 npm을 사용합니다.

```sh
npm ci
npm run dev
```

검색까지 확인하려면 정적 결과를 빌드합니다.

```sh
npm run verify
npm run preview -- --port 4321
```

로컬 주소는 http://127.0.0.1:4321/ 입니다. 개발 서버는 수정 즉시 반영하고, preview는 다시 빌드한 결과를 보여줍니다. Astro 7의 preview는 백그라운드에서 유지됩니다.

```sh
npm run preview -- status
npm run preview -- stop
```

## 스택과 위치

Astro 7.3.3, Starlight 0.42.1, TypeScript, Pagefind 검색을 사용합니다. 정확한 직접 의존성은 [package.json](package.json), 전체 설치 버전은 [package-lock.json](package-lock.json), Node 계열은 [.node-version](.node-version)이 기준입니다. Playwright는 배포 경로의 브라우저 검증용 개발 의존성입니다.

| 위치 | 역할 |
| --- | --- |
| `src/pages/` | 맞춤 홈과 404 |
| `src/content/docs/` | 공개 Markdown/MDX 문서 |
| `src/content/i18n/ko.json` | 한국어 UI 문구 |
| `src/scripts/scenarios.ts` | 홈의 설명용 상황 데이터 |
| `src/styles/` | 공통 테마와 홈 레이아웃 |
| `src/components/`, `src/assets/` | 기본 문서 셸의 외형과 최적화할 목재 이미지 |
| `astro.config.mjs` | 사이드바, 언어, 빌드 설정 |
| `public/` | 그대로 공개되는 favicon·선별 근거 파일 |
| `scripts/` | Pages 경로 계산과 자동 검증 |
| `docs/` | 작성·배포 운영 안내. 사이트로 빌드되지 않음 |

## 문서 추가와 갱신

1. 기존 문서에서 고칠 위치를 찾거나 `src/content/docs/`에 Markdown을 추가합니다.
2. 제목·설명·사이드바·상대 링크를 확인합니다.
3. `npm run verify`를 실행하고 바뀐 화면을 확인합니다.
4. PR에서 검사를 통과한 뒤 기본 브랜치에 병합하면 Pages 배포가 이어집니다.

[문서 작성 가이드](docs/authoring.md)는 문서 구조, 링크·이미지, 문체와 근거 표기 기준을 설명합니다. [배포·갱신 가이드](docs/deployment.md)는 실제 저장소/배포 상태, 하위 경로 검사, 실패 확인과 복구 방법의 기준입니다. 목재 이미지의 출처와 사용 조건은 [자산 기록](docs/asset-credits.md)에 있습니다. 에이전트용 시작점은 [AGENTS.md](AGENTS.md)입니다.

## 검증 명령

| 명령 | 확인 범위 |
| --- | --- |
| `npm test` | Pages 주소·하위 경로·잘못된 설정 |
| `npm run check` | Astro/TypeScript 진단 |
| `npm run verify` | 테스트 + 타입 검사 + 로컬 빌드 + 링크/공개 출력 |
| `npm run build:pages` | 확인된 Pages 주소로 별도 `dist-pages/` 생성 |
| `npm run check:pages` | 배포 하위 경로·자산·검색 색인·공개 출력 |
| `npm run test:pages` | 실제 브라우저의 탐색·검색·테마·모바일 동작 |

Pages 명령에는 `PAGES_URL` 또는 `GITHUB_REPOSITORY`가 필요합니다. 로컬 설정과 브라우저 설치는 배포 가이드를 따릅니다. Pages 빌드는 `dist/`를 건드리지 않아 로컬 preview가 유지됩니다.

## 공개 범위

`src/content/docs`, 홈, `public`의 선별 자료만 웹사이트 콘텐츠입니다. README·AGENTS·docs·VALIDATION은 사이트에 복사되지 않습니다. **저장소가 공개되면 이 운영 문서와 소스도 공개됩니다.** 비밀키·개인 경로·대화 원문·비공개 자료를 커밋하지 않습니다. `package.json`의 `private: true`는 npm 패키지 게시 방지 설정이며 GitHub 저장소 공개 여부와 별개입니다.

과거 검증과 한계는 [VALIDATION.md](VALIDATION.md)에 날짜별로 남깁니다. AgentDeck 근거는 이전 평가의 선별 발췌이며 새 실험이나 모델 비교 결과가 아닙니다.
