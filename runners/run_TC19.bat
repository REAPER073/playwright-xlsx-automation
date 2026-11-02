@echo off
title Google Test Runner - TC19 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC19
echo   Category    : SERP
echo   Title       : Clicking a search result navigates away from Google
echo   Spec File   : tests/03_search_results.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/03_search_results.spec.ts -g "TC19" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
