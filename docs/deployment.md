# GitHub Pages 배포와 갱신

## 현재 대상과 상태

- 인증 확인 계정: `bass131`
- 사용자가 정한 저장소 이름: `moodies-agentic-workflow`
- 로컬 브랜치: `main`
- 원격: 아직 생성되지 않음. 연결된 remote 없음.
- 현재 상태: 로컬 파이프라인과 하위 경로 검증 완료, Actions 실행·공개 배포 전.
- 외부 생성/공개 단계는 자동 승인 검토에서 공개 소스 전송 승인 부족으로 거절되어, 명시적 공개 승인 후 진행해야 함.
- 로컬 preview: http://127.0.0.1:4321/

배포 파일은 [.github/workflows/site.yml](../.github/workflows/site.yml)입니다. 호스팅은 GitHub Pages를 사용합니다.

## 주소와 출력

로컬 `npm run build`는 base `/`로 `dist/`에 빌드합니다. `npm run build:pages`는 별도 `dist-pages/`를 사용합니다. 두 출력은 섞지 않습니다.

Pages 주소는 [scripts/pages-location.mjs](../scripts/pages-location.mjs)에서 결정합니다.

1. `PAGES_URL`이 있으면 해당 HTTPS 주소의 origin을 Astro `site`, 경로를 `base`로 사용합니다.
2. 없으면 GitHub Actions의 실제 `GITHUB_REPOSITORY=owner/repository`에서 `https://owner.github.io/repository/`를 계산합니다. 계정 사이트 `owner.github.io` 저장소는 base `/`입니다.
3. 둘 다 없거나 잘못된 값이면 실패합니다. 가짜 배포 주소로 빌드하지 않습니다.

기본 브랜치 Actions는 `configure-pages`가 돌려준 실제 Pages URL을 사용합니다. PR/다른 브랜치는 저장소 정보로 경로를 계산합니다. 사용자 도메인이나 특수 Pages 주소를 사용하면 repository variable `PAGES_URL`에도 실제 주소를 넣어 PR 검증과 일치시킵니다.

## 로컬에서 배포 경로 검사

첫 브라우저 검사 전에 한 번 설치합니다.

```sh
npx playwright install chromium
```

확정한 URL을 PowerShell의 현재 세션에 설정하고 검사합니다. 아래 주소는 테스트용 예시이며 실제 배포 주소가 아닙니다.

```powershell
$env:PAGES_URL = 'https://example.github.io/path-check/'
npm run build:pages
npm run check:pages
npm run test:pages
Remove-Item Env:PAGES_URL
```

브라우저 검사는 임시 loopback 서버를 직접 시작하고 종료합니다. 기존 4321 preview는 유지됩니다. 예시 경로 검사는 배포 가능성에 대한 확인이며 실제 공개 사이트 검증을 대체하지 않습니다.

## 첫 연결에서 필요한 설정

확인된 공개 저장소에 이 프로젝트만 연결합니다. Pages 설정의 Source는 **GitHub Actions**로 둡니다. 기본 브랜치 이름은 GitHub 저장소 메타데이터가 기준이며 배포 조건에 하드코딩하지 않습니다.

가능하면 기본 브랜치 규칙에서 **Validate site** 검사를 필수로 지정합니다. 이 저장소의 배포 작업 자체도 해당 검증 성공을 요구합니다. `github-pages` environment의 배포 브랜치는 실제 기본 브랜치로 제한합니다.

일반 배포에는 개인 토큰 secret이 필요 없습니다. Actions의 `GITHUB_TOKEN`을 사용하며 검증 job은 contents/pages 읽기, 배포 job만 pages 쓰기와 id-token 쓰기를 가집니다. checkout은 인증 정보를 소스 작업 트리에 유지하지 않습니다.

## 일상 갱신

1. 변경용 브랜치에서 글이나 코드를 수정합니다.
2. `npm run verify`와 변경 범위에 맞는 브라우저 검사를 실행합니다.
3. PR을 올리면 설치 → 설정 테스트 → 타입/로컬 빌드 검사 → Pages 경로 빌드/출력 검사 → 브라우저 검사가 실행됩니다. PR은 배포하지 않습니다.
4. 기본 브랜치에 병합하거나 직접 push하면 같은 검사를 통과한 `dist-pages` artifact만 배포합니다. 다른 브랜치 push는 검사만 합니다.
5. Actions의 **Site CI and Pages → Deploy Pages** 성공과 environment URL을 확인합니다. 실제 URL에서 변경 페이지와 검색을 확인합니다.

진행 중인 배포는 새 변경 때문에 중간에 취소하지 않습니다. Pages 배포는 concurrency 그룹으로 겹치지 않게 합니다. 수동 실행도 실제 기본 브랜치에서만 배포할 수 있습니다.

## 실패 진단과 복구

- **Validate site 실패:** 실패 step의 첫 오류를 읽습니다. lockfile, 문서 링크, 타입 오류, 검색 결과 경로, 공개 출력 검사 등을 같은 로컬 명령으로 재현합니다.
- **configure-pages 실패:** 저장소 Pages Source와 실행 권한, 실제 기본 브랜치/도메인을 확인합니다.
- **Deploy Pages 실패:** artifact 생성 성공, `github-pages` environment 제한, Pages/id-token 권한을 확인합니다.
- 의존성 또는 코드 실패는 수정 후 다시 검사합니다. 일시적 GitHub 장애라면 동일 커밋의 실패 job을 재실행할 수 있습니다.

잘못된 변경은 마지막 정상 배포의 커밋을 Actions에서 찾은 뒤 문제 커밋을 `git revert <commit>`로 되돌리는 PR을 만듭니다. 병합 커밋은 부모를 확인한 후 `git revert -m 1 <merge-commit>`을 사용합니다. 검사와 새 배포를 통과한 뒤 공개 URL을 확인합니다. 기본 브랜치를 강제 push하거나 로컬 파일을 수동으로 서버에 복사하지 않습니다.

## 공개물 경계

배포 artifact는 `dist-pages/`뿐입니다. `src/content/docs/`, 홈, `public/`의 선별 근거는 공개 콘텐츠입니다. `docs/`와 root 운영 문서는 정적 사이트로 내보내지 않지만 공개 GitHub 저장소에서는 소스로 보입니다.

공개 출력 검사는 알려진 개인 경로·토큰 형태·비공개 Notion 링크와 잘못된 내부 경로를 잡는 보조 검사입니다. 모든 비밀·개인 정보 부재를 증명하지 않으므로 새 근거 자료의 의미도 검토합니다. 원본 비공개 저장소·대화·Notion export를 가져오지 않습니다.

공식 기준: [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) · [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
