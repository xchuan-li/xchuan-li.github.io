#!/bin/sh
# Render poster.html to poster.pdf (A0) and a half-scale PNG preview. Needs network for Google Fonts.
cd "$(dirname "$0")"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="$PWD/poster.pdf" "file://$PWD/poster.html" 2>/dev/null
pdftocairo -png -r 48 -singlefile poster.pdf poster-preview
