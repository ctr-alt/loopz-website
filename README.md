# LOOPZ Website

Official static website for the LOOPZ Android application.

This site is intentionally separate from the Android app project. It does **not** modify Android source, Gradle, signing, keystore, or APK build configuration.

## Contents

- `index.html` — Homepage with hero, features, about, and CTA
- `download.html` — Download page with configurable APK metadata
- `privacy.html` — Preliminary privacy policy based on verified repository audit findings
- `faq.html` — Frequently asked questions
- `changelog.html` — Release notes
- `site.config.js` — **Single configuration file for APK URL and release metadata**
- `assets/css/styles.css` — Styles
- `assets/js/main.js` — Navigation, config rendering, download behavior, copy/reveal helpers
- `assets/images/` — Brand assets copied from `/brand` (logo/mark/wordmark/icon)
- `assets/fonts/` — Outfit font files copied from `/brand/fonts`

## Configure the APK download

Edit `site.config.js` before publishing:

```js
window.LOOPZ_CONFIG = {
  apkUrl: "https://official-domain.example/loopz-1.1.0.apk", // real HTTPS URL
  apkFileSize: "XX MB",
  releaseDate: "YYYY-MM-DD",
  minAndroidVersion: "Android X+ (API XX)",
  sha256: "VERIFIED_SHA256_CHECKSUM",
  supportEmail: "support@example.com",
  version: "1.1.0"
};
```

### Important behavior

- The download button **does not** point to a fake/broken link when `apkUrl` is not configured.
- Until `apkUrl` is a real `https://` URL and not a placeholder, the button is disabled and shows a temporary message.
- Metadata placeholders are displayed as “To be confirmed” until replaced.

## Local development

No build step is required. This is a static site.

### Option 1: Python (recommended)

From the `loopz-website` directory:

```bash
cd loopz-website
python3 -m http.server 8080
```

Open: `http://localhost:8080`

### Option 2: Node static server

```bash
cd loopz-website
npx serve .
```

### Option 3: VS Code Live Server

Open the `loopz-website` folder and use Live Server.

## Deployment

Because the site is static, deploy the contents of `loopz-website/` to any static host.

### GitHub Pages

1. Push the `loopz-website` contents to a repository (or configure Pages to serve from the folder/branch).
2. In GitHub repository settings, enable **Pages**.
3. Set source to the branch/folder containing these files.
4. Ensure `site.config.js` has the real APK URL and verified metadata before publishing.

### Netlify

1. Create a new Netlify site from Git or drag-and-drop the `loopz-website` folder.
2. Build command: *none*.
3. Publish directory: `loopz-website` (or repository root if only website files are deployed).
4. Update `site.config.js` with official release metadata.

### Vercel

1. Import the project/repo.
2. Framework preset: **Other**.
3. Build command: *none*.
4. Output directory: `loopz-website`.
5. Update `site.config.js` before production release.

### Any static host / S3 / Nginx

Upload all files in `loopz-website/` preserving directory structure. Serve `index.html` as the default document.

## Verification checklist

- [ ] All nav/footer links work.
- [ ] Download button is disabled until real APK URL is configured.
- [ ] `site.config.js` contains real HTTPS APK URL.
- [ ] APK file size, release date, minimum Android version, and SHA-256 are verified.
- [ ] Support email placeholder replaced.
- [ ] Privacy policy legal placeholders confirmed (entity/address/final legal contact).
- [ ] No analytics/ads/backends added.
- [ ] Mobile and desktop responsive checks pass.

## Notes

- Brand assets are copied from the existing project `/brand` directory.
- App mockups on the homepage are **illustrative mockups**, not fabricated screenshots of the real app.
- Privacy content is preliminary and based on verified repository audit findings; developer confirmation items are marked on the privacy page.
