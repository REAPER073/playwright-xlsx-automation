@echo off
title Google Test Runner - TC16 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC16
echo   Category    : SERP
echo   Title       : Verify search results contain clickable headings and URLs
echo   Spec File   : tests/03_search_results.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/03_search_results.spec.ts -g "TC16" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
