@echo off
title Google Test Runner - TC29 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC29
echo   Category    : Accessibility
echo   Title       : Keyboard accessibility: Tab navigation focuses search bar or interactive elements
echo   Spec File   : tests/05_navigation_and_features.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/05_navigation_and_features.spec.ts -g "TC29" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
