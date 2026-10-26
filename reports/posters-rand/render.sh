#!/bin/sh
# Render child-reading.html to PDF (A0) and a 1600 px JPEG. Local fonts only (Futura, STKaiti).
cd "$(dirname "$0")"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --no-pdf-header-footer --allow-file-access-from-files --print-to-pdf="$PWD/child-reading.pdf" "file://$PWD/child-reading.html" 2>/dev/null
pdftocairo -jpeg -jpegopt quality=88,optimize=y -scale-to-x 1600 -scale-to-y -1 -singlefile child-reading.pdf child-reading
