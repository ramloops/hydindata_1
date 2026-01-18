# Deployment Guide - Hydindata Website

## Quick Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

1. **Via Drag & Drop**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up (free)
   - Drag the entire `hydindata-site` folder onto Netlify
   - Your site is live instantly!

2. **Custom domain**:
   - Go to Domain Settings in Netlify
   - Add your domain (hydindata.com)
   - Update DNS records as instructed

### Option 2: Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd hydindata-site
vercel
```

### Option 3: Traditional Hosting (cPanel, FTP)

1. Connect via FTP to your hosting
2. Upload all files to `public_html/` or `www/`
3. Maintain the directory structure
4. Set permissions: Files 644, Directories 755

### Option 4: GitHub Pages (Free)

1. Create GitHub repository
2. Upload all files
3. Settings > Pages > Select main branch
4. Site live at: `username.github.io/repo-name`

## Pre-Deployment Checklist

### Required: Add Images
- [ ] `assets/img/logo.svg` - Your logo
- [ ] `assets/img/og-cover.jpg` - Social preview (1200x630px)
- [ ] `assets/img/favicon-32.png` - Small favicon
- [ ] `assets/img/favicon-192.png` - Medium icon
- [ ] `assets/img/favicon-512.png` - Large icon

### Update Contact Info
- [ ] Phone: Edit `assets/js/script.js` line 71 (currently: 17742322826)
- [ ] Email: Verify hello@hydindata.com is correct
- [ ] Instagram: Update @ramblerinfinite if needed

### Content Review
- [ ] Check all pages for typos
- [ ] Verify all internal links work
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (Chrome DevTools)

### SEO Setup
- [ ] Replace hydindata.com with your actual domain in all files
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (optional)
- [ ] Test social preview with Facebook Debugger

### Technical
- [ ] Enable HTTPS/SSL
- [ ] Test mobile menu functionality
- [ ] Test SMS button
- [ ] Test copy-to-clipboard feature
- [ ] Verify forms work correctly

## DNS Configuration

For custom domain:
```
A Record:    @    →    Your server IP (or Netlify IP)
CNAME:       www  →    your-domain.com
```

## Post-Deployment Testing

1. **All pages load correctly**
2. **Mobile menu works** (click, escape key, click outside)
3. **SMS button opens messaging app**
4. **Copy button copies project brief**
5. **Email links work**
6. **Site loads fast** (under 3 seconds)

## Performance Tips

- Optimize images with TinyPNG.com
- Enable browser caching
- Consider Cloudflare for free CDN
- Monitor with PageSpeed Insights

## Need Help?

Contact hello@hydindata.com

---

**Average deployment time**: 10 minutes  
**Hosting cost**: $0 (with Netlify/Vercel)  
**Maintenance**: Minimal - static files
