@echo off
setlocal
cd /d "%~dp0"

echo === BuySmart start.bat ===
echo Dir: %CD%
echo.

if not exist ".claude\static-server.js" (
  echo ERROR: .claude\static-server.js not found.
  goto :hold
)

echo Launching http://localhost:8127/  (Ctrl+C to stop)
echo.

REM Give the server ~1s to bind, then open the default browser to the URL
start "" /b cmd /c "timeout /t 1 /nobreak >nul && start "" http://localhost:8127/"

node .claude\static-server.js
echo.
echo === Server exited with code %errorlevel% ===

:hold
echo.
pause
