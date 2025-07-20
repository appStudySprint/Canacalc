#!/bin/bash

# 🚗 Cannabis & Fahren - Netlify Deployment Script
# This script builds and prepares the app for Netlify deployment

echo "🚗 Building Cannabis & Fahren for Netlify deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please use Node.js 18+."
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output in 'out' directory"
    echo ""
    echo "🚀 Ready for Netlify deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub:"
    echo "   git add ."
    echo "   git commit -m 'Ready for Netlify deployment'"
    echo "   git push origin main"
    echo ""
    echo "2. Deploy to Netlify:"
    echo "   - Go to netlify.com"
    echo "   - Click 'New site from Git'"
    echo "   - Select your repository"
    echo "   - Build command: npm run build"
    echo "   - Publish directory: out"
    echo ""
    echo "3. Or drag and drop the 'out' folder to Netlify for instant deployment"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi 