@echo off
title Google Test Runner - TC27 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC27
echo   Category    : Navigation
echo   Title       : Navigate to Google Images via header link
echo   Spec File   : tests/05_navigation_and_features.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/05_navigation_and_features.spec.ts -g "TC27" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
