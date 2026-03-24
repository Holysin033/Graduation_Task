@echo off
chcp 65001
echo ===================================
echo 音乐APP数据同步服务启动脚本
echo ===================================

echo 检查Node.js环境...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo 错误: 未安装Node.js或未添加到PATH环境变量中
  echo 请安装Node.js后再运行此脚本
  pause
  exit /b 1
)

echo 检查依赖包是否已安装...
if not exist "node_modules" (
  echo 依赖包未安装，正在安装...
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo 依赖包安装失败，请检查网络连接或手动运行 npm install
    pause
    exit /b %ERRORLEVEL%
  )
  echo 依赖包安装完成
) else (
  echo 依赖包已存在
)

echo.
echo 请选择操作模式:
echo 1. 重新初始化数据库并启动服务...
echo 2. 直接启动服务,不初始化...
echo.

set /p choice=请输入选项(1或2): 

if "%choice%"=="1" (
  echo.
  echo 1. 正在初始化数据库...
  node initdb.js
  if %ERRORLEVEL% NEQ 0 (
    echo 数据库初始化失败，请检查错误信息
    pause
    exit /b %ERRORLEVEL%
  )
  echo 数据库初始化完成
) else if "%choice%"=="2" (
  echo.
  echo 跳过数据库初始化，直接启动服务...
) else (
  echo 无效的选项，请输入1或2
  pause
  exit /b 1
)

echo.
echo 2. 启动后端服务...
echo.
echo 服务启动后，可以通过 http://localhost:3002 访问
echo 按 Ctrl+C 可以终止服务
echo.

node app.js
if %ERRORLEVEL% NEQ 0 (
  echo 服务启动失败，请检查错误信息
  pause
  exit /b %ERRORLEVEL%
)

pause 