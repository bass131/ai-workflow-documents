---
title: Workflow overview
description: Define and refine the goal, divide work into phases and responsibilities while preserving context, and judge completion using evidence from the final code.
---
For the problems behind this workflow, start with [why this site exists](../why-this-site/).

Important work starts with **observable criteria for success and failure**. AI chooses how to implement the work, while the evidence determines whether it is complete.

## 01 · Define and refine the goal

<figure class="workflow-illustration">

![A human hand and a wooden robot align a target shape, a check token, and a boundary on the same plan](../../../assets/workflow-goal.png)

<figcaption>Define the outcome and boundaries together. <span>AI-generated concept illustration</span></figcaption>
</figure>

:::tip[Shape the goal together]
Setting a goal is **a brainstorming process in which the user and AI refine the direction together**. The user does not need a complete specification at the start. They describe their intent and the problem; AI examines the existing context and proposes alternatives and examples. The user identifies important outcomes and priorities. Together, they make the goal, completion criteria, and working constraints concrete.
:::

The **hypothetical example** below applies this to fixing a problem that allows invalid settings to be saved.

<div class="document-table document-table--steps" role="region" aria-labelledby="01--define-and-refine-the-goal" tabindex="0">

| Item | Question and example |
| --- | --- |
| **Goal** | **What work will be done?**<br>Fix the problem that allows invalid settings to be saved. |
| **Done when** | **What must be checked before the work is done?**<br>Settings with empty required values cannot be saved. Valid settings can be saved and loaded again, and existing settings still load. |
| **Limits** | **What may change, and what must stay as it is?**<br>Change validation and saving logic, while preserving the existing storage format and overall screen layout. |

</div>

<figure class="workflow-map goal-flow" aria-labelledby="goal-flow-caption">
  <figcaption id="goal-flow-caption"><strong>When to ask, and when to start</strong><span>Look for important unresolved decisions, rather than counting questions.</span></figcaption>
  <ol class="workflow-map-steps" role="list">
    <li><span class="workflow-map-label">Read the context</span><strong>Check available facts</strong><p>Read the existing documentation, code, and tests.</p></li>
    <li><span class="workflow-map-label">Draft the criteria</span><strong>Make the task concrete</strong><p>Set out the goal, completion criteria, and working constraints.</p></li>
    <li><span class="workflow-map-label">Decide</span><strong>Important decisions still open?</strong><p>Identify choices that need the user's judgment.</p></li>
  </ol>
  <ul class="workflow-map-outcomes" role="list">
    <li><strong>Yes → Discuss a recommendation and why</strong><span>Revise the draft, then check again. ↩</span></li>
    <li><strong>No + Ready to start → Begin work</strong><span>Record what is settled and what is delegated.</span></li>
  </ul>
  <p class="workflow-map-note">Ready to start means the intended outcome can be described, completion can be checked, and the next action is within the allowed scope.</p>
</figure>

**Important unresolved decisions** change the expected outcome, completion judgment, or allowed scope, or involve a choice that is hard to reverse. The agent handles small, reversible implementation choices within delegated authority.

**If discussion stalls,** switch from repeating questions to examples, options, or a small mockup. Reaching a question count does not settle an important decision. The eight principles are explained in [Goals and success criteria](../goals-and-scope/).

## 02 · Manage work in phases

<figure class="workflow-illustration">

![A wooden robot divides an assembly goal into parts and notes in separate work trays](../../../assets/workflow-phases.png)

<figcaption>Split the work as needed and preserve context. <span>AI-generated concept illustration</span></figcaption>
</figure>

**Manage progress in phases, with the main orchestrator distributing context and coordinating implementation and review.** Phase records connect the divided work to the overall goal and provide a reference for continuing.

Split a goal into **1–7 phases** as needed. Define each phase as **a milestone with an intermediate result to achieve and criteria for completion**, and make the order and dependencies between phases clear. Seven is an upper limit, not a target. One phase is enough for a small task.

An agent can handle only a limited amount of context at once. **Phase records preserve decisions and reasons, verification evidence, remaining work, and the next action.** They let an agent focus on the current work and retrieve earlier context when needed. After context compaction or a session change, compare these records with the actual state before continuing.

For substantial work, the default direction is for **the main orchestrator to maintain the goal, constraints, dependencies, and progress while delegating implementation and review.** A review agent checks the actual changes and test evidence before reporting to the main orchestrator. The main orchestrator uses that assessment to assign corrections or proceed to the next phase.

<figure class="workflow-map" aria-labelledby="delegation-flow-caption">
  <figcaption id="delegation-flow-caption"><strong>The main orchestrator manages progress and delegates work</strong><span>A typical delegation flow, not a fixed requirement for three agents on every task.</span></figcaption>
  <ol class="workflow-map-steps" role="list">
    <li><span class="workflow-map-label">Main orchestrator</span><strong>Keep criteria and assign work</strong><p>Provide the scope, completion criteria, and necessary context.</p></li>
    <li><span class="workflow-map-label">Implement</span><strong>Build and check the assigned work</strong><p>Record changes, test results, and remaining issues.</p></li>
    <li><span class="workflow-map-label">Review</span><strong>Inspect results and evidence</strong><p>Assess whether requirements are met and what needs correction.</p></li>
  </ol>
  <p class="workflow-map-note"><strong>Review → Main orchestrator:</strong> Return the assessment and evidence. The main orchestrator assigns corrections or selects the next phase. Important unresolved decisions are discussed with the user.</p>
</figure>

:::tip[Keep essential information; delegate the method]
The main orchestrator chooses the number of subagents, sequential or parallel execution, tools, and implementation methods according to the task's size and dependencies. It can handle small tasks directly. A new session for every phase or a fixed role for a particular model is unnecessary. Every arrangement still preserves **working criteria, context for resuming, and verification evidence**.
:::

<div class="document-table document-table--steps" role="region" aria-labelledby="02--manage-work-in-phases" tabindex="0">

| Keep | What to record and why |
| --- | --- |
| **Criteria** | **Goal, completion criteria, and allowed scope.** Explain how the assignment contributes to the overall goal. |
| **Context** | **Decisions and reasons, current state, remaining work, and next action.** Link the relevant documents and outputs so another session can continue. |
| **Evidence** | **Actual changes, check results, and the input checked.** Include failed or unrun checks. A reviewer's judgment does not replace testing. |

</div>

Give the main orchestrator **a summary for deciding what happens next and links to the evidence**, with details available when needed. Preserve important constraints and unresolved issues in that summary. Phase records provide a reference for later work rather than copying the entire conversation.

Phases and agents do not have to correspond one to one. See [Phase records and resuming work](../phase-and-resume/) for record examples and checks against actual state.

## 03 · Change behavior and check it

<figure class="workflow-illustration">

![A wooden robot adjusts a component in a test jig beside fitting and mismatched pieces](../../../assets/workflow-testing.png)

<figcaption>Change the work and check the expected behavior. <span>AI-generated concept illustration</span></figcaption>
</figure>

**Express the agreed behavior as a test, check why it fails, then implement the behavior.** The agent writes tests and implementation. Changes to the expected outcome or allowed scope need further discussion with the user.

The **hypothetical example** below continues the invalid-settings task from section 01.

<div class="document-table document-table--steps" role="region" aria-labelledby="03--change-behavior-and-check-it" tabindex="0">

| Stage | Example and evidence to check |
| --- | --- |
| **RED · Fail** | **Write a test that rejects saving empty required values.** Check that it fails because the existing code saves invalid values. Installation or syntax errors do not demonstrate this behavior. |
| **GREEN · Build** | **Validate values before saving to pass the test.** Also check that valid settings can be saved and loaded, and that existing settings still load. Do not lower expectations or remove checks just to pass. |
| **Tidy · Retest** | **Verify that behavior survives any necessary cleanup.** Address duplication or mixed responsibilities where needed, then rerun relevant checks on the final code. |

</div>

Tests should check **the outcome the user expects**, rather than just the shape of internal functions. Passing provides evidence for the conditions checked; it does not guarantee the absence of every defect. On failure, record the cause and evidence, then revise the affected work.

Do not invent failing tests for changes limited to documentation or comments. Check facts, links, build output, and readability in the actual interface instead. See [TDD and completion checks](../verification/) for detailed criteria.

## 04 · Judge completion from evidence

<figure class="workflow-illustration">

![A measuring tool checks a finished component beside a wooden robot and inspection records](../../../assets/workflow-evidence.png)

<figcaption>Tie completion to the actual result and evidence. <span>AI-generated concept illustration</span></figcaption>
</figure>

**Treat an AI report of “done” as a request for verification, and compare actual results with the completion criteria.** Check both individual milestones and the overall goal. When separately implemented features must work together, include that interaction in the checks.

<figure class="workflow-map" aria-labelledby="overview-completion-caption">
  <figcaption id="overview-completion-caption"><strong>Work output → Required checks → Completion decision</strong><span>Proposed runner flow · This design has not been implemented.</span></figcaption>
  <ol class="workflow-map-steps" role="list">
    <li><span class="workflow-map-label">Agent</span><strong>Request verification</strong><p>Report changes, observed results, and remaining issues.</p></li>
    <li><span class="workflow-map-label">Runner</span><strong>Run the checks directly</strong><p>Connect results to the code, configuration, and inputs checked.</p></li>
    <li><span class="workflow-map-label">Completion decision</span><strong>Compare criteria and evidence</strong><p>Confirm required checks pass and agreed outcomes are met.</p></li>
  </ol>
  <ul class="workflow-map-outcomes" role="list">
    <li><strong>Criteria met + Valid evidence → Complete</strong><span>Record completion together with the evidence.</span></li>
    <li><strong>Failure, missing checks, or later changes → Incomplete</strong><span>Revise or rerun checks within the remaining limits.</span></li>
  </ul>
</figure>

In the settings example, passing the empty-value check is insufficient if the required check for loading valid settings was skipped. If saving code changes after verification, **earlier results do not establish that the new code is complete.** Distinguish failed checks from required checks that were not run.

**Detailed state controls are covered in [TDD and completion checks](../verification/).** That guide covers state transitions, authority over completion records, rechecking after code changes, attempt and time limits, and rules for resuming. Whether the runner should also enforce the RED → GREEN order remains undecided.

## What if something is ambiguous?

<figure class="workflow-illustration">

![A human hand and a wooden robot consider differently shaped parts and alternatives](../../../assets/workflow-ambiguity.png)

<figcaption>Discuss consequential choices together. <span>AI-generated concept illustration</span></figcaption>
</figure>

**Separate facts that can be checked from choices the user needs to make.** Do not ask the user to restate information available in code or documentation. Judge whether the answer would change the expected outcome, completion criteria, or allowed scope.

These are also **hypothetical examples** from the settings task.

<div class="document-table document-table--steps" role="region" aria-labelledby="what-if-something-is-ambiguous" tabindex="0">

| Situation | How to proceed |
| --- | --- |
| **Check a fact** | **The existing storage format is unfamiliar.** Inspect the relevant code, documentation, and tests first. |
| **Agent choice** | **Decide which function should contain validation.** The agent handles small, reversible implementation choices and records reasons needed for later work. |
| **User decision** | **Consider correcting invalid values automatically instead of rejecting them.** Explain the recommendation and its effects, then discuss it with the user because the expected outcome changes. Also confirm hard-to-reverse actions such as deleting existing data. |

</div>

While waiting, **pause only work that depends on the answer** and continue independent work already within scope. Reversibility does not authorize unrelated work. Stop asking when important decisions are settled. If discussion repeats, use the [principles for refining goals through examples and options](../goals-and-scope/).

## Revisit the process as models improve

<figure class="workflow-illustration">

![A wooden robot compares complex and simpler jigs for the same target component](../../../assets/workflow-revisit.png)

<figcaption>Compare against the same criteria and assess the process. <span>AI-generated concept illustration</span></figcaption>
</figure>

**Keep a procedure when evidence shows that it helps with the problem it was meant to solve.** More phases or agents do not establish better quality, and a model update alone does not justify removing existing checks.

Compare one procedural change at a time using the same starting state, task, model, and completion criteria. When comparing models themselves, keep the procedure consistent to distinguish the source of a difference. One successful run does not establish the same benefit for every task.

- **Outcome:** Look for missed requirements, regressions, and whether the final result meets the criteria.
- **Decision burden:** Check whether the user had to repeat context or repeatedly decide inconsequential details.
- **Cost of work:** Record time, retries, and usage or cost where available. Distinguish estimates from measured values.

For example, compare starting a new session for every phase with changing sessions only when needed. This is **an example comparison, not a measured result favoring either approach.** Keep useful procedures; simplify or redesign those that only add burden. Link the reasons and conditions for reconsideration to [Current choices and review criteria](../../design/decisions/).

## Chapters to develop next

<figure class="workflow-illustration">

![A wooden robot reads a folding guide beside a rack of topic booklets](../../../assets/workflow-reading.png)

<figcaption>Follow the overview into focused topic guides. <span>AI-generated concept illustration</span></figcaption>
</figure>

**Choose a detailed guide by the question you need to answer.** This overview connects the stages; the guides below cover specific criteria and records.

1. **What will be built, and within what limits?** [Goals and success criteria](../goals-and-scope/) covers brainstorming and deciding when to stop asking questions.
2. **What can be delegated, and what needs confirmation?** [Autonomy and decisions to confirm](../autonomy/) outlines delegation boundaries. Detailed cases are still to be developed.
3. **How can another session continue?** [Phase records and resuming work](../phase-and-resume/) covers recording decisions, evidence, and next actions for each milestone.
4. **What evidence supports completion?** [TDD and completion checks](../verification/) covers checking criteria and the proposed runner's responsibilities and limits.

For actual observations, see [Lessons from AgentDeck](../../experiments/agentdeck/). Distinguish those observations from workflow designs that remain to be implemented.

:::note[Design and implementation]
This site is a prototype explaining the workflow. The runner that would control its state has not yet been implemented.
:::
