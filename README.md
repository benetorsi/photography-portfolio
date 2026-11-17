# Benedetta Torsi — Photography Portfolio

A lightweight photography website built with HTML, CSS, and vanilla JavaScript. Uses eight photographs from the previous website. No build tools, account, or paid dependencies required.

## Preview on your computer

Open `index.html` in your browser. Or, from the project folder, run `python3 -m http.server 8000` and visit http://localhost:8000.

## Change your photographs

1. Copy new JPG, PNG, or WebP files into `assets/photos/`.
2. Open `photos.js` and add or remove entries in `window.PORTFOLIO_PHOTOS`.
3. Change `alt` to describe each image, and optionally add a `caption`.
4. Commit and push your changes to GitHub.

To change the biography, contact email, or navigation, edit `index.html`. To change typography, spacing, and colors, edit `styles.css`.

## Publish free with GitHub Pages

1. Create a free account at https://github.com if you don't have one.
2. Create a **public** repository, e.g. `photography-portfolio`.
3. Upload **the contents of this folder** to the root of the repository (`index.html` must be at the top level), or push them with Git.
4. In your repository, go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
6. Wait for publication. Your site will be at `https://YOUR-USERNAME.github.io/photography-portfolio/`.

The site uses relative paths and works on GitHub Pages project URLs.

## Optional: connect a domain

The old repository contained a `CNAME` file for `benetorsi.com`. It has deliberately **not** been included here because ownership and DNS configuration have not been verified.

1. Check whether you still own `benetorsi.com` at your domain registrar and whether its registration is active. A domain registration usually has an annual fee; GitHub Pages hosting is free for public repositories.
2. In **Settings → Pages → Custom domain**, enter the domain you own and save.
3. Follow GitHub's current instructions for DNS records at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site . DNS records differ for apex domains and `www` subdomains.
4. After DNS is verified and HTTPS becomes available, enable **Enforce HTTPS**.

Never set DNS records until you confirm the domain is yours. If you don't own a domain, keep the free github.io URL.

## Notes

- Keyboard left/right arrows browse photos when the gallery is open.
- The site is static: no database, analytics, trackers, or contact form.
- Images are included as originally provided; consider compressing large files before publishing for faster mobile loading.
- You can replace the biography and image descriptions with your preferred wording before going live.
