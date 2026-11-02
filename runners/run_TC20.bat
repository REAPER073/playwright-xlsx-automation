@echo off
title Google Test Runner - TC20 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC20
echo   Category    : Edge Cases
echo   Title       : Nonsense query shows did not match any documents
echo   Spec File   : tests/04_edge_cases_and_security.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/04_edge_cases_and_security.spec.ts -g "TC20" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
