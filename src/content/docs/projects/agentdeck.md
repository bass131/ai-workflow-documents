---
title: What is AgentDeck?
description: A desktop AI coding workspace, and the project used to explore the workflow described in this wiki.
---

**AgentDeck is a desktop development tool that brings AI conversations, code viewing, change review, and Git operations into one workspace.** It lets a developer request a change and inspect the resulting code without moving between separate tools.

## What the application does

- **Work with an agent:** open a project folder, send a coding request, and follow the agent’s progress and tool activity.
- **Inspect the result:** read files and compare changes in a diff view before deciding what to keep.
- **Manage development work:** view Git history and branches, and work with separate conversation sessions or agent panels.

The application uses Electron, React, and TypeScript. Agent execution is connected through the Claude Agent SDK.

## How it relates to this wiki

<div class="document-table document-table--steps" role="region" aria-labelledby="how-it-relates-to-this-wiki" tabindex="0">

| Item | Role |
| --- | --- |
| **App** | **AgentDeck is the development tool.** It provides the interface for working with agents and reviewing code. |
| **Workflow** | **The goal-based process being designed and tested.** It defines goals, verification conditions, and records needed to resume work. |
| **This wiki** | **The explanation and evidence.** It describes the concepts, design choices, and observations from projects such as AgentDeck. |

</div>

The [AgentDeck case study](../../experiments/agentdeck/) examines a check script used in its development workflow. That isolated experiment does not evaluate every feature of the application.

## Existing implementation and proposed additions

**Existing:** the desktop application and Claude Agent SDK integration.

**Proposed:** connecting Codex through App Server and adding a shared controller for goals, verification, and resumption. The [design decisions](../../design/decisions/) explain this direction and its limits. The documentation site itself does not run AgentDeck or control agents.

*Implementation status was checked against the project’s README and source on September 18, 2026. The application was not retested for this article.*

Source and application details: [AgentDeck repository](https://github.com/bass131/AgentDeck).
