# Working on this repo

Personal website (https://martinctc.github.io), built with R Markdown. Rendered `.html`
is **committed to git** — there is no CI, so anything not rendered and committed is not live.
The blog sub-page is a separate Jekyll site; don't touch it.

## Commands

```R
rmarkdown::render_site(encoding = "UTF-8")   # full site
rmarkdown::render('portfolio.Rmd')          # single page, much faster while iterating
```

Local preview with the YouTube embed working:

```
python -m http.server 8000     # then browse http://localhost:8000/portfolio.html
```

## The traps that cost the most time

These are all real bugs hit during the portfolio work. Check them before debugging elsewhere.

**`after_body:` does not add `<script>` tags.** It inlines the file verbatim, so
`portfolio.js` must contain its own `<script>`/`</script>`. Without them the JS renders
as visible page text at the bottom of the page.

**Pandoc breaks raw HTML rows containing `<a>`.** `<a>` is an *inline* tag, so Pandoc
starts in paragraph mode, ends the raw-HTML block at the first blank line, and emits
`<p></a></p>` for the trailing closing anchor. Invalid nesting that browsers silently repair.
Fix: wrap the whole block in `` ```{=html} `` ... `` ``` ``. Keep the block contiguous —
a blank line inside reintroduces the problem. When a rendering oddity looks wrong, reproduce
it in a 10-line standalone `.md` and test variants with `pandoc` directly rather than
guessing at fixes.

**Raw HTML in `.Rmd` must sit at column 0.** Four or more spaces of indent makes Pandoc
read it as a fenced code block.

**`style.css` is shared by index/about/projects.** New rules need a `.pf-` prefix.

**Use px, not rem.** Bootstrap 3 sets the root font-size to 10px, so rem units are wrong here.

**Windows specifics** — the repo path contains spaces and is inside OneDrive:
- Renders with the escaped path, e.g. `file:///C:/Users/martinchan/OneDrive%20-%20Microsoft/...`
- For screenshots with Edge, kill stale processes first (`Get-Process msedge | Stop-Process -Force`)
  and use `Start-Process -Wait`; screenshots are unreliable otherwise.
- Write screenshots to `%TEMP%` then copy into `qa/` — OneDrive locks files mid-write.
- `$pid` is a reserved PowerShell variable. Use another name for a captured PID.
- In PowerShell double-quoted strings a backtick is an escape character, so building a
  literal ``` fence needs the backtick via `[char]96`. A literal `` `{=html} `` string
  silently loses one backtick.

**Console output mangles non-ASCII.** Em-dashes render as `-` in the terminal, which makes
correct text look corrupted. Verify with explicit UTF-8 reads and byte-level comparison,
not visual inspection or `git diff` output:

```powershell
$enc = [System.Text.Encoding]::UTF8
[System.IO.File]::ReadAllText('portfolio.Rmd', $enc)
```
`Get-Content`/`Set-Content` round-trips have also converted em-dashes to hyphens; prefer
the edit tools, and when a file has CRLF endings, match `\r\n` explicitly in replacements.

**YouTube "Error 153" in local preview is a false alarm.** Error 153 means YouTube got no
HTTP `Referer`, which is exactly what happens on `file://`. It works fine over `http://`
and on the deployed site. Don't chase it as a site bug — the embed already carries
`referrerpolicy="strict-origin-when-cross-origin"`. GitHub Pages sends no restrictive
`Referrer-Policy`, so no extra header is needed.

## Working agreements on this site

- **Existing prose is preserved verbatim.** The portfolio author's writing is not to be
  rewritten. When restructuring, audit the diff: the only deletions should be the content
  deliberately relocated or replaced. Verify with a UTF-8 byte comparison against `HEAD`.
- New user-facing copy gets flagged for a voice check before merge.
- Don't merge without explicit approval; confirm whether the request covers opening a PR
  or also merging it.

## Current open work

**PR #3** — `feat/portfolio-netflix-overhaul` -> `master`, pushed, **not merged**.
Tracked in `https://github.com/martinctc/martinctc.github.io/pull/3`.

Branches in play:
- `feat/portfolio-netflix-overhaul` — the PR branch (Netflix-style project rows, `projects.Rmd`)
- `chore/site-refresh-phase1` — an earlier unmerged branch (index/about copy refresh), left alone
- Site publishes from `master`. There is no Actions workflow; `master` *is* the deploy.

Before merging, the one unverified thing is the YouTube embed **on the live deploy** — it has
only been verified over `http://` locally. Merge, then check the deployed portfolio page.

Copilot left two review findings on PR #3; both were valid and are fixed in `da86df3`
(invalid `<p></a></p>` card markup, and arrow buttons that were focusable-but-inert
without JS). The threads show as `outdated`, not `resolved`, so resolve them manually
if you want the PR tidy.

## Site layout

- `index.Rmd`, `about.Rmd`, `portfolio.Rmd`, `projects.Rmd` — page sources (rendered to `.html`)
- `_site.yml` — theme and navbar (navbar changes ripple into every committed `.html`)
- `style.css` — shared stylesheet
- `portfolio.js` — arrow buttons for the project rows; progressive enhancement only
- `qa/` — local QA screenshots, gitignored