# PPTECH – Second Hand Laptops Website

A static website (plain HTML, CSS and JavaScript). No build step, so it works directly on GitHub Pages.

## Folder structure

```
index.html          the page
css/style.css       all styling
js/config.js        phone, WhatsApp, address, hours, form endpoint  <- edit this first
js/data.js          list of laptop videos and photos                <- edit this second
js/main.js          3D carousels, brand filters, lead form
assets/logo.png     PPTECH logo
assets/images/      laptop photos (placeholders are included)
assets/videos/      laptop videos (add your own .mp4 files)
.nojekyll           tells GitHub Pages to serve the files as they are
```

## 1. Set your details

Open `js/config.js` and replace:

- `phone` with your number, for example `+91 98765 43210`
- `whatsapp` with digits only and country code, for example `919876543210`
- `address` and `hours`

Then search `index.html` for text in `[square brackets]` (warranty months, prices, specs, FAQ answers) and replace it with your real details.

## 2. Add your laptop photos and videos

1. Copy photos into `assets/images/` and videos into `assets/videos/`.
2. Open `js/data.js` and change the file names and titles to match.
3. Keep `brand` as exactly `"HP"`, `"Lenovo"` or `"Dell"`, because the brand filter buttons use it.

Tips:
- Videos: MP4 (H.264), 10 to 20 seconds, under 25 MB each. Videos play muted, which lets browsers autoplay them.
- Photos: JPG or WebP, around 1200 px wide, landscape (3:2 or 16:10 looks best).
- GitHub's website upload accepts files up to 25 MB each. Larger files need git on your computer.
- Until you add real files, the carousels show placeholder pictures, and video slides show an "Add your video" label.

## 3. Put it live on GitHub Pages

1. Create a new repository on GitHub (for example `pptech-laptops`). Make it public.
2. Upload all files from this folder to the repository root (on the repo page: **Add file > Upload files**, then drag in the contents, keeping the folders).
3. Go to **Settings > Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
4. Wait a minute or two. Your site will be at `https://YOUR-USERNAME.github.io/pptech-laptops/`.

To use your own domain, add it under **Settings > Pages > Custom domain** and point your domain's DNS to GitHub Pages.

## 4. Where do leads go?

The form has no server, so it works like this:

- **WhatsApp (works out of the box):** after the visitor submits, a "Send on WhatsApp" button opens WhatsApp with all their details pre-filled, addressed to your number.
- **Email copy (optional):** create a free form at https://formspree.io, copy its form URL, and paste it into `formEndpoint` in `js/config.js`. Each submission is then also emailed to you.

## Local preview

Open `index.html` in your browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.
