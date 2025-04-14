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

Edit `_site.yml` to control for site parameters, like the theme and the navigation bar. 