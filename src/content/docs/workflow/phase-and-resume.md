---
title: Phase records and resuming work
description: Minimal records that carry goals, reasons, verification evidence, and remaining budgets across sessions.
---
A useful resumption record is not a copy of a long conversation. It should let another session determine **what is true now and what to check next**.

## Why divide work into phases?

Each phase produces an outcome that can be checked independently. Use as many phases as needed, up to seven per goal. One phase is enough for a small task. A separate session for every phase is not required.

The following is a **fictional example** for explanation, not a record of actual work or test results.

## Example of a short phase record

```md title="phase-02.md · fictional example"
# 02. Prevent invalid settings from being saved

Purpose: Prevent invalid settings from overwriting existing values.
Completion criteria:
- Empty required values are rejected with an explanation.
- Valid values can be saved and loaded again.
- Existing settings can still be read.

Evidence:
- Checked input: code version R2 + fingerprint of working-tree contents
- RED: The check failed as expected because an empty name was saved.
- GREEN: The same check passed after input validation was added.
- Regression: The existing-settings read check passed on R2.
- Not run: Keyboard navigation to the error location.

Decision and reason:
- Validate before saving to preserve existing values.

Remaining work: Check keyboard behavior; verify the final code again.
Next action: Check whether focus moves to the error message.
Budget used: 2/3 attempts, 18/30 minutes elapsed.
```

The attempts and times are examples. Define actual limits and how time is counted at the start, then preserve those definitions across sessions.

## What must survive a loss of context?

| Record | Why it matters when resuming |
| --- | --- |
| Goal and completion criteria | Determine what must be finished |
| Current phase and remaining work | Avoid repeating finished work or overlooking unfinished work |
| Choices and reasons | Avoid reversing decisions without understanding their constraints |
| Check results and the code checked | Establish whether the evidence still applies |
| Failures, attempts, and budget consumed | Prevent a session change from resetting limits |
| Short summary and next action | Continue instead of repeating the investigation |

## Resume by checking the actual state

1. Read the goal and current phase record.
2. Inspect the current code and changes. The same commit can have a different working tree.
3. Compare the recorded check inputs with the current code.
4. Restore the consumed attempt and time budgets, then take the next action within what remains.

Even if the summary says “complete,” reverify when required checks are missing or the code differs. Context compaction and a new agent do not begin the task anew.

## Where a decision is needed

For small, reversible ambiguities, record the assumption and reason, then proceed. For consequential decisions beyond authority, such as deleting data, explain the options and effects and ask the user. Work independent of that answer can continue.

## Topics for further discussion

We will clarify what belongs in the goal summary versus each phase record, and how to compare records with actual state when resuming. Ending a session and achieving a goal also need distinct treatment. The existing example is explanatory; it does not prescribe a fixed template or default budget.

Related: [Autonomy and decisions to confirm](../autonomy/) · [TDD and completion checks](../verification/)
