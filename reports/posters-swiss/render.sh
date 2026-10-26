#!/bin/sh
# Render each poster HTML here to PDF (A0) and a 1600 px JPEG for the site. Fonts are local (Helvetica Neue, Hiragino Sans GB).
cd "$(dirname "$0")"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for f in fact-checking; do
  "$CH" --headless=new --disable-gpu --no-pdf-header-footer --allow-file-access-from-files --print-to-pdf="$PWD/$f.pdf" "file://$PWD/$f.html" 2>/dev/null
  pdftocairo -jpeg -jpegopt quality=88,optimize=y -scale-to-x 1600 -scale-to-y -1 -singlefile "$f.pdf" "$f"
done
