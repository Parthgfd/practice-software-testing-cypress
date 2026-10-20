# Cypress Automation Framework — Practice Software Testing

An end-to-end test automation framework built using **Cypress, JavaScript, and Node.js** to automate UI and API testing for the Practice Software Testing application.

The project demonstrates Page Object Model (POM), reusable custom commands, fixture-based test data, API testing, network interception, test tagging, Mochawesome reporting, and GitHub Actions CI/CD.

## Tech Stack

- **Language:** JavaScript
- **Automation:** Cypress
- **Runtime:** Node.js
- **Test design:** Page Object Model (POM)
- **Test data:** Cypress fixtures
- **API testing:** `cy.request()`
- **Network testing:** `cy.intercept()`
- **Test selection:** `@cypress/grep`
- **Reporting:** Mochawesome
- **Version control:** Git and GitHub
- **CI/CD:** GitHub Actions

## Framework Structure

```text
config/
  environments.js
  languages.js

cypress/
  e2e/
    api/
    login/
    product/
  fixtures/
  pages/
  api/
  support/

.github/
  workflows/
    cypress.yml
    cypress-smoke.yml

cypress.config.js
package.json
package-lock.json
README.md
```

*The structure above is representative; update it if your actual project differs.*

## Prerequisites

- Node.js and npm
- Git
- A GitHub account to run the CI workflows

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Parthgfd/practice-software-testing-cypress.git
cd practice-software-testing-cypress
npm ci
```

## Running Tests

### Run the API test suite

```bash
npx cypress run --spec "cypress/e2e/api/productsApi.cy.js"
npx cypress open
npx cypress run --browser chrome --expose grepTags="@smoke"
```

### Open Cypress interactively

```bash
npx cypress open
```

### Run tests tagged as smoke tests

```bash
npx cypress run --browser chrome --expose grepTags="@smoke"
```

The smoke-test command requires the existing `@cypress/grep` configuration and tests tagged with `@smoke`.

## Test Coverage

The framework includes API and UI automation examples covering areas such as:

- Product listing and search
- API response status and payload validation
- Pagination
- Product lookup using valid and invalid IDs
- UI product behavior
- Login scenarios
- Network interception and stubbing
- Reusable page objects and custom commands

Actual coverage depends on the test cases currently present in the repository.

## Test Reporting

his framework uses Mochawesome to generate HTML and JSON test reports.

Report Configuration

The reporter is configured in cypress.config.js:

Report directory: mochawesome-report/

HTML output: enabled

JSON output: enabled

Video recording: enabled in Cypress configuration

View Reports Locally

Run the API test suite:

npx cypress run --spec "cypress/e2e/api/productsApi.cy.js"

After execution, check the mochawesome-report/ directory for the generated report files. Open the HTML report in a browser to review test results.

## CI/CD — GitHub Actions
The Cypress Tests workflow uploads the mochawesome-report/ directory as a downloadable artifact.

Open the repository on GitHub.

Select Actions and open a completed Cypress Tests run.

Find the Artifacts section.

Download mochawesome-report and extract the ZIP file.

Open the HTML report in a browser. The JSON file is available for machine-readable test results.

The report upload step uses if: always(), so it runs even when the test step fails. Report availability still depends on whether report files were generated.

### Report Validation

The API workflow has been verified to pass, and its downloaded artifact contains an HTML report that opens successfully and a JSON report.
### API workflow

The `Cypress Tests` workflow runs the API test suite on pushes to the `main` branch.

It installs dependencies with `npm ci`, executes the API tests, and uploads the `mochawesome-report/` folder as a downloadable artifact.

To access the report:

1. Open the repository on GitHub.
2. Select **Actions**.
3. Open a workflow run.
4. Download the `mochawesome-report` artifact, if it was generated and uploaded.

### Browser smoke-test workflow

The separate `Cypress Smoke Tests` workflow can be triggered manually through GitHub Actions. It selects tests tagged `@smoke`.

**Known limitation:** browser tests on the GitHub-hosted runner currently encounter an HTTP 403 response from Cloudflare's security verification. Browser smoke tests are therefore not yet confirmed to pass in that CI environment.

The API workflow passes independently. Browser CI execution requires an authorized test environment that permits the browser requests.

## Security

- Do not commit `.env` files, passwords, API tokens, or other secrets.
- Keep local environment files excluded through `.gitignore`.
- Use GitHub Secrets for credentials required by CI workflows.

## Future Improvements

- Expand reusable API and UI test coverage.
- Improve test-data management and environment configuration.
- Enhance failure diagnostics and report retention.
- Enable browser smoke tests in an authorized CI environment.
- Extend globalization testing across supported locales.

## Author

**Cypress Automation Framework Project**

Built to practice maintainable automation, API testing, reporting, and CI/CD workflows.
