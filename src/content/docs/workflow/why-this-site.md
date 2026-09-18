---
title: Why this site exists
description: The code and documentation problems that led to this site, and what I want to learn from working with AI.
---
I started this site because, as my projects grew, working with AI was becoming harder to manage. Getting code written was only part of the work. I also had to work out what could be reused, which explanations were still accurate, and whether a change was safe to keep.

The aim is to reduce that burden while leaving agents enough freedom to do useful work. I also want software to control the required parts of the process, so following them does not depend entirely on the agent remembering its instructions.

## Where the difficulty came from

In my projects, I encountered code that bundled several responsibilities together and did not make enough use of existing code. A feature could work, yet the next change would be difficult to understand or maintain.

The documentation had a similar problem. Current rules, old plans, and repeated explanations were mixed together. Useful context became harder to find. An agent taking over could follow an outdated description or repeat work that had already been done.

I had to sort through that material, explain the context again, and decide what to trust. As the projects grew, so did the effort needed to make those decisions.

## What I want to improve

I want to be able to understand the intent of a change, find the code it affects, and check its result without reconstructing the whole project each time.

For an agent continuing the work, existing functions, relevant constraints, and verification steps should be easy to find. For me, the important decisions and their consequences should be clear enough to review. Both needs matter when deciding how to organize code and documentation.

## Put required steps under program control

Written instructions can describe a process, but they cannot guarantee that an agent will follow every step. That is why I want more deterministic control over the workflow.

The agent can decide how to implement a change. A program should track the work state, check whether required verification has run against the current code, and enforce completion conditions and retry limits. A report of “done” would trigger those checks. After an interruption, the program would retain the recorded state and attempts already used.

These are intended responsibilities of the proposed runner, not capabilities already provided by this site. Programmed checks can enforce the conditions they cover; they cannot establish that the requirements or tests themselves are sufficient. Important outcomes and decisions still need human judgment.

## Why keep a site

This site gives each topic a place: how work starts, which decisions need input, how work resumes, and how results are checked. Shared explanations can be linked from that place rather than copied into every document.

It also records actual examples, the reasons for a design choice, and the limits of what was tested. Keeping the source in Git lets the documents change alongside the work and preserves the history of those changes.

As a portfolio, it should show the problems I encountered and how I approached them. Proposed designs and measured results need to be distinguishable.

## Leave room to change the process

Some earlier workflow rules were written for the models and tools available at the time. They need to be reconsidered as those tools change. More rules, phases, or agents are not evidence of a better result.

The direction we have agreed on is to define the goal, success criteria, and scope together; let the main agent choose how to work; and check the resulting behavior. Important decisions beyond the delegated scope need discussion. Small, reversible choices should not require another approval each time.

The detailed workflow is still being developed. This site explains it; the runner proposed to control execution and completion has not been implemented.

## What we will check next

Readable code, reuse, focused documentation, and tests are starting points. We still need to see which changes make real tasks easier: whether an agent finds the right place to work, avoids duplicate implementation, and produces results that take less effort to review.

We will use small changes in this site and observations from AgentDeck to refine those criteria. An AI-readiness score alone will not establish that the work has improved.

Continue with the [workflow overview](../overview/), the [AgentDeck case study](../../experiments/agentdeck/), or the [current design choices](../../design/decisions/).
