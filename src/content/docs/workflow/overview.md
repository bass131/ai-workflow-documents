---
title: Workflow overview
description: Agree on the goal, split work only as needed, and judge completion using evidence from the final code.
---
For the problems behind this workflow, start with [why this site exists](../why-this-site/).

Important work starts with **observable criteria for success and failure**. AI chooses how to implement the work, while the evidence determines whether it is complete.

## 01 · Agree on the goal

“Invalid settings cannot be saved, and existing settings still load” is easier to judge than “improve settings.” The user defines important outcomes and the scope of authority; the main agent develops concrete examples and tests. Every small edit does not need another approval.

## 02 · Split only as needed

Split a goal into **1–7 phases**. Seven is an upper limit, not a target. Briefly record each phase’s purpose, completion criteria, evidence, decisions and reasons, remaining work, and next action.

The main session chooses the number of subagents and sequential or parallel execution according to dependencies. This does not assume a fixed team, a new session for every phase, or fixed roles for particular models.

## 03 · Change behavior and check it

For behavior changes, begin with a test that fails for the expected reason (RED), implement the behavior that passes it (GREEN), then refactor as needed. Run relevant regression checks on the final code. Do not invent a failing test for changes limited to documentation or comments.

## 04 · Judge completion from evidence

An AI report of “done” is a request for verification. The **proposed runner** would control state transitions, connect results to the code version checked, determine eligibility for completion, and enforce attempt and time limits. Work cannot be complete while required checks fail or remain unrun. If code changes after verification, earlier results cannot establish completion.

## What if something is ambiguous?

For small, reversible choices, make a reasonable assumption and record why. Ask the user about consequential decisions beyond delegated authority, pausing only work that depends on the answer.

## Revisit the process as models improve

More phases or agents do not establish better quality. Compare the existing process with a lighter approach using the same completion criteria, and retain constraints that actually help.

## Chapters to develop next

The following reading order builds on this workflow. The new chapters currently contain their purpose and topics for discussion.

1. [Goals and success criteria](../goals-and-scope/): expected outcomes and scope
2. [Autonomy and decisions to confirm](../autonomy/): delegated choices and decisions needing input
3. [Phase records and resuming work](../phase-and-resume/): enough context to continue
4. [TDD and completion checks](../verification/): checks and completion decisions

:::note[Design and implementation]
This site is a prototype explaining the workflow. The runner that would control its state has not yet been implemented.
:::
