	# Hydindata Website

Modern, accessible, and performant website for Hydindata — AI chatbots, websites, mobile apps, dashboards, and e-commerce solutions.

## 🎯 Project Overview

This website is built with:
- **Pure HTML/CSS/JS** — No frameworks, fast loading
- **Accessibility-first** — WCAG compliant, keyboard navigable, screen reader friendly
- **Modern design** — Clean minimal UI with dark/light mode support
- **SEO-optimized** — Semantic HTML, structured data, meta tags
- **Mobile-responsive** — Works perfectly on all devices

## 📁 Project Structure

```
hydindata-site/
├── index.html              # Homepage
├── services.html           # Services page
├── solutions.html          # Solutions page
├── work.html              # Portfolio/work examples
├── about.html             # About page
├── contact.html           # Contact page
├── robots.txt             # Search engine directives
├── sitemap.xml            # XML sitemap
├── site.webmanifest       # PWA manifest
└── assets/
    ├── css/
    │   └── style.css      # Main stylesheet (minified)
    ├── js/
    │   └── script.js      # Enhanced JavaScript with modern features
    └── img/
        ├── logo.svg       # Company logo (ADD YOUR OWN)
        ├── og-cover.jpg   # Social media preview (ADD YOUR OWN)
        ├── favicon-32.png # Small favicon (ADD YOUR OWN)
        ├── favicon-192.png # Medium icon (ADD YOUR OWN)
        └── favicon-512.png # Large icon (ADD YOUR OWN)
```

## 🚀 Quick Start

1. **Add your images** to `assets/img/`:
   - logo.svg (your logo)
   - og-cover.jpg (1200x630 social preview)
   - favicon files (32, 192, 512px)

2. **Test locally**:
   ```bash
   # Simple Python server
   python3 -m http.server 8000
   
   # Or with Node.js
   npx serve
   ```

3. **Deploy**:
   - Upload to your web host
   - Or use services like Netlify, Vercel, GitHub Pages

## ✨ Features

### JavaScript Enhancements
- **Modern ES6+ class-based architecture**
- **Enhanced mobile navigation** with keyboard support
- **Smart copy-to-clipboard** with fallbacks
- **iOS-aware SMS functionality**
- **Improved accessibility** with focus management
- **Better error handling** throughout

### Accessibility
- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation (Tab, Escape)
- Skip links
- Screen reader optimized
- Focus indicators

### SEO
- Semantic structure
- JSON-LD structured data
- Open Graph meta tags
- Twitter Card support
- XML sitemap
- Canonical URLs

### Performance
- System font stack (no web fonts)
- Minified CSS
- Optimized images (when added)
- No external dependencies
- Fast first contentful paint

## 🎨 Design System

### Colors (CSS Variables)
- **Dark mode** (default): Deep blues, purple/cyan accents
- **Light mode**: Clean whites with blue accents
- Automatic based on system preference

### Typography
- System font stack for performance
- Responsive font sizes with `clamp()`
- Optimal line lengths for readability

### Layout
- Responsive grid system
- Mobile-first approach
- Container max-width: 1120px

## 📱 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 🛠️ Customization

### Update Contact Information
1. Edit phone number in `assets/js/script.js` (line 71)
2. Update email in contact forms and footers

### Change Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --accent: #6ee7ff;  /* Main accent color */
  --accent2: #a78bfa; /* Secondary accent */
  /* etc */
}
```

### Add Analytics
Add your tracking code before `</head>` in each HTML file

## ✅ Pre-Launch Checklist

- [ ] Add all image assets
- [ ] Update contact email/phone
- [ ] Test all forms
- [ ] Check all links
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Verify social preview images
- [ ] Test accessibility with screen reader
- [ ] Validate HTML/CSS
- [ ] Set up SSL certificate

## 📊 Testing

### Accessibility
```bash
# Use axe DevTools or
npx @axe-core/cli https://your-site.com
```

### Performance
- Google Lighthouse (built into Chrome DevTools)
- PageSpeed Insights
- WebPageTest

### Validation
- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

## 🔧 Maintenance

### Regular Updates
- Review and update service offerings
- Add new case studies to Work page
- Keep contact information current
- Monitor and fix broken links
- Update copyright year (auto-updates via JS)

### Performance Monitoring
- Check Core Web Vitals monthly
- Optimize new images before upload
- Monitor page load times
- Review mobile performance

## 💡 Tips

1. **Images**: Always optimize before upload (use TinyPNG, ImageOptim)
2. **Testing**: Test on real devices, not just browser DevTools
3. **Content**: Keep copy concise and benefit-focused
4. **CTAs**: Maintain clear conversion paths on every page
5. **Updates**: Document any custom changes you make

## 📄 License

Copyright © 2025 Hydindata. All rights reserved.

## 🤝 Support

For questions about this website build, contact hello@hydindata.com

---

**Built with care** ✨ Modern, fast, accessible, and ready to convert.
