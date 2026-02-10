# Codebase Concerns

**Analysis Date:** 2026-02-10

## Project Status

**Empty Repository:**
- Current State: Repository contains only GSD framework infrastructure (`.claude/` directory structure)
- Files: `gsd-tools.js`, hook scripts, agent definitions, command templates
- Missing: No actual application code, source files, or project dependencies
- Impact: Unable to analyze code-level technical debt, security issues, or performance bottlenecks

## Critical Missing Components

**No Application Code:**
- Issue: Repository is a framework skeleton with no business logic implementation
- Files: None - `/src`, `/app`, `/lib`, or equivalent directories do not exist
- Impact: Cannot assess code quality, architecture, testing, or integration concerns
- Fix approach: Initialize project structure via `/gsd:new-project` command before running subsequent mappers

**No Package Configuration:**
- Issue: No `package.json`, `pyproject.toml`, `Cargo.toml`, or equivalent present
- Files: None detected
- Impact: No runtime dependencies defined; cannot verify supply chain security or library versions
- Fix approach: Execute project initialization command to create runtime environment

**No Source Files:**
- Issue: Zero `.ts`, `.tsx`, `.js`, `.py`, `.go` files outside of `.claude/` directory
- Files: Cannot enumerate
- Impact: No codebase to analyze for performance, security, or quality concerns
- Fix approach: Create application code after project initialization

## GSD Framework Infrastructure Issues

**Large Tool Binary:**
- Problem: `gsd-tools.js` is ~52K lines (2000+ lines shown in single read), very large CLI utility
- Files: `/Users/muhemmedibrahimov/work/courses-for-veterans/.claude/get-shit-done/bin/gsd-tools.js`
- Cause: Single file handles 40+ commands with no modularization apparent
- Improvement path: Split into modules by command category (state, phase, roadmap, etc.)

**Test Coverage Gap in gsd-tools:**
- Problem: Test file exists but minimal coverage observed
- Files: `/Users/muhemmedibrahimov/work/courses-for-veterans/.claude/get-shit-done/bin/gsd-tools.test.js`
- Risk: Large monolithic tool with only basic history-digest tests shown; many commands untested
- Priority: Medium - Framework stability depends on tool reliability

**Manifest Integrity Risk:**
- Problem: `gsd-file-manifest.json` contains SHA hashes for 125 framework files with no validation mechanism apparent
- Files: `/Users/muhemmedibrahimov/work/courses-for-veterans/.claude/gsd-file-manifest.json`
- Risk: If file is modified, hash mismatch silently ignored; no detected integrity checking
- Current mitigation: None visible
- Recommendations: Add hash verification on framework startup via hook

## No Project Metadata

**Missing Project Definition:**
- Issue: No `.planning/project.md` file exists
- Impact: Project goals, scope, and context undefined
- Risk: Phase planning will lack foundation; decisions not documented
- Safe action: Create project metadata before phase planning

**Missing Roadmap:**
- Issue: No `.planning/ROADMAP.md` file exists
- Impact: No phase structure defined; cannot create phases
- Safe action: Initialize project with proper milestone/phase structure

**Missing State Document:**
- Issue: No `.planning/STATE.md` file exists
- Impact: No tracking of project progress, decisions, metrics
- Safe action: Run `/gsd:new-project` to initialize all required planning documents

## Configuration Fragility

**Hook Dependency:**
- Problem: Startup hooks defined in `.claude/settings.json` execute shell commands
- Files: `/Users/muhemmedibrahimov/work/courses-for-veterans/.claude/settings.json`
- Risk: `gsd-check-update.js` and `gsd-statusline.js` run on every session; failures could block workflows
- Current mitigation: None visible
- Recommendations: Add error handling and fallback behavior to hooks

**Multi-Command Tool Complexity:**
- Problem: `gsd-tools.js` handles both atomic commands and aggregated operations with multiple code paths
- Risk: Changes to one command may break unrelated functionality due to shared state/parsing logic
- Safe modification: Each command modification requires full regression test suite (currently gaps)

## Data Integrity Gaps

**No Validation for Phase Operations:**
- Issue: Phase removal, renumbering, and modification commands operate on filesystem
- Risk: Partial failures (e.g., directory deleted, renumber incomplete) could corrupt project state
- Current mitigation: Unknown
- Recommendations: Implement transaction-like behavior or pre-flight validation

**Frontmatter Parsing Fragility:**
- Problem: Frontmatter CRUD commands (`frontmatter get/set/merge`) depend on YAML parsing
- Risk: Malformed YAML in planning documents could cause silent parsing failures or data loss
- Safe modification: Add schema validation before write operations

## Planning Document Synchronization

**Disk/Roadmap Sync Issues:**
- Problem: Phases stored as directories on disk must match `ROADMAP.md` structure
- Risk: Manual edits to either source could create inconsistency
- Current tooling: `roadmap analyze` and `validate consistency` available but not mandatory
- Recommendations: Add pre-commit hook to validate consistency before accepting changes

## Testing Framework Gaps

**Limited Test Suite:**
- Problem: Only `gsd-tools.test.js` visible; tests shown focus on `history-digest` command only
- Files: `/Users/muhemmedibrahimov/work/courses-for-veterans/.claude/get-shit-done/bin/gsd-tools.test.js`
- Risk: 40+ commands with few visible test cases; regression likelihood high
- Priority: High for framework stability before accepting user input

**No Integration Tests:**
- Issue: Tests operate in isolation with temp directories; no full workflow validation
- Risk: Command sequence failures not detected (e.g., phase create → phase remove → renumber)
- Safe approach: Add workflow-level tests before production use

## Known Limitations (Not Bugs, but Constraints)

**Phase Numbering Decimal System:**
- Constraint: Phase numbers use decimal notation (1.0, 1.1, 1.2, etc.)
- Risk: Complexity in phase insertion/removal renumbering logic
- Workaround: Use decimal phase calculation utility, not manual editing

**Model Profile Resolution:**
- Constraint: Agent model selection depends on `.planning/config.json` profile setting
- Risk: Missing config or invalid profile silently falls back to default
- Safe approach: Always initialize project before running agents

---

*Concerns audit: 2026-02-10*
