# Jegan Baskar — Portfolio

A React + Vite portfolio with a React Three Fiber hero (your photo on a
floating 3D card that always crops correctly, no matter what image you swap
in), an animated "plexus" network background, animated typing role text, a
built-in "Jegan AI" chat assistant, a real contact form (via EmailJS), social
links, and every section driven by one config file.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 2. Build for hosting

```bash
npm run build
```

This creates a `dist/` folder. That folder is what you upload to your host
(Netlify, Vercel, GitHub Pages, or any static host tied to your new domain).

- **Netlify / Vercel:** connect the project (or drag-and-drop the `dist`
  folder), build command `npm run build`, publish directory `dist`.
- **Any other static host:** just upload the contents of `dist/` after
  building.

## 3. Edit your content

Everything text/data lives in **`src/data.js`** — name, roles, experience,
internships, education, projects, certifications, contact info, social
links, nav links, stats. No component has hardcoded copy, so editing this
one file updates the whole site.

## 4. Swap your photo

Replace `public/profile.jpg` with a new image (same filename), or change
`personal.profileImage` in `src/data.js` to point at a different file in
`public/`. The 3D card automatically crops any image — portrait, landscape,
square — to fit the frame cleanly, so you never need to pre-crop it.

## 5. Add your resume

Drop a `resume.pdf` into `public/` — the "Download Resume" button already
points at `/resume.pdf`.

There's also a **"View Resume" page** at `/resume` — a clean, formatted
HTML version of your resume (Experience, Education, Certifications,
Skills) built entirely from `src/data.js`, so it always matches the rest
of the site. Edit `src/pages/Resume/Resume.jsx` / `Resume.css` if you want
to change its layout or styling.

Because this adds a second route, the project now uses `react-router-dom`.
SPA-fallback config is already included so `/resume` works when someone
opens it directly (not just by clicking the button) on:
- **Netlify:** `public/_redirects`
- **Vercel:** `vercel.json`
- **Apache hosts:** `public/.htaccess`

If you host somewhere else, look up "SPA fallback" or "rewrite all routes
to index.html" for that provider.

## 6. Set up your contact form (EmailJS)

The contact form works out of the box using `mailto:` (opens the visitor's
email app). To make it send emails directly to your inbox instead:

1. Create a free account at https://www.emailjs.com (200 emails/month free)
2. Add an Email Service (connect Gmail etc.) → copy the **Service ID**
3. Create an Email Template using `{{name}}`, `{{email}}`, `{{subject}}`,
   `{{message}}` as variables → copy the **Template ID**
4. Account → General → copy your **Public Key**
5. Paste all three into `src/config/emailjs.js`

Until you fill those in, the form safely falls back to `mailto:` — nothing
breaks either way.

## 7. Social links

Edit the `socials` array in `src/data.js`. Supported icons: `github`,
`linkedin`, `behance`, `instagram`, `twitter`, `globe`. They show up in the
hero, the footer, and the contact section automatically.

Hovering (or tab-focusing) a social icon shows a small preview card above
it. GitHub's preview photo is pulled automatically from your public GitHub
avatar — nothing to configure. Other platforms (LinkedIn, Behance, etc.)
don't allow that without login, so they show a styled placeholder by
default. To use a real image there instead, drop one into `public/` and add
`previewImage: '/your-file.jpg'` to that entry in `data.js`.

## 8. Change fonts

Edit `src/config/fonts.js` and update the Google Fonts `<link>` in
`index.html` to match. Every component reads fonts from CSS variables, so
this is the only place you need to touch.

## 9. Add background images per section

Edit `src/config/backgrounds.js`. Drop an image into `public/` (e.g.
`public/bg-hero.jpg`) and set the matching key to `'/bg-hero.jpg'`. Every
section component (`Hero`, `About`, `Experience`, `Internships`,
`Academics`, `Projects`, `Certifications`, `Contact`) already reads from
this file and cover-fits whatever image you drop in. Leave a key `null` to
keep the default themed background.

## 10. The "Jegan AI" assistant

`src/components/AIAssistant` is a free, rule-based chatbot — it answers
questions about skills, current job, responsibilities, internships,
education, individual projects by name, certifications, contact info,
socials, location, availability, and working style, using only
`src/data.js`. No API key, no server, no ongoing cost — safe to leave
running on a public domain forever. To teach it more, add entries to the
`topics` array in `src/components/AIAssistant/qaEngine.js`.

## Project structure

```
src/
  data.js               <- all content lives here (incl. socials)
  config/
    fonts.js            <- font family config
    backgrounds.js      <- per-section background image config
    emailjs.js          <- contact form email service config
    theme.css           <- colors, spacing, type scale (CSS variables)
  components/
    <Section>/
      <Section>.jsx
      <Section>.css      <- every component has its own stylesheet
    shared/
      SocialLinks.jsx    <- reused in Hero, Footer, Contact
      TypedRoles.jsx     <- animated "Full Stack Developer / ..." text
```

## Design notes

Dark ink + warm parchment palette with an amber accent, Fraunces for
headlines, Manrope for body text, JetBrains Mono for labels. A commit-style
timeline rail (git diff `+` markers) runs through your work history, a live
"pulse" dot marks your current role, an animated plexus network sits behind
the hero, and a terminal status bar lives in the footer — a small nod to the
"debugged, refined, shipped" theme.

## Responsiveness

Layout is built with `clamp()` fluid type/spacing and a capped
`--max-width` container, so it scales cleanly from small phones up through
ultra-wide monitors without needing separate breakpoints for "large"
screens. Tested breakpoints: ~480px, ~700px, ~860px, ~900px, and unlimited
above.
