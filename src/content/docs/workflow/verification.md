---
title: TDD and completion checks
description: Judge completion using meaningful failing tests and check results from the final code.
---
**An agent reports that work is ready; the proposed runner checks whether it qualifies as complete.** Tests provide evidence that reduces regression risk. They do not prove the absence of every defect.

## Sequence for behavior changes

<div class="document-table document-table--steps" role="region" aria-labelledby="sequence-for-behavior-changes" tabindex="0">

| Step | What establishes progress |
| --- | --- |
| **RED · Confirm failure** | **The expected behavior is absent.** Installation and syntax errors do not demonstrate that failure. |
| **GREEN · Implement** | **The implementation resolves the failure.** Do not delete checks or weaken expectations merely to pass. |
| **Refactor · If useful** | **Behavior stays the same.** Make structural changes for a concrete maintenance need. |
| **Check regressions** | **Related behavior still works in the final code.** Results from before an edit are not sufficient. |

</div>

AI develops examples and checks from observable criteria agreed with the user. Tests limited to convenient internal implementation details do not establish whether those criteria are met.

:::tip[Documentation-only changes]
Changes limited to comments or explanations do not need an artificial RED. Check what changed: factual accuracy, links, builds, or rendered output.
:::

## Separate “complete” from a verification request

The following is a **runner design that has not been implemented**. A new task starts with agreed criteria; a resumed task also restores its records and remaining budget.

<figure class="workflow-map" aria-labelledby="completion-map-caption">
  <figcaption id="completion-map-caption"><strong>Start or resume → Work → Verify</strong><span>Proposed flow · Completion authority belongs to the controller.</span></figcaption>
  <ol class="workflow-map-steps" role="list">
    <li><span class="workflow-map-label">01 · CONTROLLER</span><strong>Load the task</strong><p>Read the criteria, allowed scope, and attempts already used.</p></li>
    <li><span class="workflow-map-label">02 · AGENT</span><strong>Implement and request checks</strong><p>Use the official agent runtime to work on the change. Report when it is ready.</p></li>
    <li><span class="workflow-map-label">03 · CONTROLLER</span><strong>Verify the candidate</strong><p>Run required checks and tie the results to the code and inputs checked.</p></li>
  </ol>
  <ul class="workflow-map-outcomes" role="list">
    <li><strong>Checks pass + criteria met → Complete</strong><span>Save the evidence for that candidate.</span></li>
    <li><strong>Checks fail → Revise within the limit</strong><span>Carry forward the attempts already used.</span></li>
    <li><strong>Checks missing or code changed → Verify again</strong><span>Do not use an earlier result to complete new work.</span></li>
    <li><strong>Limit reached → Stop and record</strong><span>Leave the cause and remaining work for resumption.</span></li>
  </ul>
  <p class="workflow-map-note">Consequential decisions outside the agreed scope need user input. Small, reversible choices can continue within that scope.</p>
</figure>

A commit alone may not identify the code tested: uncommitted files and configuration can affect results. The runner needs to identify both the check inputs and the actual working tree.

## What prevents bypassing a check?

**A skill can explain a check without making it mandatory.** If the agent can skip the checker and edit the official completion record, the workflow is still optional. Switching from a CLI to an SDK does not, by itself, fix this.

The proposed boundary is about authority: the agent can change the implementation and propose tests, but cannot rewrite the required verification policy, trusted results, or official completion state. The controller runs the checks rather than accepting a reported pass. A separate folder or process is insufficient if the agent still has permission to change it.

**Hypothetical example:** after fixing language preference storage, the agent reports “done.” If the required return-visit check has not run, the controller leaves the task incomplete. Changes to agreed acceptance criteria need review; the agent cannot weaken them just to pass.

This can prevent **unverified completion**, not force an agent to cooperate or guarantee that every intermediate action follows a plan. The permission boundary and check environment still need implementation and testing.

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
