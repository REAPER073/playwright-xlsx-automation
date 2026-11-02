@echo off
title Google Test Runner - TC24 (Headed Mode)
color 0B
cd /d "%~dp0\.."
echo ===============================================================================
echo   PLAYWRIGHT AUTOMATION RUNNER (HEADED BROWSER MODE)
echo   Test ID     : TC24
echo   Category    : Security
echo   Title       : XSS injection attempt is safely sanitized
echo   Spec File   : tests/04_edge_cases_and_security.spec.ts
echo ===============================================================================
echo.
echo Launching Chromium browser... Please wait...
echo.
call npx playwright test tests/04_edge_cases_and_security.spec.ts -g "TC24" --headed
echo.
echo ===============================================================================
echo   Test run completed. Press any key to close this console.
echo ===============================================================================
pause >nul
