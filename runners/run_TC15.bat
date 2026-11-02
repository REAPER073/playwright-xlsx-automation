@echo off
title Google Test Runner - TC15 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC15
echo   Category    : Search Core
echo   Title       : Search query value is preserved in results page search bar
echo   Spec File   : tests/02_search_functionality.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/02_search_functionality.spec.ts -g "TC15" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
