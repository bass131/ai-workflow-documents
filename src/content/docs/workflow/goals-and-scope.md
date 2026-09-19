---
title: Goals and success criteria
description: Make the goal, completion criteria, and working constraints concrete, then resolve important decisions before starting.
---

Refining a goal makes **the work, the definition of done, and the allowed changes** concrete. The user and agent resolve important decisions together; the agent chooses implementation methods and writes tests within delegated authority.

<figure class="workflow-illustration">

![A person sketches a draft while a wooden robot proposes an alternative shape, both revising the same plan](../../../assets/workflow-brainstorm.png)

<figcaption>Refine the goal together by exchanging intentions and alternatives. <span>AI-generated conceptual illustration</span></figcaption>
</figure>

:::tip[Start without a complete specification]
**The goal itself is refined through brainstorming between the user and AI.** The user brings intent, problems, and important outcomes. AI analyzes the existing context and proposes alternatives, examples, and ways to check the result. The initial goal can change as their understanding develops. AI recommendations are drafts to consider; important priorities and allowed scope are discussed with the user.
:::

This is a proposed way of working, not evidence that a particular question count or benefit has been established experimentally. See the [decision flow in the overview](../overview/#goal-flow-caption) for the overall sequence.

## Eight principles for refining a goal

<div class="principle-list">

1. **The agent checks the context first.** Find facts in the existing documentation, code, and tests. Do not ask again for information already provided.
2. **Draft the goal, completion criteria, and working constraints.** Briefly state what work is needed, what would establish completion, what may change, and what must remain untouched.
3. **Ask when the answer changes an important result.** Discuss choices that change the expected outcome, completion judgment, or allowed scope, or that are hard to reverse. The agent handles small, reversible implementation choices within delegated authority.
4. **Respect the order of decisions and provide a recommendation with its reasoning.** Ask dependent questions after their prerequisites are settled. Group only questions that can be considered together, and explain what changes between the options.
5. **Watch whether the discussion advances, rather than counting questions.** If the same ambiguity remains after roughly two rounds, switch to examples, options, or a small mockup. Two rounds is a provisional point to reassess the conversation, not a forced stopping rule or a measured optimum.
6. **Stop asking once the conditions for starting are met.** The intended outcome can be described, completion can be checked, the next action is within the allowed scope, and no important decision requiring the user's judgment remains open.
7. **Focus deeper review where it is needed.** For new architecture or choices that are hard to reverse, examine hidden assumptions and the decisions that follow from them. Pause only the work that depends on an outstanding answer.
8. **Keep a short record of the result.** Separate settled decisions, delegated choices, and remaining decisions with a point for revisiting them. If an important assumption changes during the work, revisit that part of the agreement.

</div>

## Choices to discuss and choices to delegate

This **hypothetical example** concerns fixing settings storage. Separate facts the agent can investigate from decisions that need the user's judgment.

<div class="document-table document-table--steps" role="region" aria-labelledby="choices-to-discuss-and-choices-to-delegate" tabindex="0">

| Open issue | Response and reason |
| --- | --- |
| **Current behavior** | **Check the code and tests first.** How invalid settings are handled today is a fact to investigate. |
| **Function split** | **Let the agent decide.** This is a reversible implementation choice that preserves the agreed behavior and scope. |
| **Reject or correct** | **Discuss a recommendation and the differences.** Rejecting invalid settings and automatically correcting them produce different user experiences and require different tests. |

</div>

**Reaching a question count does not settle an important decision.** Equally, implementation details that can be decided later need not delay the start. Record whether a remaining decision blocks the current work and when it needs to be revisited.

Related: [Workflow overview](../overview/) · [Autonomy and decisions to confirm](../autonomy/)
