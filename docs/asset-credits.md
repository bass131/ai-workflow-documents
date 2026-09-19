# 이미지 출처와 사용 조건

## 사용한 목재 이미지

- 출처: [ambientCG Wood049](https://ambientcg.com/view?id=Wood049), 절차적으로 생성된 매끄러운 참나무 재질
- 취득일: 2026-09-17
- 사용 조건: [ambientCG 라이선스 안내](https://docs.ambientcg.com/license/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)
- 범위: 공식 API가 제공한 2048 × 2048 색상 프리뷰 JPG 한 장. 안내에 따라 재질 파일과 프리뷰 모두 CC0에 포함됩니다. 다른 PBR 맵이나 전체 패키지는 포함하지 않았습니다.
- 원본: [Wood049 색상 프리뷰](https://f003.backblazeb2.com/file/ambientCG-Web/media/surface-preview/Wood049/Wood049_SQ_Color.jpg?29864)
- 프로젝트 파일: src/assets/wood049-color.jpg, 857,556 bytes
- 원본 SHA-256: FCAD54B39B849D5FD62F5333EBB547C154E7FD9681EA6BABEC8F17D5A7CA25C4

MaterialStyles.astro에서 Astro getImage로 768 × 768 WebP, 품질 80으로 빌드합니다. 확인한 결과는 50,002 bytes이며 홈과 문서가 동일한 파일을 공유합니다. 실제 사이트는 외부 이미지 서버에 연결하지 않습니다. CSS 반복 크기는 384 × 384 CSS px입니다. 3 × 3 반복 화면에서 가로·세로 이음새를 확인했습니다.

홈·문서 상단바의 전체 면, 홈의 흐름도와 문서 탐색·목차 프레임에만 장식 배경으로 사용합니다. 본문과 탐색 프레임의 글자는 불투명한 종이 또는 차콜 면 위에 놓고, 다크 모드는 CSS 덮개로 목재의 밝기를 낮춥니다. 상단바의 브랜드와 섹션 링크는 덮개를 합성한 목재 위에 놓고 최저 픽셀 대비를 확인합니다. 원본 자체의 색상은 편집하지 않았습니다.

## 디자인 참고

[Flexoki](https://stephango.com/flexoki)의 종이와 잉크 대비, [Starlight Obsidian](https://fevol.github.io/starlight-theme-obsidian/)의 읽기 중심 구조를 참고했습니다. [LinkPlank](https://www.framer.com/marketplace/components/linkplank/)와 [VELORA](https://www.framer.com/marketplace/templates/velora-space/)는 재질 사용 방식의 시각 참고만 했습니다. 이들의 코드·이미지·유료 템플릿을 복제하거나 프로젝트에 포함하지 않았습니다.

## 목재 로봇 장식

`src/assets/wooden-workshop-mascot.png`는 2026-09-17 내장 image_gen 도구로 생성하고 편집한 오리지널 목재 로봇 이미지입니다. 특정 외부 작가나 기존 캐릭터를 모방하지 않았습니다. AI 생성 자산으로 기록하며 CC0 이미지로 분류하지 않습니다. 홈의 장식에 사용하고 Astro가 투명도를 유지한 작은 WebP로 최적화합니다. 핵심 정보나 탐색 기능을 대신하지 않습니다.

## 작업 맥락을 정리하는 삽화

`src/assets/workflow-workbench.png`는 2026-09-18 내장 image_gen으로 생성한 개념 삽화입니다. 목재 로봇이 흩어진 메모와 부품을 문서함과 재사용할 조각으로 정리하는 장면입니다. 기존 사이트의 목공소 분위기에 맞춰 새로 생성했고, 외부 작가·브랜드를 지정하지 않았습니다. AI 생성 자산이며 CC0로 분류하지 않습니다.

영어·한국어 ‘이 사이트를 만든 이유’에서 대체 텍스트와 생성 사실을 밝힌 설명을 함께 제공합니다. 실제 화면·실험 증거·완료 성과로 사용하지 않습니다. 원본은 1774 × 887 PNG이며 Astro가 배포용 WebP로 최적화합니다. 이미지 안에 설명 문구를 넣지 않아 두 언어가 같은 자산을 공유합니다.

## 함께 목표를 구체화하는 삽화

`src/assets/workflow-brainstorm.png`는 2026-09-19 내장 image_gen으로 생성한 2172 × 724 PNG 개념 삽화입니다. 사람은 초안을 그리고 목재 로봇은 대안을 제시하며 같은 설계안을 함께 고칩니다. 기존 작업대 삽화는 캐릭터와 분위기의 참고로 사용했습니다. 영어·한국어 ‘목표와 성공 기준’에서 대체 텍스트와 AI 생성 표시를 함께 제공합니다. 실제 대화나 실험 결과를 기록한 사진이 아니며 CC0로 분류하지 않습니다. Astro가 WebP로 최적화합니다. [최종 프롬프트](image-prompts/workflow-overview.md#workflow-brainstorm)를 보관합니다.

## 전체 흐름의 항목별 삽화

2026-09-19 내장 image_gen 도구로 일곱 장을 생성했습니다. 기존 작업대 삽화를 목재 로봇과 재질의 참고 이미지로 사용했습니다. 외부 작가·브랜드를 지정하지 않았으며 AI 생성 자산으로 기록합니다. CC0로 분류하지 않습니다.

| 프로젝트 파일 | 설명할 내용 |
| --- | --- |
| src/assets/workflow-goal.png | 목표·완료 기준·작업 조건 조율 |
| src/assets/workflow-phases.png | 필요한 단계로 나누고 맥락 보존 |
| src/assets/workflow-testing.png | 동작을 수정하고 검사 |
| src/assets/workflow-evidence.png | 실제 결과와 검사 근거로 완료 판단 |
| src/assets/workflow-ambiguity.png | 중요한 미결정 조율 |
| src/assets/workflow-revisit.png | 같은 기준으로 절차 재검토 |
| src/assets/workflow-reading.png | 전체 흐름에서 주제별 문서 탐색 |

영어·한국어 문서가 같은 자산을 사용하며, 대체 텍스트와 항목별 설명, AI 생성 표시를 제공합니다. 사진처럼 보이는 개념 삽화이며 실제 프로그램 화면이나 검증 성과가 아닙니다. 정확한 조건과 분기는 선택·복사 가능한 HTML 흐름도와 본문에 남깁니다. 생성에 사용한 최종 프롬프트는 [기록](image-prompts/workflow-overview.md)에 보관합니다. Astro가 빌드에서 WebP로 최적화합니다.
