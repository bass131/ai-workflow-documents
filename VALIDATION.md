# 로컬 프로토타입 검증

검증일: 2026-09-17

- 범위: 최초 로컬 프로토타입
- URL: http://127.0.0.1:4321/
- Astro preview 백그라운드 PID: 27228 (검증 당시)
- 설치 버전: Astro 7.3.3, Starlight 0.42.1
- npm package-lock.json 포함

## 실행한 검사

- npm run check: 0 errors / 0 warnings / 0 hints
- npm run build: 정적 페이지 6개(홈, 문서 4개, 404), Pagefind 색인 생성 성공
- Headless Chromium / Playwright: 상황 4종과 키보드 Enter 활성화
- 홈과 문서 간 밝은/어두운 테마 유지
- Ctrl+K 검색 열기, 한국어 “재개” 검색 결과, Escape 닫기
- 주요 페이지 5개, 내부 링크와 앵커 33개 확인
- 390px 모바일: 상황 선택, 문서 메뉴 열기와 페이지 이동
- 320px 홈/문서: 가로 페이지 넘침 없음
- 1280px에서 루트 글자 크기 200%: 가로 페이지 넘침 없음
- 사용자 정의 404 응답과 복구 링크 확인
- 브라우저 JavaScript 오류 및 실패한 자산 응답 없음

스크린샷으로 데스크톱의 밝은/어두운 화면, 모바일 홈과 문서, 한국어 검색 결과를 확인했습니다. 사용자용 새 브라우저 창은 열지 않았습니다. 실제 모바일 기기나 화면 읽기 프로그램 검증은 하지 않았습니다.

## 알려진 범위

- 로컬 전용이므로 공개 site 주소를 설정하지 않았습니다. 빌드의 사이트맵 생략 안내는 의도한 로컬 구성의 결과입니다.
- GitHub Pages 배포나 하위 경로 배포는 아직 하지 않았습니다. 저장소 주소를 정한 뒤 site/base 설정과 실제 배포 경로를 확인해야 합니다.
- 인터랙션은 정적 설명 시뮬레이션입니다. 실제 AI 호출·실행기·테스트 텔레메트리는 없습니다.
- AgentDeck 실험은 기존 보고서의 선택된 측정 발췌이며 새 실험이 아닙니다.

## 미리보기 관리

프로젝트 폴더에서 다음 명령을 사용합니다.

```powershell
npm run preview -- status
npm run preview -- stop
npm run build
npm run preview -- --port 4321
```

## 2026-09-17 · 구조·init·Pages·목재 테마

최초 프로토타입 기록과 구별되는 후속 검증입니다.

- 사이트명: GitHub 공개 프로필에서 Moodie 확인, Moodie’s Agentic Workflow로 반영.
- 로컬 main Git 저장소 초기화, 작성/배포 가이드와 AGENTS.md 추가.
- Pages 주소 설정 검사 7개: 하위 경로/계정 루트/명시 URL/잘못된 설정. 기존 루트 경로 동작에서 기대 실패를 확인하고 구현 후 통과.
- npm run verify: 설정 테스트 7개, Astro 0 errors/warnings/hints, 로컬 빌드와 217개 내부 참조·공개 출력 검사 통과.
- Pages 대상 경로 /moodies-agentic-workflow/: 7 HTML(홈+문서5+404), 223개 내부 참조, 한국어 검색 색인, 선별 공개 출력 검사 통과.
- headless Chromium: Pages 하위 경로의 검색 결과 클릭, 상황4종/키보드, 테마 유지, light/dark 모바일 검색과 문서, 자동 테마, 320px 화면, 404 확인.
- 변경한 밝음/어두움 홈·문서·모바일·검색 스크린샷 시각 확인.
- actionlint 1.7.12: site.yml 문법/표현식 검사 통과.
- 아직 GitHub Actions를 실행하거나 사이트를 공개 배포한 결과는 아님. 실제 모바일 기기와 스크린리더 검증도 하지 않음.
