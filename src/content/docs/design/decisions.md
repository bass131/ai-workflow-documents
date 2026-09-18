---
title: Current choices and when to revisit them
description: Record the choices to retain and the evidence that would justify changing them.
---
This document collects the reasons behind the current design. **The documentation site is implemented; the runner that would control workflow state, verification, and limits is still a proposal.** These choices may change when better evidence is available.

*Design status: September 18, 2026.*

## Put goals and evidence first

**Choice:** Agree on success and failure criteria for important work, and connect completion decisions to check results and the code checked.

**Reason:** AI explanations can differ from actual results. [AgentDeck](../../projects/agentdeck/) is the desktop AI coding workspace used as a case study here. Its [check-script experiment](../../experiments/agentdeck/) showed the need to distinguish checks for ending a session from checks for achieving a goal.

**Revisit when:** If checks pass while required behavior is missed, improve the criteria and tests instead of merely adding more checks.

## Adapt process and delegation to the task

**Choice:** Divide a goal into 1–7 phases as needed. The main session chooses the number of agents and sequential or parallel execution.

**Reason:** No comparative evidence establishes that a fixed team or a session reset for each phase helps every task. Preserve important reasons, constraints, and [resumption records](../../workflow/phase-and-resume/) first.

**Revisit when:** Change one process element while holding starting state, model, and completion criteria constant, then compare correctness and total cost. This comparison has not yet been performed.

## Reuse official agent runtimes

**Choice:** Keep AgentDeck’s existing Claude Agent SDK connection, and use Codex App Server when adding Codex. AgentDeck’s proposed responsibilities are **goals, verification, and resumption** above those runtimes. The shared workflow controller and Codex integration are not implemented yet.

**Reason:** Rebuilding execution features while keeping up with the official tools adds maintenance work. Reusing them allows development to focus on task criteria, verification, and resumption.

<div class="document-table document-table--comparison" role="region" aria-labelledby="reuse-official-agent-runtimes" tabindex="0">

| Reuse from official tools | Proposed responsibility for AgentDeck |
| --- | --- |
| **Agent execution**<br>Use each provider’s available tool and session capabilities. | **Goals and scope**<br>Keep agreed outcomes, constraints, and optional phase records. |
| **Supported configuration and events**<br>Connect through the provider’s documented interface. | **Verification and completion**<br>Check required results against the actual code before recording completion. |
| **Provider-specific features**<br>Keep useful differences accessible. | **Resumption**<br>Preserve reasons, remaining work, evidence, and consumed limits. |

</div>

**Tradeoff:** Less runtime code to maintain, but available controls and events depend on the provider. Keep the common interface small; task-specific model routing and workflow policy still require design, rather than following automatically from an SDK or App Server connection. The [Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) and [Codex App Server documentation](https://learn.chatgpt.com/docs/app-server) describe the interfaces being considered.

**Revisit when:** A required control or event is missing in an actual task. First identify that gap before expanding the adapter or building a replacement.

## Propose that the runner control completion

**Choice:** Handle state transitions, required checks, invalidation of verification after code changes, and attempt and time limits with defined rules. Keep required policies, trusted results, and official completion records outside the working agent’s write authority.

**Reason:** An early return in one branch bypassed a limit check. Treat AI’s “done” as a verification request and check the conditions on every path.

**Limit:** A skill describes a process; it does not ensure the agent uses it. A CLI, SDK, or App Server connection alone does not prevent bypassing checks. The [verification design](../../workflow/verification/) explains the authority boundary.

**Remaining work:** Implement that boundary and verify failure branches, stale results, and resumption scenarios with a small task. This controls eligibility for completion, not every intermediate action.

## Manage documentation alongside code

**Choice:** Combine a custom Astro homepage with Starlight Markdown documentation, hosted on GitHub Pages.

**Reason:** Git makes changes reviewable, and static output can be published after validation. The current documentation scope does not require a server, accounts, or a database.

**Constraint:** Search needs an index from a production build. Links, assets, and search must work under GitHub Pages’ repository subpath. Deployment configuration and operating status are recorded in the repository’s deployment guide.

## Topics for further discussion

Passing required checks remains a condition of completion. Whether the runner should also enforce the RED → GREEN sequence is unresolved. That choice needs evidence about missed verification and the overhead of enforcing each step.

## When to record a change

For a new experiment or design revision, update the relevant document with **the changed choice, reason, evidence, and remaining limits**. Preserve the conditions and dates of earlier observations, and correct wording that could be mistaken for current state. Simple wording edits do not need a separate decision record.
