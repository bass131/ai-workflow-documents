---
title: Lessons from AgentDeck
description: Control-flow limits revealed by a stop-check experiment and a proposal for the next runner.
---
[AgentDeck](../../projects/agentdeck/) is a desktop AI coding workspace. This case study examines checks used in its development workflow.

**A case study that reads earlier design and execution records alongside an isolated hook experiment, and narrows the claims to what the evidence supports.** Based on an evaluation dated September 17, 2026.

:::note[Scope of the evidence]
Here, a hook is a check script run when work starts or stops. The observations below come from the earlier isolated experiment. The design update dated September 18, 2026 adds no new experiment results or full repository audit.
:::

## Problem · Does a process guarantee an outcome?

AgentDeck’s goal, phase, and resumption records provided context for continuing work. But the wording of checks needed comparison with actual control flow. “Prevent stopping” differs from “limit repetition,” just as “end a session” differs from “achieve a goal.”

## Observation · A branch did not apply the limit

The earlier evaluation repeatedly invoked the stop hook with synthetic inputs.

| Condition | Observation |
| --- | --- |
| Required summary fields present, but timestamp stale | Blocked three times, then escalated on the fourth call |
| Required summary fields missing | Blocked all five times and remained active at a cumulative count of five |

The missing-fields branch incremented the counter and returned immediately, never reaching the repetition-limit check below it. This shows why check order matters.

**The observation establishes a path where the limit was not applied. It does not show a real model autonomously looping forever.** This was neither a full agent run nor a comparison of models.

[View the measurement excerpt (JSON)](../../evidence/agentdeck-stop-gate-excerpt.json)

## Design choice · Connect completion to the code

The next runner is proposed to manage state transitions and eligibility for completion independently of AI self-reports. It would apply limits on every failure branch and tie results to the code version checked. After a code change, previous verification cannot establish that the current work is complete.

This architecture is a **proposal**. It does not mean that a working runner has been implemented on this site.

## What to keep · What to reconsider

| Evidence to retain | Process to revisit |
| --- | --- |
| Goals and observable completion criteria | The same planning, review, and revision split for every task |
| Actual check results and the code checked | A mandatory new session for every phase |
| Short resumption records including reasons | Judging authority by the number of decisions rather than their significance |
| Failure and time limits | Rules whose usefulness has not been reassessed with newer models |

There is no comparative evidence here that more phases or agents are better. Preserve useful explanations and constraints while examining both the costs and benefits of the process.

## Application · Reuse execution, verify completion

**Proposed application:** Retain the Claude Agent SDK connection and use Codex App Server when adding Codex. Keep AgentDeck’s shared responsibilities focused on goals, verification, and resumption. The [design choices](../../design/decisions/) explain the tradeoffs; this is not a completed integration.

**The earlier refinement branch is on hold, with reuse still possible.** It has not been selected as the next starting point or marked for disposal. Its code, documents, and tests remain available for comparison after the new design is clear.

<div class="document-table document-table--steps" role="region" aria-labelledby="application--reuse-execution-verify-completion" tabindex="0">

| Step | What to establish |
| --- | --- |
| **01 · Design** | **Describe responsibilities and completion conditions.** Define the authority boundary, verification evidence, limits, and resumption behavior before implementation. |
| **02 · Reuse** | **Compare against that design.** Inspect candidate branches and select useful code and tests; do not assume a branch name establishes its suitability. |
| **03 · Trial** | **Observe a small real task.** Check missing or failed verification, code changes after a pass, and interruption and resumption. |

</div>

### Compare one factor at a time

Compare the existing and reduced approaches using the same starting code, inputs, model, and completion criteria. Begin with one factor, such as how often a new session starts. Record correctness, regressions, total cost including setup, supervision and resumption, and user interventions.

This comparison has not been performed, so no performance advantage is claimed.

## Sources and limitations

The sources are the earlier evaluation’s `agentdeck-goal-loop-review.md` and `agentdeck-loop-measurements.json`. The linked excerpt includes only two stop-check conditions and source fingerprints from those measurements. It is not a new measurement or a full log. Local paths and unrelated experiment conditions have been omitted.

Related: [TDD and completion checks](../../workflow/verification/)
