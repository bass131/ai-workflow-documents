[English](README.md) | [한국어](README.ko.md)

# Moodie’s Agentic Workflow

AI 에이전트와 일하는 방법을 기록하는 공개 노트이자 포트폴리오입니다. 목표를 함께 정하고, 에이전트가 자율적으로 작업하며, 결과를 근거로 확인하는 과정을 다룹니다.

**[사이트 방문하기 →](https://bass131.github.io/ai-workflow-documents/ko/)**

사이트와 README 모두 영어·한국어로 읽을 수 있습니다. 사이트의 첫 방문은 영어이며, 직접 선택한 언어는 같은 브라우저에서 기억합니다.

[![목재 캐릭터, 워크플로 개요, 종이 질감 바탕으로 구성된 Moodie’s Agentic Workflow 홈 화면](docs/images/home-light.png)](https://bass131.github.io/ai-workflow-documents/ko/)

*2026년 9월 17일 현재 로컬 미리보기에서 캡처한 언어 선택기가 있는 영어 홈의 밝은 테마 화면입니다. 이미지를 누르면 사이트로 이동합니다.*

## 이 사이트의 역할

AI를 활용한 개발 방식을 다듬는 과정과 판단의 이유를 보여줍니다. 적용 가이드, AgentDeck에서 관찰한 사례, 설계를 바꾼 이유를 한곳에서 읽을 수 있습니다.

자신의 에이전트 워크플로를 만드는 개발자와 이 프로젝트의 설계 과정을 살펴보고 싶은 독자를 위한 공간입니다. 무엇을 시도했고, 어디까지 확인했으며, 무엇을 더 검증해야 하는지 남깁니다.

## 살펴볼 내용

- **목표와 범위:** 관찰 가능한 결과를 합의하고, 이번 작업에 포함할 일을 정합니다.
- **자율성과 사용자 판단:** 작고 되돌릴 수 있는 선택은 에이전트가 진행하고, 합의한 범위를 넘는 중요한 결정은 확인합니다.
- **단계 기록과 재개:** 필요할 때 최대 일곱 단계로 나누고, 중단이나 에이전트 교체 뒤에도 이어갈 수 있도록 맥락을 남깁니다.
- **테스트와 완료 판단:** TDD와 회귀 검사를 최종 코드의 근거로 연결합니다.
- **실험과 설계 선택:** AgentDeck 사례에서 확인한 점과 한계, 그 관찰을 바탕으로 제안한 설계를 읽습니다.

홈에서는 검사 실패나 작업 재개 같은 상황을 골라 제안한 판단 흐름을 살펴볼 수도 있습니다.

## 처음 방문했다면

1. [전체 흐름](https://bass131.github.io/ai-workflow-documents/ko/workflow/overview/)에서 핵심 원칙을 읽습니다.
2. [상황 시뮬레이션](https://bass131.github.io/ai-workflow-documents/ko/#simulation)에서 그 원칙이 실제 판단에 어떻게 연결되는지 봅니다.
3. [AgentDeck 사례](https://bass131.github.io/ai-workflow-documents/ko/experiments/agentdeck/)에서 구체적인 관찰과 한계를 확인합니다.
4. [설계와 변화](https://bass131.github.io/ai-workflow-documents/ko/design/decisions/)에서 더 나은 근거가 생기면 바꿀 선택을 살펴봅니다.

## 현재 범위

문서 사이트와 상황 시뮬레이션은 구현되어 있습니다. 시뮬레이션은 제안한 동작을 설명하며 실제 에이전트나 테스트를 실행하지 않습니다. 작업 상태와 완료를 프로그램으로 통제하는 실행기는 아직 제안 단계입니다.

일부 가이드 장은 큰 틀부터 차근차근 채워가는 중입니다. AgentDeck 사례는 이전의 제한된 검사에 근거하며, 이 방식이 다른 워크플로나 최신 모델보다 우수하다고 입증한 결과는 아닙니다.

## 사이트를 수정하려면

Astro, Starlight, TypeScript로 만들고 GitHub Pages에서 운영합니다. Node 24와 npm을 설치한 환경에서 시작합니다.

```sh
npm ci
npm run dev
```

내용을 고칠 때는 [문서 작성 가이드](docs/authoring.md)를, 검사·갱신·복구에는 [배포 가이드](docs/deployment.md)를 참고합니다. [검증 기록](VALIDATION.md)과 [자산 출처](docs/asset-credits.md)도 함께 남깁니다.
