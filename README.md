# Google.com Playwright Automation Test Suite

Enterprise-grade end-to-end automation test suite for [www.google.com](https://www.google.com) developed with **Playwright (TypeScript)** using the **Page Object Model (POM)** pattern.

---

## 📁 Project Architecture

```
.
├── pages/
│   ├── GoogleHomePage.ts          # Page Object for Google Search Home
│   └── GoogleSearchResultsPage.ts # Page Object for Google Search Results (SERP)
├── tests/
│   ├── 01_homepage_ui.spec.ts     # UI layout, logos, buttons, footer, responsive
│   ├── 02_search_functionality.spec.ts # Core search, suggestions, clear, empty
│   ├── 03_search_results.spec.ts  # SERP verification, tabs, result links, typos
│   ├── 04_edge_cases_and_security.spec.ts # Boundary, unicode, XSS, SQLi, nonsense
│   └── 05_navigation_and_features.spec.ts # "I'm Feeling Lucky", Images, A11y
├── playwright.config.ts           # Playwright runner configuration
└── package.json                   # Dependencies & npm run scripts
```

---

## 🧪 Comprehensive Test Matrix (29 Test Cases)

| Test Case | Category | Description |
| :--- | :--- | :--- |
| **TC01** | UI & Layout | Verify page title contains `"Google"` |
| **TC02** | UI & Layout | Verify current URL is on Google domain |
| **TC03** | UI & Layout | Verify Google Logo is visible |
| **TC04** | UI & Layout | Verify Search input box is visible and enabled |
| **TC05** | UI & Layout | Verify Search buttons are present in DOM |
| **TC06** | UI & Layout | Verify header navigation (Gmail, Images, Sign In) |
| **TC07** | UI & Layout | Verify footer links (Privacy, Terms, About) |
| **TC08** | UI & Layout | Responsive viewport test (mobile simulation) |
| **TC09** | Search Core | Query submission using `Enter` key |
| **TC10** | Search Core | Query submission using "Google Search" button |
| **TC11** | Search Core | Autocomplete / search suggestion dropdown triggers |
| **TC12** | Search Core | Selection and navigation of autocomplete suggestion |
| **TC13** | Search Core | Clear search input with clear button / helper |
| **TC14** | Search Core | Empty search input does not submit invalid query |
| **TC15** | Search Core | Search input preserves query value on results page |
| **TC16** | SERP | Verify organic results contain headings and links |
| **TC17** | SERP | Verify navigation filter tabs (Images, News, Videos) |
| **TC18** | SERP | Spelling suggestion ("Did you mean") for typos |
| **TC19** | SERP | Clicking first search result navigates successfully |
| **TC20** | Edge Cases | Nonsense random query shows "did not match any documents" |
| **TC21** | Edge Cases | Special characters & symbols (`!@#$%^&*()_+`) handling |
| **TC22** | Edge Cases | International Unicode & emojis (`Python 🐍 日本語`) |
| **TC23** | Edge Cases | Boundary test: 500+ character long query string |
| **TC24** | Security | XSS injection sanitization (`<script>alert("XSS")</script>`) |
| **TC25** | Security | SQL injection input handling (`' OR '1'='1' --`) |
| **TC26** | Navigation | "I'm Feeling Lucky" button action |
| **TC27** | Navigation | Header link navigation to Google Images |
| **TC28** | Navigation | Advanced search operator (`site:playwright.dev`) |
| **TC29** | Accessibility | Keyboard navigation / Tab focus traversal |

---

## 📊 Interactive Excel Test Runner

The project includes an Excel workbook: **`Google_Playwright_Test_Cases.xlsx`**
- Lists all 29 test cases in English with full descriptions, categories, and spec file mappings.
- Features styled **Action Buttons (`▶ Run Headed`)** for each test case.
- Clicking any action button immediately launches that specific test case in visible Chromium browser mode.
- Includes a master **`🚀 RUN ALL 29 TESTS HEADED`** button at the top.

---

## 🚀 Running the Tests

### 1. Run all tests (Headless mode)
```bash
npm test
```

### 2. Run tests in Headed mode (Visible browser)
```bash
npm run test:headed
```

### 3. Run interactive Playwright UI mode
```bash
npm run test:ui
```

### 4. Run a specific test suite
```bash
npx playwright test tests/01_homepage_ui.spec.ts
```

### 5. View HTML Test Execution Report
```bash
npm run test:report
```

