---
title: Why this site exists
description: Reducing the effort of managing growing code and documentation, while combining agent autonomy with checks enforced by software.
---

This wiki describes how to organize **goals, agent autonomy, verification, and resumption** in AI-assisted development. It connects concepts and practical guidance to case studies and the evidence behind design choices.

The design leaves agents room to choose how they work, while software checks the conditions that must be met. The site is implemented; the workflow controller remains a proposal. Its value needs to be tested in actual tasks.

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

The following problems were reported in the projects behind this wiki and motivate the proposed design. The proposed changes still need evaluation in actual work.

<div class="document-table document-table--comparison" role="region" aria-labelledby="what-was-getting-difficult" tabindex="0">

| Reported project problem | Proposed response |
| --- | --- |
| **Too many responsibilities in one place**<br>Code bundled several responsibilities and did not reuse enough existing code. | **Make change points and reusable code visible**<br>Make existing functions easier to find and consider the next change. |
| **Current and past guidance mixed together**<br>Documents mixed current rules, old plans, and repeated explanations. | **Separate topics and distinguish past from current**<br>Give each topic a place and distinguish past records from current guidance. |
| **Context repeatedly reconstructed**<br>The user had to select relevant information and explain it again. | **Leave evidence the next person or agent can use**<br>Preserve decision reasons, current state, and verification evidence. |

</div>

A feature could work yet be difficult to change later. An agent taking over could follow an outdated explanation or repeat finished work. Code reuse, maintainability, and organized documentation all matter here.

## A small example

**Hypothetical task: fix a language preference that is lost on a return visit.** This uses the site's language feature to explain the approach. It is not a claim that a runner has automated these steps.

<div class="document-table document-table--steps" role="region" aria-labelledby="a-small-example" tabindex="0">

| Step | What it means for this task |
| --- | --- |
| **01 · Agree on the criteria** | **Keep the chosen language.** This applies when returning to the main homepage in the same browser. A directly opened document should keep the language in its address. |
| **02 · AI does the work** | **Reuse existing code, write tests, and implement the change.** Find the language, URL, and storage code and check the expected behavior. |
| **03 · Software checks it** | **Check required verification against the final code.** Failed or missing required checks prevent completion. |

</div>

<details>
<summary>What if the code changes after testing, or work is interrupted?</summary>

- **The code changed after testing:** an earlier passing result is not evidence for the new code. Run the necessary checks again.
- **Another agent takes over:** compare the goal, decision reasons, and remaining work with the actual code. Carry forward the attempts already used.
- **The agent reports completion:** treat the report as a request for verification. The proposed runner checks the recorded conditions before deciding whether the work is complete.

State storage and attempt limits belong to the [proposed completion checks](../verification/). They are not features already implemented by this site.

</details>

## How to use this wiki

1. **Guides explain how to apply the workflow.** Use them to define goals, allocate authority, preserve context, and check completion. Shared concepts have one reference page with links from related topics.
2. **Case studies show the evidence.** Read the conditions, observations, and limits before applying a conclusion to another project. Proposals are distinguished from measured results.
3. **Design decisions explain the tradeoffs.** Use the reasons and reconsideration criteria to assess whether a choice fits a task. Git preserves document history without making the main articles a session-by-session log.

<details>
<summary>Will the earlier workflow rules stay unchanged?</summary>

Some rules were written for the models and tools available at the time. They need to be reconsidered as those tools change. More rules, phases, or agents are not evidence of a better result.

The proposed workflow defines the goal, success criteria, and scope jointly; lets the main agent choose how to work; and checks the resulting behavior. Important decisions beyond the delegated scope need discussion. Small, reversible choices should not require another approval each time.

</details>

## Evaluation criteria

Readable code, reuse, focused documentation, and tests are starting points. Evaluation should use small changes and [observations from AgentDeck](../../experiments/agentdeck/) to examine:

- Can an agent find the right place to work and the code it can reuse?
- Does the work avoid repetition caused by outdated explanations or duplicate implementation?
- Does the person reviewing the result spend less effort reconstructing context and checking the change?

An AI-readiness score alone will not establish improvement. The detailed workflow and ways of evaluating it are still being developed.

Continue with the [workflow overview](../overview/) or the [current design choices](../../design/decisions/).
