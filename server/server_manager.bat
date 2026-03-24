@echo off
chcp 936 >nul
title Server Manager

rem 设置服务器路径和参数
set SERVER_PATH=.
set SERVER_PORT=3000
set NODE_ENV=production

echo ======================================
echo        Server Manager
echo ======================================
echo.

rem 检查Node.js是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [Error] Node.js not detected!
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo [Info] Node.js version:
node -v

echo.
echo Please select an option:
echo 1: Start Server
echo 2: Start Dev Server
echo 3: Stop Server
echo 4: Check Status
echo 5: Exit
echo.

choice /c 12345 /n /m "Enter option number (1-5): "
set choice=%errorlevel%

if "%choice%"=="1" (
    call :start_server
) else if "%choice%"=="2" (
    call :start_dev
) else if "%choice%"=="3" (
    call :stop_server
) else if "%choice%"=="4" (
    call :check_status
) else if "%choice%"=="5" (
    exit /b 0
)

goto :eof

:start_server
echo.
echo [Info] Starting server...
echo.

if not exist "%SERVER_PATH%" (
    echo [Error] Server path %SERVER_PATH% does not exist!
    echo Please modify the SERVER_PATH variable in the script.
    pause
    exit /b 1
)

cd /d "%SERVER_PATH%"

rem 检查依赖是否安装
if not exist node_modules (
    echo [Info] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [Error] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo [Success] Dependencies installed!
)

echo [Info] Starting server (Port: %SERVER_PORT%)
set PORT=%SERVER_PORT%
set NODE_ENV=%NODE_ENV%

start "Server" cmd /c "node app.js & pause"
echo.
echo [Success] Server started in a new window!
echo Server URL: http://localhost:%SERVER_PORT%
pause
goto :eof

:start_dev
echo.
echo [Info] Starting development server...
echo.

cd /d "%SERVER_PATH%"

if not exist node_modules (
    echo [Info] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [Error] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo [Success] Dependencies installed!
)

echo [Info] Starting dev server (Port: %SERVER_PORT%)
set PORT=%SERVER_PORT%
set NODE_ENV=development

start "Server Dev Mode" cmd /c "npm run dev & pause"
echo.
echo [Success] Dev server started in a new window!
echo Server URL: http://localhost:%SERVER_PORT%
pause
goto :eof

:stop_server
echo.
echo [Info] Stopping server process...
echo.

setlocal enabledelayedexpansion
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%SERVER_PORT% "') do (
    set pid=%%a
    echo Found process PID: !pid!
    taskkill /f /pid !pid!
    if !errorlevel! equ 0 (
        echo [Success] Server process terminated.
    ) else (
        echo [Warning] Cannot terminate process. Please close the server window manually.
    )
)

if not defined pid (
    echo [Info] No server process found running on port %SERVER_PORT%.
)
endlocal
pause
goto :eof

:check_status
echo.
echo [Info] Checking server status...
echo.

netstat -ano | findstr ":%SERVER_PORT% "
if %errorlevel% equ 0 (
    echo [Info] Server is running on port: %SERVER_PORT%
) else (
    echo [Info] Server is not running. Port %SERVER_PORT% is available.
)

pause
goto :eof