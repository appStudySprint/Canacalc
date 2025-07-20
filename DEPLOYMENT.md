# 🚀 Netlify Deployment Guide

## Deploy Cannabis & Fahren to Netlify

This guide will help you deploy your cannabis driving calculator to Netlify.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **Node.js 18+**: Ensure you have Node.js installed

## 🚀 Deployment Steps

### Method 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign in or create an account
   - Click "New site from Git"
   - Choose GitHub as your Git provider
   - Select your repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18` (or latest LTS)

4. **Environment Variables** (if needed)
   - No environment variables required for this app
   - All data is stored locally on the client

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your app

### Method 2: Manual Deploy

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to your Netlify dashboard
   - Drag and drop the `out` folder to the deploy area
   - Your site will be live instantly

## ⚙️ Configuration Files

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
```

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig;
```

## 🔧 Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain name
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Netlify provides free SSL certificates
   - Automatically configured for custom domains

## 📊 Performance Optimization

### Build Optimization
- ✅ Static export for fast loading
- ✅ Optimized images and assets
- ✅ Minified CSS and JavaScript
- ✅ Gzip compression enabled

### Security Headers
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection enabled
- ✅ Content Security Policy
- ✅ Referrer Policy

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (should be 18+)
   - Ensure all dependencies are installed
   - Check for TypeScript errors

2. **Page Not Found**
   - Verify `publish` directory is set to `out`
   - Check redirects configuration
   - Ensure `trailingSlash: true` in next.config.ts

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check that all CSS is being included in the build

### Debug Commands
```bash
# Test build locally
npm run build

# Check build output
ls out/

# Test locally
npx serve out/
```

## 🌐 Post-Deployment

### Features Available
- ✅ Responsive design
- ✅ German language interface
- ✅ Local data storage
- ✅ DSGVO compliance
- ✅ No tracking or analytics

### Monitoring
- Netlify provides built-in analytics
- Check deploy logs for any issues
- Monitor site performance

## 🔒 Privacy & Security

### Data Protection
- ✅ All data stored locally on client devices
- ✅ No server-side data processing
- ✅ No cookies or tracking
- ✅ DSGVO compliant

### Security Features
- ✅ HTTPS enforced
- ✅ Security headers configured
- ✅ Content Security Policy
- ✅ XSS protection

## 📱 Mobile Optimization

- ✅ Responsive design
- ✅ Touch-friendly interface
- ✅ Fast loading times
- ✅ Offline capability (PWA ready)

---

**🎉 Your cannabis driving calculator is now live on Netlify!**

The app provides a privacy-respecting, scientifically-grounded tool for German cannabis users to calculate safe driving times based on German legal requirements and pharmacokinetic research. 