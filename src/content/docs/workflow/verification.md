---
title: TDD and completion checks
description: Judge completion using meaningful failing tests and check results from the final code.
---
Tests provide evidence that reduces regression risk. They do not prove the absence of every defect.

## Sequence for behavior changes

| Step | Check | Avoid |
| --- | --- | --- |
| RED · confirm failure | Does the check fail because the expected behavior is absent? | Counting installation or syntax errors as a failure of the required behavior |
| GREEN · implement | Does the implementation resolve that failure and pass? | Deleting checks or changing expectations for convenience |
| Refactor · when needed | Is behavior preserved after structural changes? | Rewriting without a purpose |
| Check regressions | Does the final code preserve related existing behavior? | Declaring completion using results from before the edit |

AI develops examples and checks from observable criteria agreed with the user. Tests limited to convenient internal implementation details do not establish whether those criteria are met.

:::tip[Documentation-only changes]
Changes limited to comments or explanations do not need an artificial RED. Check what changed: factual accuracy, links, builds, or rendered output.
:::

## Separate “complete” from a verification request

The following is a **runner design that has not been implemented**. When AI reports completion, the runner would move into a verification-requested state.

```text title="Proposed completion decision"
Implementation → verification request → inspect required checks and code
                                         ├─ Failed or unrun → cannot complete
                                         ├─ Code changed after checks → reverify
                                         └─ All required checks pass on current code
                                              + criteria met → complete
```

A commit alone may not identify the code tested: uncommitted files and configuration can affect results. The runner needs to identify both the check inputs and the actual working tree.

## Responsibilities proposed for the runner

A **runner** is a program that changes state according to defined rules. It is proposed to control the following independently of how convincing an AI report sounds:

- Allowed state transitions and completion conditions
- The connection between check commands, exit codes, artifacts, and the code version checked
- Invalidation of old verification after code changes
- Rejection of completion when required checks fail or have not run
- Attempt and time limits, preserving consumed budgets when resuming

Programmatic completion checks do not resolve incorrect requirements or tests that omit important behavior.

## Failures and exhausted budgets

Classify the cause and fix failures within the remaining budget. When the limit is reached, stop adding attempts and record the evidence, what was tried, remaining work, and decisions needed. A new session does not reset the count.

Escalate consequential decisions beyond delegated authority to the user. This does not prescribe immediately escalating every failure or retrying every failure indefinitely.

Related: [Phase records and resuming work](../phase-and-resume/) · [AgentDeck experiment](../../experiments/agentdeck/)
