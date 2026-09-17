---
title: Current choices and when to revisit them
description: Record the choices to retain and the evidence that would justify changing them.
---
This document collects the reasons behind the current design. **The documentation site is implemented; the runner that would control workflow state, verification, and limits is still a proposal.** These choices may change when better evidence is available.

## Put goals and evidence first

**Choice:** Agree on success and failure criteria for important work, and connect completion decisions to check results and the code checked.

**Reason:** AI explanations can differ from actual results. The [AgentDeck case study](../../experiments/agentdeck/) also showed the need to distinguish checks for ending a session from checks for achieving a goal.

**Revisit when:** If checks pass while required behavior is missed, improve the criteria and tests instead of merely adding more checks.

## Adapt process and delegation to the task

**Choice:** Divide a goal into 1–7 phases as needed. The main session chooses the number of agents and sequential or parallel execution.

**Reason:** No comparative evidence establishes that a fixed team or a session reset for each phase helps every task. Preserve important reasons, constraints, and [resumption records](../../workflow/phase-and-resume/) first.

**Revisit when:** Change one process element while holding starting state, model, and completion criteria constant, then compare correctness and total cost. This comparison has not yet been performed.

## Propose that the runner control completion

**Choice:** Handle state transitions, required checks, invalidation of verification after code changes, and attempt and time limits with defined rules.

**Reason:** An early return in one branch bypassed a limit check. Treat AI’s “done” as a verification request and check the conditions on every path.

**Remaining work:** Implement the runner and verify failure branches and resumption scenarios. [TDD and completion checks](../../workflow/verification/) explains the design.

## Manage documentation alongside code

**Choice:** Combine a custom Astro homepage with Starlight Markdown documentation, hosted on GitHub Pages.

**Reason:** Git makes changes reviewable, and static output can be published after validation. The current documentation scope does not require a server, accounts, or a database.

**Constraint:** Search needs an index from a production build. Links, assets, and search must work under GitHub Pages’ repository subpath. Deployment configuration and operating status are recorded in the repository’s deployment guide.

## Topics for further discussion

We will document changed choices, reasons, and unverified assumptions between the earlier design and the current direction. Passing required checks remains a condition of completion. Whether the runner should also enforce the RED → GREEN sequence is still to be discussed.

## When to record a change

For a new experiment or design revision, update the relevant document with **the changed choice, reason, evidence, and remaining limits**. Preserve the conditions and dates of earlier observations, and correct wording that could be mistaken for current state. Simple wording edits do not need a separate decision record.
