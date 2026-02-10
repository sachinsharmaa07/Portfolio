# Sachin Kumar — Portfolio

Minimal card-based portfolio with smooth scroll, dark/light theme, and pure CSS animations.

## Tech Stack

- React 18 + Vite 5
- Lenis (smooth scrolling)
- Pure CSS (custom properties, no frameworks)

## Project Structure

```
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx         # All components
│   └── index.css       # Design system + themes
├── public/
│   └── Sachin_Kumar_CV.pdf
├── vite.config.js
├── vercel.json
└── package.json
```

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## Deploy to Vercel

### Option 1 — Git Integration (Recommended)

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — just click **Deploy**
5. Done. Your site is live at `https://your-project.vercel.app`

Every push to `main` will auto-deploy.

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel            # Follow prompts for first deploy
vercel --prod     # Deploy to production
```

### Custom Domain

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your domain and update DNS records as shown
3. SSL is automatic

## Replacing the CV

Drop your updated PDF into `public/Sachin_Kumar_CV.pdf` (keep the same filename) and redeploy.

## Build Output

```
dist/index.html         ~1 KB
dist/assets/index.css   ~13.5 KB (gzip: 3.4 KB)
dist/assets/index.js    ~174 KB  (gzip: 55 KB)
```
