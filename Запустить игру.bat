@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Installing project dependencies...
  call npm install
)

call npm run dev
pause
