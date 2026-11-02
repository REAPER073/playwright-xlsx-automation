const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const rootDir = path.resolve(__dirname, '..');
const runnersDir = path.join(rootDir, 'runners');

if (!fs.existsSync(runnersDir)) {
  fs.mkdirSync(runnersDir, { recursive: true });
}

const testCases = [
  { id: 'TC01', cat: 'UI & Layout', title: 'Verify page title contains "Google"', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC02', cat: 'UI & Layout', title: 'Verify current URL is Google domain', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC03', cat: 'UI & Layout', title: 'Verify Google Logo is visible', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC04', cat: 'UI & Layout', title: 'Verify Search input box is visible and enabled', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC05', cat: 'UI & Layout', title: 'Verify "Google Search" and "I\'m Feeling Lucky" buttons are present in DOM', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC06', cat: 'UI & Layout', title: 'Verify header links (Gmail, Images, Sign In) are present', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC07', cat: 'UI & Layout', title: 'Verify footer contains essential legal and info links', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC08', cat: 'UI & Layout', title: 'Responsive check on mobile viewport (375x667)', file: 'tests/01_homepage_ui.spec.ts' },
  { id: 'TC09', cat: 'Search Core', title: 'Search by typing query and pressing Enter key', file: 'tests/02_search_functionality.spec.ts' },
  { id: 'TC10', cat: 'Search Core', title: 'Search by typing query and clicking Search button', file: 'tests/02_search_functionality.spec.ts' },
  { id: 'TC11', cat: 'Search Core', title: 'Verify search suggestions / autocomplete dropdown appears', file: 'tests/02_search_functionality.spec.ts' },
  { id: 'TC12', cat: 'Search Core', title: 'Select suggestion from autocomplete dropdown', file: 'tests/02_search_functionality.spec.ts' },
  { id: 'TC13', cat: 'Search Core', title: 'Verify clearing input with Clear button or backspace', file: 'tests/02_search_functionality.spec.ts' },
  { id: 'TC14', cat: 'Search Core', title: 'Empty search submission remains on homepage', file: 'tests/02_search_functionality.spec.ts' },
  { id: 'TC15', cat: 'Search Core', title: 'Search query value is preserved in results page search bar', file: 'tests/02_search_functionality.spec.ts' },
  { id: 'TC16', cat: 'SERP', title: 'Verify search results contain clickable headings and URLs', file: 'tests/03_search_results.spec.ts' },
  { id: 'TC17', cat: 'SERP', title: 'Verify navigation tabs / filters exist on SERP', file: 'tests/03_search_results.spec.ts' },
  { id: 'TC18', cat: 'SERP', title: 'Spelling correction suggestion for misspelled query', file: 'tests/03_search_results.spec.ts' },
  { id: 'TC19', cat: 'SERP', title: 'Clicking a search result navigates away from Google', file: 'tests/03_search_results.spec.ts' },
  { id: 'TC20', cat: 'Edge Cases', title: 'Nonsense query shows "did not match any documents"', file: 'tests/04_edge_cases_and_security.spec.ts' },
  { id: 'TC21', cat: 'Edge Cases', title: 'Special characters & symbols search handles gracefully', file: 'tests/04_edge_cases_and_security.spec.ts' },
  { id: 'TC22', cat: 'Edge Cases', title: 'International unicode & emojis search', file: 'tests/04_edge_cases_and_security.spec.ts' },
  { id: 'TC23', cat: 'Edge Cases', title: 'Extremely long query (Boundary test, 500+ chars)', file: 'tests/04_edge_cases_and_security.spec.ts' },
  { id: 'TC24', cat: 'Security', title: 'XSS injection attempt is safely sanitized', file: 'tests/04_edge_cases_and_security.spec.ts' },
  { id: 'TC25', cat: 'Security', title: 'SQL injection string handled safely', file: 'tests/04_edge_cases_and_security.spec.ts' },
  { id: 'TC26', cat: 'Navigation', title: '"I\'m Feeling Lucky" button functionality', file: 'tests/05_navigation_and_features.spec.ts' },
  { id: 'TC27', cat: 'Navigation', title: 'Navigate to Google Images via header link', file: 'tests/05_navigation_and_features.spec.ts' },
  { id: 'TC28', cat: 'Navigation', title: 'Advanced search operator (site: filter)', file: 'tests/05_navigation_and_features.spec.ts' },
  { id: 'TC29', cat: 'Accessibility', title: 'Keyboard accessibility: Tab navigation focuses search bar or interactive elements', file: 'tests/05_navigation_and_features.spec.ts' },
];

// 1. Generate individual batch files for each test case
for (const tc of testCases) {
  const batContent = `@echo off
title Google Test Runner - ${tc.id} (Headed Mode)
color 0B
cd /d "%~dp0\\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : ${tc.id}
echo   Category    : ${tc.cat.replace(/&/g, '^&')}
echo   Title       : ${tc.title.replace(/&/g, '^&').replace(/"/g, '')}
echo   Spec File   : ${tc.file}
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test ${tc.file} -g "${tc.id}" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
`;
  const batPath = path.join(runnersDir, `run_${tc.id}.bat`);
  fs.writeFileSync(batPath, batContent, 'utf-8');
}

// Generate run ALL batch file
const allBatContent = `@echo off
title Google Test Runner - ALL TESTS (Headed Mode)
color 0A
cd /d "%~dp0\\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER - ALL 29 TESTS (HEADED BROWSER MODE)
echo ===============================================================================
echo.
echo Launching Playwright Chromium in headed mode...
echo.
call npx playwright test --headed
echo.
echo ===============================================================================
echo   All tests executed. Press any key to close this console.
echo ===============================================================================
pause >nul
`;
fs.writeFileSync(path.join(runnersDir, 'run_ALL_headed.bat'), allBatContent, 'utf-8');

// 2. Build the Excel Sheet with ExcelJS
async function buildWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'SQA Automation Engineer';
  workbook.lastModifiedBy = 'Playwright Test Suite';
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet('Google Test Matrix', {
    views: [{ state: 'frozen', xSplit: 0, ySplit: 5, showGridLines: true }],
  });

  // Title Banner (Row 1-3)
  sheet.mergeCells('A1:G1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = '🌐 Google.com Playwright E2E Test Suite - Interactive Test Runner';
  titleCell.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A73E8' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet.getRow(1).height = 36;

  sheet.mergeCells('A2:G2');
  const subCell = sheet.getCell('A2');
  subCell.value = 'Click the "▶ Run Headed" button in Column F to immediately launch any test case in visible Chromium browser mode.';
  subCell.font = { name: 'Calibri', size: 11, italic: true, color: { argb: 'FF333333' } };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F0FE' } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet.getRow(2).height = 24;

  // Master Run All Button banner on Row 3
  sheet.mergeCells('A3:E3');
  const infoCell = sheet.getCell('A3');
  infoCell.value = 'Total Test Cases: 29 | Status: All Automated | Framework: Playwright TypeScript';
  infoCell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF5F6368' } };
  infoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F3F4' } };
  infoCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

  sheet.mergeCells('F3:G3');
  const runAllCell = sheet.getCell('F3');
  runAllCell.value = {
    text: '🚀 RUN ALL 29 TESTS HEADED',
    hyperlink: 'runners\\run_ALL_headed.bat',
    tooltip: 'Click to run all 29 tests sequentially in headed mode',
  };
  runAllCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  runAllCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF188038' } }; // Google Green
  runAllCell.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet.getRow(3).height = 26;

  sheet.getRow(4).height = 10; // spacer row

  // Table Headers (Row 5)
  const headers = [
    { header: 'Test Case ID', key: 'id', width: 14 },
    { header: 'Category', key: 'cat', width: 22 },
    { header: 'Test Case Description (English)', key: 'title', width: 68 },
    { header: 'Test Spec File', key: 'file', width: 38 },
    { header: 'Playwright Execution Filter', key: 'cmd', width: 30 },
    { header: 'Action (Click to Execute)', key: 'action', width: 22 },
    { header: 'Default Mode', key: 'mode', width: 16 },
  ];

  sheet.getRow(5).values = headers.map(h => h.header);
  sheet.getRow(5).height = 28;

  for (let c = 1; c <= 7; c++) {
    const colHeader = sheet.getRow(5).getCell(c);
    colHeader.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    colHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF202124' } };
    colHeader.alignment = { vertical: 'middle', horizontal: 'center' };
    colHeader.border = {
      top: { style: 'medium', color: { argb: 'FF202124' } },
      bottom: { style: 'medium', color: { argb: 'FF202124' } },
    };
  }

  // Populate Test Cases Rows (Starting row 6)
  testCases.forEach((tc, idx) => {
    const rowNum = 6 + idx;
    const isEven = idx % 2 === 0;
    const bgArgb = isEven ? 'FFFFFFFF' : 'FFF8F9FA';

    const row = sheet.getRow(rowNum);
    row.height = 25;

    // Col 1: ID
    const cellId = row.getCell(1);
    cellId.value = tc.id;
    cellId.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1A73E8' } };
    cellId.alignment = { vertical: 'middle', horizontal: 'center' };

    // Col 2: Category
    const cellCat = row.getCell(2);
    cellCat.value = tc.cat;
    cellCat.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF3C4043' } };
    cellCat.alignment = { vertical: 'middle', horizontal: 'center' };

    // Col 3: Description in English
    const cellTitle = row.getCell(3);
    cellTitle.value = tc.title;
    cellTitle.font = { name: 'Calibri', size: 10, color: { argb: 'FF202124' } };
    cellTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

    // Col 4: Spec File
    const cellFile = row.getCell(4);
    cellFile.value = tc.file;
    cellFile.font = { name: 'Consolas', size: 9, color: { argb: 'FF5F6368' } };
    cellFile.alignment = { vertical: 'middle', horizontal: 'left' };

    // Col 5: Command filter
    const cellCmd = row.getCell(5);
    cellCmd.value = `-g "${tc.id}" --headed`;
    cellCmd.font = { name: 'Consolas', size: 9, color: { argb: 'FF70757A' } };
    cellCmd.alignment = { vertical: 'middle', horizontal: 'center' };

    // Col 6: ACTION BUTTON (Clickable hyperlink styled as button)
    const cellAction = row.getCell(6);
    cellAction.value = {
      text: '▶  Run Headed',
      hyperlink: `runners\\run_${tc.id}.bat`,
      tooltip: `Click to launch ${tc.id} in headed browser mode`,
    };
    cellAction.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cellAction.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A73E8' } };
    cellAction.alignment = { vertical: 'middle', horizontal: 'center' };
    cellAction.border = {
      top: { style: 'thin', color: { argb: 'FF174EA6' } },
      bottom: { style: 'thin', color: { argb: 'FF174EA6' } },
      left: { style: 'thin', color: { argb: 'FF174EA6' } },
      right: { style: 'thin', color: { argb: 'FF174EA6' } },
    };

    // Col 7: Mode
    const cellMode = row.getCell(7);
    cellMode.value = 'Headed (Chrome)';
    cellMode.font = { name: 'Calibri', size: 9, bold: true, color: { argb: 'FF137333' } };
    cellMode.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6F4EA' } };
    cellMode.alignment = { vertical: 'middle', horizontal: 'center' };

    // Background and borders for non-action cells
    [1, 2, 3, 4, 5].forEach(colIndex => {
      const c = row.getCell(colIndex);
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgArgb } };
      c.border = {
        bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        right: { style: 'thin', color: { argb: 'FFE0E0E0' } },
      };
    });
  });

  // Set column widths
  headers.forEach((h, idx) => {
    sheet.getColumn(idx + 1).width = h.width;
  });

  const outputPath = path.join(rootDir, 'Google_Playwright_Test_Cases.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Excel file successfully created at: ${outputPath}`);
}

buildWorkbook().catch(err => {
  console.error('Error generating Excel file:', err);
  process.exit(1);
});
