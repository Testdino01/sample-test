# Playwright short tests suite

Playwright short automated tests using [Playwright](https://playwright.dev/). This suite contains 10 focused test cases optimized for fast execution (typically 15–20 seconds total on a modern laptop).

---

## Project Structure

- `pages/` — Page Object Models
- `tests/` — Test specifications
- `playwright.config.js` — Playwright configuration
- `playwright-report/` — HTML test reports
- `.github/workflows/test.yml` — CI/CD pipeline

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/)

---

## Installation

```sh
npm install
```

---

## Fast execution

- 10 lean test cases designed to complete in ~15–20 seconds locally
- Parallel execution is enabled by default via Playwright

---

## Quick start (fast)

Run the full 10-case suite with parallel workers for fastest feedback:

```sh
npx playwright test --workers=4
```

---

## What’s included

- 10 lean test cases targeting key flows of the demo store
- Parallel-ready by default via Playwright test runner
- HTML report and JSON report generation for local review and integrations

---

## Local Test Execution

Run all tests:
```sh
npx playwright test
```

View the HTML report:
```sh
npx playwright show-report
```

---

## Testdino Integration

[Testdino](https://testdino.com/) enables cloud-based Playwright reporting.

> **Important:**  
> Make sure your `playwright.config.js` includes both the HTML and JSON reporters.  
> The HTML report and JSON report must be available for Testdino to process your test results.

Example configuration:
```js
reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['json', { outputFile: './playwright-report/report.json' }],
]
```

### Local Execution

After your tests complete and the report is generated in `playwright-report`, upload it to Testdino:

```sh
npx --yes tdpw ./playwright-report --token="YOUR_TESTDINO_API_KEY" --upload-html
```

Replace the token above with your own Testdino API key.

See all available commands:
```sh
npx tdpw --help
```

---

## CI/CD Pipeline Integration

### GitHub Actions

Add the following step to your workflow after tests and report generation:

```yaml
- name: Send Testdino report
  run: |
    npx --yes tdpw ./playwright-report --token="YOUR_TESTDINO_API_KEY" --upload-html
```

Ensure your API key is correctly placed in the command.

---

## Continuous Integration

Automated test runs and report merging are configured in `.github/workflows/test.yml`.

---

## Contributing

Pull requests and issues are welcome!

---

## License

MIT
