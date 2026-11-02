@echo off
title Google Test Runner - ALL TESTS (Headed Mode)
color 0A
cd /d "%~dp0\.."
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
