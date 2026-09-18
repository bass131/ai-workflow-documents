---
title: Why this site exists
description: Reducing the effort of managing growing code and documentation, while combining agent autonomy with checks enforced by software.
---

As my projects grew, the code and documentation produced with AI became harder to manage. **Finding the right context, understanding a change, and deciding whether to trust its result** took more effort. That is where this site started.

It records what I try to reduce that burden and what I actually learn. The direction is to leave agents room to choose how they work, while software checks the conditions that must be met.

![A wooden robot organizing scattered notes and parts into document trays and reusable pieces on a workbench](../../../assets/workflow-workbench.png)

*An AI-generated concept illustration of organizing information and code for reuse. It is not a screenshot or a measured result.*

## The direction at a glance

<figure class="workflow-map" aria-labelledby="workflow-map-caption">
  <figcaption id="workflow-map-caption"><strong>Agree together → AI does the work → Software checks it</strong><span>Proposed responsibilities · The runner has not been implemented.</span></figcaption>
  <ol class="workflow-map-steps" role="list">
    <li><span class="workflow-map-label">01 · USER AND AI</span><strong>Agree on the criteria</strong><p>Define the goal, success criteria, and scope.</p></li>
    <li><span class="workflow-map-label">02 · MAIN AGENT</span><strong>Choose how to work</strong><p>Decide how to implement, test, and delegate when useful.</p></li>
    <li><span class="workflow-map-label">03 · PROPOSED RUNNER</span><strong>Check records and results</strong><p>Check required tests and completion conditions against the current code.</p></li>
  </ol>
  <ul class="workflow-map-outcomes" role="list">
    <li><strong>Conditions met → Complete</strong><span>Record the code and results that were checked.</span></li>
    <li><strong>Checks fail → Return to the work</strong><span>Try again within the remaining attempt limit.</span></li>
  </ul>
  <p class="workflow-map-note">When the limit is reached, stop and record the unfinished work and cause. Important decisions beyond the delegated scope need user input.</p>
</figure>

**Software can check compliance with the conditions we define.** Whether the requirements and tests are sufficient, and whether important outcomes are acceptable, still needs human judgment.

## What was getting difficult

These are problems I encountered in my projects and the changes I want to explore. Their usefulness still needs to be checked in actual work.

| Problem I encountered | Direction to explore |
| --- | --- |
| Code bundled several responsibilities and did not reuse enough existing code. | Make existing functions and the right place to change easier to find; consider the next change. |
| Current rules, old plans, and repeated explanations were mixed together. | Give each topic a place and distinguish past records from current guidance. |
| I had to select the useful information and explain the context again. | Preserve decision reasons, current state, and verification evidence for the next person or agent. |

A feature could work yet be difficult to change later. An agent taking over could follow an outdated explanation or repeat finished work. Code reuse, maintainability, and organized documentation all matter here.

## A small example

**Hypothetical task: fix a language preference that is lost on a return visit.** This uses the site's language feature to explain the approach. It is not a claim that a runner has automated these steps.

| Step | What it means for this task |
| --- | --- |
| Agree on the criteria | Returning to the main homepage in the same browser should keep the chosen language. A directly opened document should keep the language in its address. |
| AI does the work | Find and reuse the language, URL, and storage code; write tests for the expected behavior and implement the change. |
| Software checks it | Check that required verification ran against the final code. Failed or missing required checks prevent completion. |

<details>
<summary>What if the code changes after testing, or work is interrupted?</summary>

- **The code changed after testing:** an earlier passing result is not evidence for the new code. Run the necessary checks again.
- **Another agent takes over:** compare the goal, decision reasons, and remaining work with the actual code. Carry forward the attempts already used.
- **The agent reports completion:** treat the report as a request for verification. The proposed runner checks the recorded conditions before deciding whether the work is complete.

State storage and attempt limits belong to the [proposed completion checks](../verification/). They are not features already implemented by this site.

</details>

## Why keep a site

1. **To find the explanation that matters.** Organize work starts, important decisions, resumption, and verification by topic. Update shared explanations in one place and link to them.
2. **To retain the reasons and evidence.** Record actual examples, design choices, test coverage, and limits. Distinguish proposals from observed results.
3. **To show how the work changes.** Update the documents alongside the work and keep their history in Git. As a portfolio, the site should show both the problem and the approach.

<details>
<summary>Will the earlier workflow rules stay unchanged?</summary>

Some rules were written for the models and tools available at the time. They need to be reconsidered as those tools change. More rules, phases, or agents are not evidence of a better result.

The direction we have agreed on is to define the goal, success criteria, and scope together; let the main agent choose how to work; and check the resulting behavior. Important decisions beyond the delegated scope need discussion. Small, reversible choices should not require another approval each time.

</details>

## How we will judge progress

Readable code, reuse, focused documentation, and tests are starting points. We plan to use small changes and [observations from AgentDeck](../../experiments/agentdeck/) to ask:

- Can an agent find the right place to work and the code it can reuse?
- Does the work avoid repetition caused by outdated explanations or duplicate implementation?
- Does the person reviewing the result spend less effort reconstructing context and checking the change?

An AI-readiness score alone will not establish improvement. The detailed workflow and ways of evaluating it are still being developed.

Continue with the [workflow overview](../overview/) or the [current design choices](../../design/decisions/).
