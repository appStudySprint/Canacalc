@echo off
REM 🚗 Cannabis & Fahren - Netlify Deployment Script for Windows
REM This script builds and prepares the app for Netlify deployment

echo 🚗 Building Cannabis & Fahren for Netlify deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version detected
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Run linting
echo 🔍 Running linting...
npm run lint

REM Build the application
echo 🏗️ Building application...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📁 Build output in 'out' directory
    echo.
    echo 🚀 Ready for Netlify deployment!
    echo.
    echo Next steps:
    echo 1. Push your code to GitHub:
    echo    git add .
    echo    git commit -m "Ready for Netlify deployment"
    echo    git push origin main
    echo.
    echo 2. Deploy to Netlify:
    echo    - Go to netlify.com
    echo    - Click "New site from Git"
    echo    - Select your repository
    echo    - Build command: npm run build
    echo    - Publish directory: out
    echo.
    echo 3. Or drag and drop the "out" folder to Netlify for instant deployment
) else (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

pause 