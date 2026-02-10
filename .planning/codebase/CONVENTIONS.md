# Coding Conventions

**Analysis Date:** 2026-02-10

## Naming Patterns

**Files:**
- Kebab case with descriptive names: `gsd-tools.js`, `gsd-tools.test.js`, `gsd-check-update.js`
- Test files: `[module].test.js` pattern (e.g., `gsd-tools.test.js`)
- Agent definitions: `gsd-[agent-name].md` (e.g., `gsd-codebase-mapper.md`)
- Phase directories: `[number]-[slug]` (e.g., `01-foundation`, `02.1-hotfix`)
- Markdown documents: UPPERCASE for type (e.g., `SUMMARY.md`, `PLAN.md`, `ROADMAP.md`, `STATE.md`)

**Functions:**
- Camel case: `parseIncludeFlag()`, `safeReadFile()`, `loadConfig()`
- Command functions: `cmd[CommandName]()` pattern (e.g., `cmdGenerateSlug()`, `cmdStateLoad()`, `cmdHistoryDigest()`)
- Internal/helper functions: `[action][Entity]Internal()` (e.g., `resolveModelInternal()`, `findPhaseInternal()`)
- Getter/setter functions: `extract[Entity]()`, `replace[Entity]()` (e.g., `stateExtractField()`, `stateReplaceField()`)

**Variables:**
- Camel case: `tmpDir`, `phase`, `result`, `phaseNum`
- Constants in UPPERCASE: `MODEL_PROFILES`, `TOOLS_PATH`
- Loop/temporary: Single letter acceptable in tight scopes: `i`, `f`, `a` for destructuring/mapping
- Flags: Boolean prefixes: `isGitIgnored`, `raw`, `amend`
- Objects/config: Descriptive names: `defaults`, `stack`, `digest`, `parsed`

**Types/Objects:**
- Keys in YAML/JSON: snake_case (e.g., `model_profile`, `update_available`, `phase_branch_template`)
- Object properties in code: Camel case mirrors YAML keys in some contexts: `modelProfile`, `updateAvailable`

## Code Style

**Formatting:**
- 2-space indentation (observed throughout)
- No explicit formatter detected (not .prettierrc, not biome.json)
- Semicolons used consistently
- Curly braces on same line: `function() {`, `if (condition) {`

**Linting:**
- No .eslintrc or .eslintignore detected
- No explicit linting enforcement observed
- Code follows implicit conventions (camelCase, proper spacing, error handling patterns)

**Line Length:**
- No hard limit enforced, but functions and statements kept reasonably compact
- Complex logic often broken into helper functions rather than nested deeply

## Import Organization

**Order:**
1. Node built-in modules: `require('fs')`, `require('path')`, `require('child_process')`
2. External npm packages: Listed in source but not detected as dependencies (possibly built-in utils)
3. Local modules: `const TOOLS_PATH = path.join(__dirname, ...)`

**Path Aliases:**
- No path aliases detected
- Relative paths used: `path.join(__dirname, ...)`
- Absolute paths for workspaces: `path.join(cwd, '.planning', 'phases')`

**Module Loading:**
- CommonJS: `const fs = require('fs')`
- Node modules: `const { execSync } = require('child_process')`
- Object destructuring on require: `const { test, describe, beforeEach, afterEach } = require('node:test')`

## Error Handling

**Patterns:**
- Explicit error function: `error(message)` - writes to stderr and exits with code 1
  ```javascript
  function error(message) {
    process.stderr.write('Error: ' + message + '\n');
    process.exit(1);
  }
  ```
- Try-catch for expected failures: Wraps file reads, git operations, JSON parsing
  ```javascript
  try {
    // operation
  } catch (err) {
    return { exitCode: err.status ?? 1, stdout: '', stderr: '' };
  }
  ```
- Safe file reading: `safeReadFile()` returns `null` on error, doesn't throw
- Silent fallback: Some errors logged but execution continues (hooks, statusline updates)
- Git errors: Caught and structured as `{ exitCode, stdout, stderr }`

**Validation:**
- Precondition checks before command execution: `if (!text) { error('text required...'); }`
- Guard clauses for missing arguments/options
- No exceptions thrown for validation - use `error()` function instead

## Logging

**Framework:** None - raw `console` methods not used. Uses `process.stdout.write()` and `process.stderr.write()`

**Patterns:**
- Output function: `output(result, raw, rawValue)` - writes JSON by default or raw string if `--raw` flag
  ```javascript
  function output(result, raw, rawValue) {
    if (raw && rawValue !== undefined) {
      process.stdout.write(String(rawValue));
    } else {
      process.stdout.write(JSON.stringify(result, null, 2));
    }
    process.exit(0);
  }
  ```
- Error logging: `error(message)` to stderr
- Hook-related logging: Silent failures preferred (statusline, update checks don't break on errors)
- Process output: Mixed stdout/stderr via execSync operations

## Comments

**When to Comment:**
- Complex algorithm explanations (e.g., context window scaling in `gsd-statusline.js`)
- Non-obvious regex patterns or parsing logic
- Rationale for error handling (e.g., "Silent fail - don't break statusline")
- Section headers for major logical divisions: `// ─── Model Profile Table ─────...`

**JSDoc/TSDoc:**
- Not used in production code
- Plain comments sufficient (JavaScript, not TypeScript)
- File-level comments at top: `#!/usr/bin/env node` and brief purpose statement

**Section Markers:**
- ASCII dividers used to separate major sections:
  ```javascript
  // ─── Helpers ──────────────────────────────────────────────────────────────────
  ```

## Function Design

**Size:** Functions 10-50 lines typical. Longer functions (100+ lines) for complex operations like phase removal or commit handling.

**Parameters:**
- Positional for primary args: `function cmd(cwd, phase, options)`
- Options object for optional/complex parameters: `{ phase, plan, duration, tasks, files }`
- Flag parsing: Custom argument parsing rather than library (minimist, yargs not detected)
- Rest parameters not commonly used

**Return Values:**
- Structured objects: `{ success, output, error }`, `{ slug }`, `{ timestamp }`
- Exit via `output()` or `error()` rather than returning (process-level exit)
- Void functions for I/O operations (file writes, git operations)
- JSON output preferred over plain text (with `--raw` override)

**Async/Promises:**
- Synchronous code only: `execSync()` not `exec()`
- No async/await or Promise patterns detected
- Blocking operations acceptable for CLI tool use case

## Module Design

**Exports:**
- No explicit exports detected (single CLI entry point)
- `main()` function called directly at bottom of file
- Functions organized by command category with clear naming

**Barrel Files:**
- Not applicable (single monolithic CLI tool)
- Could be refactored into multiple modules but not currently

**File Structure:**
- Single file: `gsd-tools.js` (~4200 lines) contains all commands and helpers
- Organized into logical sections with comment dividers
- Test file: `gsd-tools.test.js` pairs with main file

## String Handling

**Patterns:**
- Template literals avoided in favor of concatenation where simple: `'Error: ' + message + '\n'`
- Template literals used for complex strings with embedded variables
- YAML/JSON string interpolation: Careful escaping in nested structures
- Quote style: Single quotes preferred for simple strings, double for JSON

## Argument Parsing

**Pattern:**
- Manual `process.argv.slice(2)` parsing
- Flag detection via `args.indexOf('--flag')`
- Value retrieval: `args[flagIndex + 1]`
- Multiple `switch/case` statements for command routing
- No argument parser library dependency

**Example:**
```javascript
const rawIndex = args.indexOf('--raw');
const raw = rawIndex !== -1;
if (rawIndex !== -1) args.splice(rawIndex, 1);
```

---

*Convention analysis: 2026-02-10*
