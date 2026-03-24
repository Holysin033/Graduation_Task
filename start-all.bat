@echo off
:: ===================================
:: 音乐APP全服务启动脚本
:: ===================================
::
:: 使用方法：
:: 1. 将start-all.bat放在项目根目录
:: 2. 双击运行start-all.bat
:: 3. 根据提示选择是否初始化数据库
:: 4. 等待服务启动
:: 5. 需要关闭时按任意键
::
:: 注意事项：
:: 1. 确保已安装Node.js
:: 2. 确保项目依赖已正确安装
:: 3. 确保端口3000和3002未被占用
:: 4. 关闭服务时会强制结束所有Node.js进程
:: ===================================

chcp 65001
echo ===================================
echo 音乐APP全服务启动脚本
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
if not exist "backend/node_modules" (
  echo 依赖包未安装，正在安装...
  cd backend
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo 依赖包安装失败，请检查网络连接或手动运行 npm install
    pause
    exit /b %ERRORLEVEL%
  )
  cd ..
  echo 依赖包安装完成
) else (
  echo 依赖包已存在
)

echo.
echo 请选择操作模式:
echo 1. 重新初始化数据库并启动服务...
echo 2. 直接启动，服务不初始化...
echo.

set /p choice=请输入选项(1或2): 

if "%choice%"=="1" (
  echo.
  echo 1. 正在初始化数据库...
  node backend/initdb.js
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
echo 2. 启动所有服务...
echo.

:: 启动所有服务
cd backend
start /b node app.js
cd ../server
start /b server_manager.bat
cd ..

echo.
echo 所有服务已启动:
echo - 后端服务: http://localhost:3002
echo - 服务器管理器: 已启动
echo.
echo 按任意键关闭所有服务...
pause

:: 关闭所有Node.js进程
taskkill /F /IM node.exe
echo 所有服务已关闭
pause 
