# mukheshrsv.com — Personal Website

Static personal portfolio site. Hosted free on **GitHub Pages** with custom domain `mukheshrsv.com`.

## Deploy in 5 steps

1. **Create a GitHub repo** named `rsvmukhesh.github.io` (must match your GitHub username exactly).
2. **Push this folder** to that repo:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git remote add origin https://github.com/rsvmukhesh/rsvmukhesh.github.io.git
   git push -u origin main
   ```
3. **Enable GitHub Pages** → repo Settings → Pages → Source: `main` branch, `/ (root)`.
4. **Point your domain DNS** (wherever mukheshrsv.com is registered) — add these records:
   | Type  | Name | Value               |
   |-------|------|---------------------|
   | A     | @    | 185.199.108.153     |
   | A     | @    | 185.199.109.153     |
   | A     | @    | 185.199.110.153     |
   | A     | @    | 185.199.111.153     |
   | CNAME | www  | rsvmukhesh.github.io |
5. Back in GitHub Pages settings, enter `mukheshrsv.com` as the custom domain and **enable HTTPS**.

DNS propagation takes 5–30 minutes. After that, `https://mukheshrsv.com` is live — free forever.

## Local preview

Just open `index.html` in a browser. No build step needed.
