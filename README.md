# About

This is the repository used for hosting my personal website https://martinctc.github.io.

This website was built using RMarkdown, but the blog sub-page (https://martinctc.github.io/blog/) makes use of both Jekyll (a static HTML generator) and RMarkdown.

Please check out <https://github.com/privefl/rmarkdown-website-template> for the original template used to build this site. Also see <https://bookdown.org/yihui/rmarkdown/rmarkdown-site.html>.

# Instructions

To render site, run: 
```R
rmarkdown::render_site(encoding = "UTF-8")
```
This step renders RMarkdown files into static HTML files to be used.

Always render the whole site with `render_site()`. Do **not** render a single page with
`rmarkdown::render('page.Rmd')`: unlike `render_site()`, that defaults to
`self_contained: TRUE` and base64-inlines every image, stylesheet and webfont into the page.
One portfolio re-render done that way took the page from 29 KB to 9.7 MB.

Edit `_site.yml` to control for site parameters, like the theme and the navigation bar. 

To preview locally, serve the folder over HTTP rather than opening the HTML file directly:

```
python -m http.server 8000
```

then browse to http://localhost:8000/portfolio.html. Opening the file over `file://` works
for layout, but YouTube embeds show "Error 153" because that request carries no `Referer`.

Note that the rendered `.html` files are committed to this repository, so any change to an
`.Rmd` file must be re-rendered and the output committed for it to appear on the live site.

`AGENTS.md` records the known gotchas when editing these pages. 