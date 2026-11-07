#!/usr/bin/env bash
# Publishes ONLY the site/ folder to the gh-pages branch (GitHub Pages serves that branch).
# Run after committing and pushing your changes:  bash tools/publish-pages.sh
set -euo pipefail
cd "$(dirname "$0")/.."
git subtree split --prefix site -b gh-pages-tmp > /dev/null
git push --force origin gh-pages-tmp:gh-pages
git branch -D gh-pages-tmp > /dev/null
echo "Published site/ to the gh-pages branch."
