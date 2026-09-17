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
