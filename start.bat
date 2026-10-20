@echo off
setlocal
title Tamil AI Government Scheme Navigator
echo ====================================================
echo   Tamil AI Government Scheme Navigator Launcher
echo   தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி
echo ====================================================
echo.

cd /d "%~dp0"

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/ to run this project.
    echo.
    pause
    exit /b 1
)

:: 2. Check if dependencies are installed in server\node_modules\express
if not exist "server\node_modules\express" (
    echo [INFO] Installing required server dependencies...
    cd server
    call npm.cmd install
    cd ..
    echo [OK] Dependencies installed successfully.
    echo.
)

:: 3. Start Express server in a new window
echo Starting Tamil Scheme Navigator Server on http://localhost:5000 ...
start "Tamil Scheme Server" cmd /k "cd /d ""%~dp0"" && node server/server.js"

:: 4. Wait for server initialization
echo Waiting for server to initialize...
timeout /t 3 /nobreak >nul

:: 5. Open browser automatically
echo Opening application in your web browser...
start http://localhost:5000/

echo.
echo ====================================================
echo Application is running!
echo URL: http://localhost:5000/
echo.
echo Default Logins:
echo   Admin:   admin@tamilnadugov.in / admin123
echo   Citizen: kavitha@example.com / user123
echo ====================================================
echo.
pause
