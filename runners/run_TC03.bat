@echo off
title Google Test Runner - TC03 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC03
echo   Category    : UI ^& Layout
echo   Title       : Verify Google Logo is visible
echo   Spec File   : tests/01_homepage_ui.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/01_homepage_ui.spec.ts -g "TC03" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
