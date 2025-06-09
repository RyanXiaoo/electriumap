# Contributing to Electriumap

Thanks for helping build the future of micromobility infrastructure ⚡  

We’re excited to have you onboard.

## Branch Strategy

- Always branch off `dev`
- Follow naming convention:  
  `<team>/<feature-name>` — e.g., `frontend/map-display`
- No direct commits to `main` or `dev`

## Pull Request Workflow

1. Create your feature branch from `dev`
2. Open a PR **into `dev`**
3. At least **1 approval** is required to merge into `dev`
4. Resolve all conversations before merging

> `main` is protected and should only receive PRs from `dev` after testing and review.


## Code Review Ownership

We use [CODEOWNERS](./.github/CODEOWNERS) to assign team-based reviews:

| Directory | Reviewer Team |
|-----------|----------------|
| `/frontend/` | Electriumap Frontend |
| `/backend/`  | Electriumap Backend |
| `/design/`   | Electriumap Design |
| All other | Electriumap Leads |


## PR Checklist

Before submitting:
- [ ] Code builds and runs locally
- [ ] Feature is documented
- [ ] You’ve assigned the correct reviewers
- [ ] (Optional) Screenshots or demos are attached if UI-related


## Repo Structure

```plaintext
/frontend/        # Next.js frontend
/backend/         # Firebase config, Firestore rules
/design/          # Static design assets
/.github/         # CI, CODEOWNERS, templates
