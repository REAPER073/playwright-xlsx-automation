@echo off
title Google Test Runner - TC18 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC18
echo   Category    : SERP
echo   Title       : Spelling correction suggestion for misspelled query
echo   Spec File   : tests/03_search_results.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/03_search_results.spec.ts -g "TC18" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
