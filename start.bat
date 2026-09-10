@echo off
title Tamil AI Government Scheme Navigator
echo ====================================================
echo   Tamil AI Government Scheme Navigator Launcher
echo ====================================================
echo.

:: Start Backend API Server in a new window
echo Starting Backend API Server on http://localhost:5000 ...
start "Tamil Scheme Server" cmd /k "cd /d %~dp0server && node src/index.js"

:: Start Frontend Vite Dev Server in a new window
echo Starting Frontend Client on http://localhost:5173 ...
start "Tamil Scheme Client" cmd /k "cd /d %~dp0client && npm.cmd run dev"

:: Wait 2 seconds and open browser
timeout /t 2 /nobreak >nul
echo Opening application in browser...
start http://localhost:5173/

echo.
echo Application is running!
echo Access the site at: http://localhost:5173/
