# Testing Patterns

**Analysis Date:** 2026-02-10

## Test Framework

**Runner:**
- Node.js built-in: `node:test` module
- Version: Node.js 18+ (uses native test runner, not Jest or Vitest)
- Config: No separate config file - CLI runner only
- Import: `const { test, describe, beforeEach, afterEach } = require('node:test');`

**Assertion Library:**
- Node.js built-in: `node:assert` module
- Methods: `assert.ok()`, `assert.deepStrictEqual()`, `assert.strictEqual()`
- Import: `const assert = require('node:assert');`

**Run Commands:**
```bash
node gsd-tools.test.js              # Run all tests
node --test gsd-tools.test.js       # Alternative runner syntax
node --test "**/*.test.js"          # Run all test files (glob)
```

## Test File Organization

**Location:**
- Co-located with source: `[module].test.js` in same directory as `[module].js`
- Example: `gsd-tools.js` paired with `gsd-tools.test.js` in `/Users/muhemmedibrahimov/work/courses-for-veterans/.claude/get-shit-done/bin/`

**Naming:**
- Convention: `[module].test.js`
- Specific test file: `gsd-tools.test.js` (52,000+ LOC)

**Structure:**
```
Test file organization:
- Describe blocks group related tests (e.g., 'history-digest command', 'phases list command')
- Each describe has beforeEach/afterEach for setup/cleanup
- Tests within describe block test specific behaviors
```

## Test Structure

**Suite Organization:**
```javascript
describe('history-digest command', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = createTempProject();
  });

  afterEach(() => {
    cleanup(tmpDir);
  });

  test('empty phases directory returns valid schema', () => {
    const result = runGsdTools('history-digest', tmpDir);
    assert.ok(result.success, `Command failed: ${result.error}`);

    const digest = JSON.parse(result.output);
    assert.deepStrictEqual(digest.phases, {}, 'phases should be empty object');
  });
});
```

**Patterns:**
- Setup: `beforeEach()` creates temporary directory structure via `createTempProject()`
  ```javascript
  function createTempProject() {
    const tmpDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'gsd-test-'));
    fs.mkdirSync(path.join(tmpDir, '.planning', 'phases'), { recursive: true });
    return tmpDir;
  }
  ```
- Teardown: `afterEach()` cleans up temp directory via `cleanup()`
  ```javascript
  function cleanup(tmpDir) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
  ```
- Assertion style: Inline comments as second argument: `assert.ok(condition, 'error message')`
- Success detection: Explicit checks for `result.success` before assertions

## Mocking

**Framework:** fs module (file system) is mocked via temporary directories

**Patterns:**
- File system mocking: Create real temp directories and files for integration testing
  ```javascript
  const phaseDir = path.join(tmpDir, '.planning', 'phases', '01-foundation');
  fs.mkdirSync(phaseDir, { recursive: true });
  fs.writeFileSync(path.join(phaseDir, '01-01-SUMMARY.md'), summaryContent);
  ```
- Command execution mocking: CLI commands run in isolated temp directory context
  ```javascript
  function runGsdTools(args, cwd = process.cwd()) {
    try {
      const result = execSync(`node "${TOOLS_PATH}" ${args}`, {
        cwd,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      return { success: true, output: result.trim() };
    } catch (err) {
      return {
        success: false,
        output: err.stdout?.toString().trim() || '',
        error: err.stderr?.toString().trim() || err.message,
      };
    }
  }
  ```

**What to Mock:**
- File system operations (use temp directories)
- External command execution (wrap in runGsdTools helper)
- Git operations (tested via temp dir + execSync)
- JSON parsing (test with real JSON, catch parse errors)

**What NOT to Mock:**
- Core gsd-tools command logic (test via real CLI invocation)
- File system read/write (use real temp files)
- YAML/JSON parsing (use real data structures)
- Error handling (deliberately cause errors to test recovery)

## Fixtures and Factories

**Test Data:**
- Markdown content templates embedded in tests
  ```javascript
  const summaryContent = `---
phase: "01"
name: "Foundation Setup"
dependency-graph:
  provides:
    - "Database schema"
    - "Auth system"
---

# Summary content here
`;
  ```
- YAML frontmatter with nested structures for parsing tests
- Multiple file variations: valid, malformed, missing fields

**Location:**
- Inline in test functions (no separate fixtures directory)
- Reusable patterns: `summaryContent`, `phaseDir`, `runGsdTools()` helper
- Helper functions at top of test file: `createTempProject()`, `cleanup()`, `runGsdTools()`

**Common Test Data:**
- Phase directories: `01-foundation`, `02-api`, `03-ui` (numeric sorting tests)
- Decimal phases: `02.1-hotfix`, `02.2-patch` (edge case testing)
- SUMMARY.md files: Varying frontmatter (valid, malformed, nested structures)
- Multiple plans per phase: Testing wave-based grouping

## Coverage

**Requirements:** No coverage target detected or enforced

**View Coverage:**
- Not implemented (no coverage tool configured)
- Node.js native test runner doesn't include built-in coverage
- Could be added via `--coverage` flag with compatible test tools

## Test Types

**Unit Tests:**
- Scope: Individual command functions tested in isolation
- Approach: CLI commands invoked with specific arguments and temp file states
- Example: `test('empty phases directory returns empty array')`
- Focus: Return values, error handling, data transformation

**Integration Tests:**
- Scope: Full command execution with file system operations
- Approach: Create realistic .planning/phases directory structure, run CLI command, verify output
- Example: `test('nested frontmatter fields extracted correctly')` - creates SUMMARY.md with YAML, verifies extraction
- Focus: End-to-end command behavior, parsing, data aggregation

**E2E Tests:**
- Framework: Not used (CLI tool testing via integration tests is sufficient)

**Test Organization by Command:**
1. `history-digest command` - Parses SUMMARY.md files across phases, tests YAML frontmatter handling
2. `phases list command` - Lists phase directories, tests sorting and filtering
3. `roadmap get-phase command` - Extracts sections from ROADMAP.md
4. `phase next-decimal command` - Calculates next decimal phase number
5. `phase-plan-index command` - Groups plans by wave, detects status
6. `state-snapshot command` - Parses STATE.md fields and tables
7. `summary-extract command` - Extracts specific frontmatter fields

## Common Patterns

**Async Testing:**
- No async/await in tests (all synchronous via `execSync()`)
- Child processes managed via `execSync()` with timeout and stdio redirection
- No promise handling or async setup/teardown

**Error Testing:**
```javascript
test('returns not found for missing phase', () => {
  const result = runGsdTools('roadmap get-phase 99', tmpDir);

  assert.strictEqual(result.success, false, 'Command should fail for missing phase');
  assert.ok(result.error.includes('not found'), 'Error should mention phase not found');
});
```

**Graceful Degradation Testing:**
```javascript
test('malformed SUMMARY.md skipped gracefully', () => {
  // Valid summary
  fs.writeFileSync(path.join(phaseDir, '01-01-SUMMARY.md'), validContent);

  // Malformed summary (no frontmatter)
  fs.writeFileSync(path.join(phaseDir, '01-02-SUMMARY.md'), malformedContent);

  const result = runGsdTools('history-digest', tmpDir);
  assert.ok(result.success, 'Command should succeed despite malformed files');

  const digest = JSON.parse(result.output);
  assert.ok(digest.phases['01'].provides.includes('Valid feature'));
});
```

**Backward Compatibility Testing:**
```javascript
test('flat provides field still works (backward compatibility)', () => {
  fs.writeFileSync(path.join(phaseDir, '01-01-SUMMARY.md'),
    `---
phase: "01"
provides:
  - "Direct provides"
---`);

  const result = runGsdTools('history-digest', tmpDir);
  const digest = JSON.parse(result.output);
  assert.deepStrictEqual(digest.phases['01'].provides, ['Direct provides']);
});
```

**Data Format Variant Testing:**
```javascript
test('inline array syntax supported', () => {
  fs.writeFileSync(path.join(phaseDir, '01-01-SUMMARY.md'),
    `---
phase: "01"
provides: [Feature A, Feature B]
patterns-established: ["Pattern X", "Pattern Y"]
---`);

  const result = runGsdTools('history-digest', tmpDir);
  const digest = JSON.parse(result.output);
  assert.deepStrictEqual(digest.phases['01'].provides.sort(),
    ['Feature A', 'Feature B']);
});
```

## Test Execution Context

**Environment:**
- Tests run in isolated temp directories (`/tmp/gsd-test-*`)
- Working directory: Temp project path, not system root
- File I/O: Real filesystem (no mocking library), deleted after test
- Process spawning: `execSync()` captures output, handles failures

**Test Cleanup:**
- Automatic via `afterEach()` → `cleanup(tmpDir)` → `fs.rmSync(tmpDir, { recursive: true })`
- Prevents temp file accumulation
- Critical for long test runs or CI environments

## Assertion Patterns

**Existence/Boolean:**
```javascript
assert.ok(result.success, `Command failed: ${result.error}`);
assert.ok(digest.phases['01'], 'Phase 01 should exist');
```

**Equality:**
```javascript
assert.strictEqual(digest.decisions.length, 2, 'Should have 2 decisions');
assert.deepStrictEqual(output.directories, ['01-foundation', '02-api', '10-final']);
```

**Array/Object Comparison:**
```javascript
assert.deepStrictEqual(digest.phases, {}, 'phases should be empty object');
assert.deepStrictEqual(digest.tech_stack.sort(), ['jose', 'prisma']);
```

**Inclusion:**
```javascript
assert.ok(
  digest.decisions.some(d => d.decision === 'Use Prisma over Drizzle'),
  'Should contain decision'
);
assert.ok(digest.phases['01'].provides.includes('Valid feature'));
```

---

*Testing analysis: 2026-02-10*
