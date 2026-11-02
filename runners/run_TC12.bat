@echo off
title Google Test Runner - TC12 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC12
echo   Category    : Search Core
echo   Title       : Select suggestion from autocomplete dropdown
echo   Spec File   : tests/02_search_functionality.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/02_search_functionality.spec.ts -g "TC12" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
