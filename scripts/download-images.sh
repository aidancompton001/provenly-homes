#!/bin/bash
# ============================================================
# Provenly Homes - Image Placeholder Generator
# ============================================================
#
# The original site (provenlyhomes.de) is built on Framer, which
# loads all images dynamically via client-side JavaScript using
# their CDN (framerusercontent.com). These URLs are not accessible
# via standard server-side fetching/scraping.
#
# This script generates colored placeholder images with text labels
# so the site rebuild can proceed with proper layout while waiting
# for original assets from the CEO/design team.
#
# Requirements: ImageMagick (convert/magick command)
# Install:
#   Windows: winget install ImageMagick.ImageMagick
#   macOS:   brew install imagemagick
#   Linux:   sudo apt install imagemagick
#
# Usage: bash scripts/download-images.sh
# ============================================================

set -e

# Base output directory
IMG_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/images"
mkdir -p "$IMG_DIR"

# Check for ImageMagick (note: on Windows, 'convert' is a disk utility, not ImageMagick)
if command -v magick &> /dev/null && magick -version &> /dev/null; then
    CONVERT="magick"
else
    echo "============================================"
    echo "ImageMagick not found."
    echo "Falling back to HTML placeholder generation."
    echo "============================================"
    CONVERT=""
fi

# Color palette (Provenly Homes brand-adjacent)
COLOR_HERO="#1a1a2e"
COLOR_PROPERTY="#2d3436"
COLOR_INTERIOR="#636e72"
COLOR_ICON="#dfe6e9"
COLOR_DASHBOARD="#0984e3"
COLOR_MISC="#6c5ce7"
TEXT_COLOR="white"

# Function to create a placeholder image with ImageMagick
create_placeholder() {
    local filename="$1"
    local width="$2"
    local height="$3"
    local bg_color="$4"
    local label="$5"
    local filepath="$IMG_DIR/$filename"

    if [ -n "$CONVERT" ]; then
        $CONVERT -size "${width}x${height}" "xc:${bg_color}" \
            -gravity center \
            -fill "$TEXT_COLOR" \
            -font "Arial" \
            -pointsize $(( height / 10 )) \
            -annotate +0+0 "$label" \
            "$filepath"
        echo "[OK] $filename (${width}x${height})"
    else
        # No ImageMagick - track for HTML fallback
        echo "$filename|$width|$height|$bg_color|$label" >> "$IMG_DIR/.placeholder-manifest.txt"
        echo "[SKIP] $filename - will use HTML fallback"
    fi
}

echo ""
echo "================================================"
echo " Provenly Homes - Placeholder Image Generator"
echo "================================================"
echo " Output: $IMG_DIR"
echo ""

# Clear manifest if using HTML fallback
[ -z "$CONVERT" ] && rm -f "$IMG_DIR/.placeholder-manifest.txt"

# --------------------------------------------------
# HOMEPAGE ASSETS
# --------------------------------------------------
echo "--- Homepage Assets ---"

create_placeholder "logo.png" 300 80 "$COLOR_MISC" "PROVENLY HOMES\nLOGO"
create_placeholder "hero-main.jpg" 1920 1080 "$COLOR_HERO" "HERO IMAGE\nKurzzeitvermietung\n1920x1080"
create_placeholder "dashboard-preview.png" 1200 800 "$COLOR_DASHBOARD" "DASHBOARD PREVIEW\nLive-Belegung & Preislogik\n1200x800"
create_placeholder "comparison-chart.png" 1200 600 "$COLOR_MISC" "COMPARISON CHART\nBasis | Management | System"

# Service icons
for icon_name in operations guests cleaning pricing maintenance reporting; do
    create_placeholder "icon-${icon_name}.png" 120 120 "$COLOR_ICON" "${icon_name^^}"
done

# Process steps
create_placeholder "step-1-consultation.jpg" 800 600 "$COLOR_PROPERTY" "STEP 1\nErstgesprach\n& Grundlagen"
create_placeholder "step-2-strategy.jpg" 800 600 "$COLOR_PROPERTY" "STEP 2\nObjektbegehung\n& Strategie"
create_placeholder "step-3-optimization.jpg" 800 600 "$COLOR_PROPERTY" "STEP 3\nUmsetzung &\nOptimierung"

# --------------------------------------------------
# PROPERTY CARD THUMBNAILS (Homepage)
# --------------------------------------------------
echo ""
echo "--- Property Card Thumbnails ---"

create_placeholder "property-rheinabend-suite-card.jpg" 600 400 "$COLOR_PROPERTY" "RHEINABEND SUITE\n62m2 | 2 Zimmer\nKoln-Deutz"
create_placeholder "property-rheinblick-family-card.jpg" 600 400 "$COLOR_PROPERTY" "RHEINBLICK\nFAMILY RESIDENCE\n104m2 | 3 Zimmer"
create_placeholder "property-urban-skyline-card.jpg" 600 400 "$COLOR_PROPERTY" "URBAN SKYLINE\nLOFT\n68m2 | 2 Zimmer"

# --------------------------------------------------
# RHEINABEND SUITE - Detail Page
# --------------------------------------------------
echo ""
echo "--- Rheinabend Suite ---"

create_placeholder "rheinabend-hero.jpg" 1920 1080 "$COLOR_HERO" "RHEINABEND SUITE\nEvening Rhine View\n1920x1080"
for i in $(seq -w 1 6); do
    labels=("" "Living Room" "Bedroom" "Kitchen / Dining" "Bathroom" "Terrace / Rhine View" "Detail Shot")
    create_placeholder "rheinabend-interior-${i}.jpg" 1200 800 "$COLOR_INTERIOR" "RHEINABEND SUITE\nInterior ${i}\n${labels[$((10#$i))]}"
done

# --------------------------------------------------
# RHEINBLICK FAMILY RESIDENCE - Detail Page
# --------------------------------------------------
echo ""
echo "--- Rheinblick Family Residence ---"

create_placeholder "rheinblick-hero.jpg" 1920 1080 "$COLOR_HERO" "RHEINBLICK\nFAMILY RESIDENCE\nRhine Panorama\n1920x1080"
for i in $(seq -w 1 9); do
    labels=("" "Living Area" "Master Bedroom" "Second Bedroom" "Third Bedroom" "Kitchen" "Bathroom 1" "Bathroom 2" "Rooftop Terrace" "Garden")
    create_placeholder "rheinblick-interior-${i}.jpg" 1200 800 "$COLOR_INTERIOR" "RHEINBLICK RESIDENCE\nInterior ${i}\n${labels[$((10#$i))]}"
done

# --------------------------------------------------
# URBAN SKYLINE LOFT - Detail Page
# --------------------------------------------------
echo ""
echo "--- Urban Skyline Loft ---"

create_placeholder "urban-skyline-hero.jpg" 1920 1080 "$COLOR_HERO" "URBAN SKYLINE LOFT\nCity Evening View\n1920x1080"
for i in $(seq -w 1 6); do
    labels=("" "Living Space" "Bedroom" "Work Area" "Kitchen" "Bathroom" "Balcony / City View")
    create_placeholder "urban-skyline-interior-${i}.jpg" 1200 800 "$COLOR_INTERIOR" "URBAN SKYLINE LOFT\nInterior ${i}\n${labels[$((10#$i))]}"
done

# --------------------------------------------------
# SHARED ASSETS
# --------------------------------------------------
echo ""
echo "--- Shared Assets ---"

create_placeholder "og-image.jpg" 1200 630 "$COLOR_HERO" "PROVENLY HOMES\nOpen Graph Image\n1200x630"

# Amenity icons
for amenity in wifi parking checkin terrace garden city-view family; do
    create_placeholder "amenity-${amenity}.png" 80 80 "$COLOR_ICON" "${amenity^^}"
done

# --------------------------------------------------
# HTML FALLBACK (if no ImageMagick)
# --------------------------------------------------
if [ -z "$CONVERT" ] && [ -f "$IMG_DIR/.placeholder-manifest.txt" ]; then
    echo ""
    echo "--- Generating HTML Placeholder Page ---"

    cat > "$IMG_DIR/placeholders.html" << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Provenly Homes - Image Placeholders</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; margin: 2rem; background: #f5f5f5; }
  h1 { color: #1a1a2e; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
  .placeholder {
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: bold; text-align: center;
    border-radius: 8px; padding: 1rem; box-sizing: border-box;
    white-space: pre-line; font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .filename { font-size: 11px; color: #666; margin-top: 4px; word-break: break-all; }
</style>
</head>
<body>
<h1>Provenly Homes - Required Image Assets</h1>
<p>These colored placeholders represent images needed for the website rebuild.
   Please provide original high-resolution files for each.</p>
<div class="grid">
HTMLEOF

    while IFS='|' read -r fname w h color label; do
        aspect_h=$(( (200 * h) / w ))
        cat >> "$IMG_DIR/placeholders.html" << ITEMEOF
  <div>
    <div class="placeholder" style="background:${color}; width:100%; height:${aspect_h}px;">
      ${label}
    </div>
    <div class="filename">${fname} (${w}x${h})</div>
  </div>
ITEMEOF
    done < "$IMG_DIR/.placeholder-manifest.txt"

    cat >> "$IMG_DIR/placeholders.html" << 'HTMLEOF'
</div>
</body>
</html>
HTMLEOF

    rm -f "$IMG_DIR/.placeholder-manifest.txt"
    echo "[OK] Generated placeholders.html - open in browser to see all needed images"
fi

# --------------------------------------------------
# SUMMARY
# --------------------------------------------------
echo ""
echo "================================================"
echo " DONE"
echo "================================================"
total=$(find "$IMG_DIR" -type f \( -name "*.jpg" -o -name "*.png" \) 2>/dev/null | wc -l)
echo " Generated: $total placeholder images"
echo " Location:  $IMG_DIR"
echo ""
echo " IMPORTANT: These are PLACEHOLDERS only."
echo " The original Framer site serves images via"
echo " client-side JS (framerusercontent.com CDN)."
echo " URLs cannot be extracted via server-side fetch."
echo ""
echo " Ask the CEO/design team for original assets."
echo " See: public/images/placeholder.txt for full list."
echo "================================================"
