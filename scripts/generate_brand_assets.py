import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public", exist_ok=True)
os.makedirs("src/app", exist_ok=True)

# -------------------------------------------------------------
# 1. CREATE SVG ICONS (Vector for browser tab, address bar, search)
# -------------------------------------------------------------

svg_icon = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2448C8"/>
      <stop offset="50%" stop-color="#1A3AA3"/>
      <stop offset="100%" stop-color="#0F226A"/>
    </linearGradient>
    <linearGradient id="silverSheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#EAF0FF"/>
      <stop offset="100%" stop-color="#C8D6FF"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#B6CBFF"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Squircle (Standout Royal Blue) -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>

  <!-- Elegant Inner Border -->
  <rect x="22" y="22" width="468" height="468" rx="92" fill="none" stroke="rgba(255, 255, 255, 0.22)" stroke-width="3"/>

  <!-- Circular Precision Gauge Rings -->
  <circle cx="256" cy="256" r="196" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2"/>
  <circle cx="256" cy="256" r="176" fill="none" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1.5" stroke-dasharray="6 6"/>

  <!-- Top Barber Crown Accent -->
  <g transform="translate(256, 88)" fill="#FFFFFF">
    <path d="M-28 14 L-16 0 L0 10 L16 0 L28 14 L-28 14 Z" opacity="0.9"/>
    <circle cx="0" cy="-2" r="3"/>
    <circle cx="-16" cy="-8" r="2.5"/>
    <circle cx="16" cy="-8" r="2.5"/>
  </g>

  <!-- CROSSED BARBER SCISSOR SHEARS (Precision Blades) -->
  <!-- Left Blade (Pointing Top-Right) -->
  <g>
    <!-- Finger Loop Handle -->
    <path d="M 130 380 C 105 380 90 355 90 330 C 90 305 110 290 135 290 C 152 290 166 300 172 314 L 210 278 L 226 294 L 176 342 C 170 365 152 380 130 380 Z M 132 314 C 120 314 112 322 112 332 C 112 342 122 354 134 354 C 146 354 154 344 154 332 C 154 322 144 314 132 314 Z" fill="url(#silverSheen)" opacity="0.95"/>
    <!-- Blade Shank to Tip -->
    <path d="M 218 284 L 380 136 C 390 126 394 116 388 112 C 382 108 372 112 360 122 L 202 268 Z" fill="url(#silverSheen)"/>
    <!-- Cutting Edge Highlight -->
    <path d="M 224 280 L 386 128 L 380 136 L 218 284 Z" fill="#FFFFFF"/>
  </g>

  <!-- Right Blade (Pointing Top-Left) -->
  <g>
    <!-- Finger Loop Handle with Tang -->
    <path d="M 382 380 C 407 380 422 355 422 330 C 422 305 402 290 377 290 C 360 290 346 300 340 314 L 302 278 L 286 294 L 336 342 C 342 365 360 380 382 380 Z M 380 314 C 392 314 400 322 400 332 C 400 342 390 354 378 354 C 366 354 358 344 358 332 C 358 322 368 314 380 314 Z" fill="url(#silverSheen)" opacity="0.95"/>
    <!-- Scissor Tang extension -->
    <path d="M 416 318 C 428 312 438 318 440 324 C 442 330 434 336 422 338 Z" fill="url(#silverSheen)"/>
    <!-- Blade Shank to Tip -->
    <path d="M 294 284 L 132 136 C 122 126 118 116 124 112 C 130 108 140 112 152 122 L 310 268 Z" fill="url(#silverSheen)"/>
    <!-- Cutting Edge Highlight -->
    <path d="M 288 280 L 126 128 L 132 136 L 294 284 Z" fill="#FFFFFF"/>
  </g>

  <!-- MONOGRAM "S" FOR STANDOUT (Bold Architectural Silhouette) -->
  <g filter="url(#softGlow)">
    <path d="M 298 178 C 298 162 284 150 258 150 C 228 150 208 164 206 186 C 204 208 220 220 250 228 L 270 234 C 294 242 312 256 312 284 C 312 318 284 338 250 338 C 214 338 194 318 192 292 L 224 292 C 226 304 234 314 250 314 C 268 314 278 304 278 286 C 278 270 266 260 240 252 L 222 246 C 196 238 176 224 176 192 C 176 160 206 130 258 130 C 304 130 330 156 330 186 L 298 186 Z" fill="#FFFFFF" fill-rule="evenodd"/>
  </g>

  <!-- Center Pivot Screw & Precision Diamond Star -->
  <circle cx="256" cy="256" r="28" fill="#1A3AA3" stroke="#FFFFFF" stroke-width="4"/>
  <circle cx="256" cy="256" r="20" fill="url(#bgGrad)"/>
  <!-- 4-point Diamond Star Pivot -->
  <path d="M 256 236 L 263 256 L 256 276 L 249 256 Z" fill="#FFFFFF"/>
  <path d="M 236 256 L 256 263 L 276 256 L 256 249 Z" fill="#FFFFFF"/>
  <circle cx="256" cy="256" r="3.5" fill="#1A3AA3"/>

  <!-- Bottom Arch Text: STANDOUT -->
  <g fill="#FFFFFF" font-family="'Archivo', 'Inter Tight', sans-serif" font-weight="800" font-size="28" letter-spacing="0.22em" text-anchor="middle">
    <text x="256" y="440" opacity="0.95">STANDOUT</text>
  </g>
  <g fill="rgba(255, 255, 255, 0.72)" font-family="'Archivo', 'Inter Tight', sans-serif" font-weight="600" font-size="12" letter-spacing="0.28em" text-anchor="middle">
    <text x="256" y="462">BARBERSHOP · 2026</text>
  </g>
</svg>'''

with open("public/icon.svg", "w", encoding="utf-8") as f:
    f.write(svg_icon)

with open("src/app/icon.svg", "w", encoding="utf-8") as f:
    f.write(svg_icon)

print("Saved public/icon.svg and src/app/icon.svg")

# -------------------------------------------------------------
# 2. FULL BRAND LOGO (Horizontal Vector for Navbar & Header)
# -------------------------------------------------------------
svg_full_logo = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 80" width="100%" height="100%">
  <defs>
    <linearGradient id="logoBgGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2448C8"/>
      <stop offset="100%" stop-color="#122873"/>
    </linearGradient>
  </defs>

  <!-- Emblem Mark (68x68) -->
  <g transform="translate(6, 6)">
    <rect width="68" height="68" rx="16" fill="url(#logoBgGrad)"/>
    <rect x="3" y="3" width="62" height="62" rx="13" fill="none" stroke="rgba(255, 255, 255, 0.25)" stroke-width="1"/>
    
    <!-- Stylized Crossed Blades -->
    <path d="M 18 50 L 50 18 M 18 18 L 50 50" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>
    
    <!-- Monogram S -->
    <path d="M 40 24 C 40 21 37 19 33 19 C 28 19 25 21 25 25 C 25 32 43 32 43 43 C 43 47 40 49 35 49 C 29 49 26 46 26 43" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Center Pivot Pin -->
    <circle cx="34" cy="34" r="5" fill="#1A3AA3" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="34" cy="34" r="1.5" fill="#FFFFFF"/>
  </g>

  <!-- Typography: STANDOUT BARBERSHOP -->
  <g transform="translate(88, 22)">
    <text x="0" y="22" font-family="'Archivo', sans-serif" font-weight="800" font-size="24" letter-spacing="0.06em" fill="#1A3AA3">STANDOUT</text>
    <text x="1" y="40" font-family="'Archivo', sans-serif" font-weight="600" font-size="10.5" letter-spacing="0.22em" fill="#6E82B8">BARBERSHOP · EST. 2026</text>
  </g>
</svg>'''

with open("public/logo.svg", "w", encoding="utf-8") as f:
    f.write(svg_full_logo)

# Also a white inverted version of the full logo for dark backgrounds
svg_full_logo_white = svg_full_logo.replace('fill="#1A3AA3"', 'fill="#FFFFFF"').replace('fill="#6E82B8"', 'fill="rgba(255, 255, 255, 0.72)"')
with open("public/logo-white.svg", "w", encoding="utf-8") as f:
    f.write(svg_full_logo_white)

print("Saved public/logo.svg and public/logo-white.svg")

# -------------------------------------------------------------
# 3. RASTER ICON GENERATOR (PIL with 4x supersampling)
# -------------------------------------------------------------

def create_emblem_image(size=512):
    # Render at 2x resolution (1024x1024) then resize with Lanczos for flawless edges
    render_size = 1024
    img = Image.new("RGBA", (render_size, render_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Base Squircle / Rounded Rect
    corner_radius = int(render_size * 0.22)
    # Background gradient approximation with concentric rounded rectangles
    for step in range(30):
        t = step / 29.0
        # Color interpolation from #2448C8 (36, 72, 200) to #122873 (18, 40, 115)
        r = int(36 + (18 - 36) * t)
        g = int(72 + (40 - 72) * t)
        b = int(200 + (115 - 200) * t)
        inset = int(step * 4)
        if render_size - inset * 2 > 0:
            rad = max(4, corner_radius - inset)
            draw.rounded_rectangle(
                [inset, inset, render_size - inset, render_size - inset],
                radius=rad,
                fill=(r, g, b, 255)
            )

    # 2. Inner border
    b_inset = int(render_size * 0.045)
    b_rad = int(corner_radius * 0.8)
    draw.rounded_rectangle(
        [b_inset, b_inset, render_size - b_inset, render_size - b_inset],
        radius=b_rad,
        outline=(255, 255, 255, 60),
        width=int(render_size * 0.008)
    )

    # 3. Precision Circular Guide Ring
    cx, cy = render_size // 2, render_size // 2
    r_guide = int(render_size * 0.38)
    draw.ellipse(
        [cx - r_guide, cy - r_guide, cx + r_guide, cy + r_guide],
        outline=(255, 255, 255, 35),
        width=int(render_size * 0.004)
    )

    # 4. Crossed Scissor Blades (Thick, iconic geometry)
    blade_width = int(render_size * 0.055)
    tip_dist = int(render_size * 0.38)
    handle_dist = int(render_size * 0.36)

    # Diagonal 1: (cx - handle_dist, cy + handle_dist) -> (cx + tip_dist, cy - tip_dist)
    p1_start = (cx - handle_dist, cy + handle_dist)
    p1_end = (cx + tip_dist, cy - tip_dist)
    draw.line([p1_start, p1_end], fill=(255, 255, 255, 255), width=blade_width)

    # Diagonal 2: (cx + handle_dist, cy + handle_dist) -> (cx - tip_dist, cy - tip_dist)
    p2_start = (cx + handle_dist, cy + handle_dist)
    p2_end = (cx - tip_dist, cy - tip_dist)
    draw.line([p2_start, p2_end], fill=(255, 255, 255, 255), width=blade_width)

    # Finger loop circles at bottom handles
    loop_r = int(render_size * 0.09)
    loop1_c = (cx - int(render_size * 0.28), cy + int(render_size * 0.28))
    loop2_c = (cx + int(render_size * 0.28), cy + int(render_size * 0.28))

    draw.ellipse([loop1_c[0] - loop_r, loop1_c[1] - loop_r, loop1_c[0] + loop_r, loop1_c[1] + loop_r],
                 outline=(255, 255, 255, 255), width=int(blade_width * 0.8))
    draw.ellipse([loop2_c[0] - loop_r, loop2_c[1] - loop_r, loop2_c[0] + loop_r, loop2_c[1] + loop_r],
                 outline=(255, 255, 255, 255), width=int(blade_width * 0.8))

    # 5. Bold Geometric "S" in Center
    s_top_c = (cx, cy - int(render_size * 0.12))
    s_bot_c = (cx, cy + int(render_size * 0.12))
    s_rad = int(render_size * 0.14)
    s_w = int(render_size * 0.075)

    # Top arc of S (curves right then top then left)
    draw.arc([s_top_c[0] - s_rad, s_top_c[1] - s_rad, s_top_c[0] + s_rad, s_top_c[1] + s_rad],
             start=140, end=380, fill=(255, 255, 255, 255), width=s_w)
    # Bottom arc of S (curves left then bottom then right)
    draw.arc([s_bot_c[0] - s_rad, s_bot_c[1] - s_rad, s_bot_c[0] + s_rad, s_bot_c[1] + s_rad],
             start=-40, end=200, fill=(255, 255, 255, 255), width=s_w)

    # 6. Center Pivot Assembly & Diamond Star
    pivot_r = int(render_size * 0.065)
    draw.ellipse([cx - pivot_r, cy - pivot_r, cx + pivot_r, cy + pivot_r],
                 fill=(26, 58, 163, 255), outline=(255, 255, 255, 255), width=int(render_size * 0.012))

    # 4-Point Diamond Star at center
    d_len = int(render_size * 0.045)
    d_wid = int(render_size * 0.015)
    draw.polygon([(cx, cy - d_len), (cx + d_wid, cy), (cx, cy + d_len), (cx - d_wid, cy)], fill=(255, 255, 255, 255))
    draw.polygon([(cx - d_len, cy), (cx, cy + d_wid), (cx + d_len, cy), (cx, cy - d_wid)], fill=(255, 255, 255, 255))

    # Resize to requested output size
    if size != render_size:
        return img.resize((size, size), Image.Resampling.LANCZOS)
    return img

# Generate all standard web & app icon sizes
icon_512 = create_emblem_image(512)
icon_512.save("public/icon-512.png", "PNG")

icon_192 = create_emblem_image(192)
icon_192.save("public/icon-192.png", "PNG")

apple_icon = create_emblem_image(180)
apple_icon.save("public/apple-touch-icon.png", "PNG")

favicon_48 = create_emblem_image(48)
favicon_32 = create_emblem_image(32)
favicon_32.save("public/favicon-32x32.png", "PNG")

favicon_16 = create_emblem_image(16)
favicon_16.save("public/favicon-16x16.png", "PNG")

# Multi-resolution Windows/Google favicon.ico
icon_512.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

print("Generated: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, icon-192.png, icon-512.png")

# -------------------------------------------------------------
# 4. OPENGRAPH / SOCIAL PREVIEW CARD (1200x630)
# -------------------------------------------------------------
og = Image.new("RGBA", (1200, 630), (255, 255, 255, 255))
og_draw = ImageDraw.Draw(og)

# Background subtle gradient
for x in range(1200):
    t = x / 1200.0
    r = int(255 + (244 - 255) * t)
    g = int(255 + (247 - 255) * t)
    b = int(255 + (255 - 255) * t)
    og_draw.line([(x, 0), (x, 630)], fill=(r, g, b, 255))

# Subtle blue border
og_draw.rectangle([16, 16, 1184, 614], outline=(26, 58, 163, 60), width=3)
og_draw.rectangle([28, 28, 1172, 602], outline=(26, 58, 163, 25), width=1)

# Paste the emblem logo on the left (340x340)
emblem_for_og = create_emblem_image(340)
og.paste(emblem_for_og, (100, 145), emblem_for_og)

# Standout typography and location badges
# Headline & Subheadline
try:
    font_large = ImageFont.truetype("arialbd.ttf", 64)
    font_med = ImageFont.truetype("arialbd.ttf", 26)
    font_small = ImageFont.truetype("arial.ttf", 22)
    font_badge = ImageFont.truetype("arialbd.ttf", 16)
except:
    font_large = ImageFont.load_default()
    font_med = ImageFont.load_default()
    font_small = ImageFont.load_default()
    font_badge = ImageFont.load_default()

# Top pill: STUDIO BARBER RESMI · SUKARAME
og_draw.rounded_rectangle([480, 145, 840, 185], radius=20, fill=(238, 243, 255, 255), outline=(26, 58, 163, 60))
og_draw.text((500, 155), "STUDIO BARBER PRESISI · BANDAR LAMPUNG", fill=(26, 58, 163, 255), font=font_badge)

# Main Title: STANDOUT BARBERSHOP
og_draw.text((480, 205), "STANDOUT", fill=(26, 58, 163, 255), font=font_large)
og_draw.text((480, 285), "BARBERSHOP", fill=(18, 40, 115, 255), font=font_large)

# Description
og_draw.text((480, 380), "Seni Cukur Presisi & Perawatan Pria Modern", fill=(42, 67, 140, 255), font=font_med)
og_draw.text((480, 420), "Ruko Bukit Indah Golf Blok F9, Sukarame · Buka 10.00 – 22.00 WIB", fill=(110, 130, 184, 255), font=font_small)

# Bottom badges row
og_draw.rounded_rectangle([480, 475, 680, 520], radius=10, fill=(26, 58, 163, 255))
og_draw.text((505, 488), "Rating 4.9★ Terpercaya", fill=(255, 255, 255, 255), font=font_badge)

og_draw.rounded_rectangle([700, 475, 930, 520], radius=10, fill=(244, 247, 255, 255), outline=(26, 58, 163, 80))
og_draw.text((725, 488), "@standout_barber ↗", fill=(26, 58, 163, 255), font=font_badge)

og.save("public/og-image.png", "PNG")
print("Generated public/og-image.png (1200x630)")

# -------------------------------------------------------------
# 5. WEB APP MANIFEST (site.webmanifest)
# -------------------------------------------------------------
webmanifest_content = '''{
  "name": "Standout Barbershop Bandar Lampung",
  "short_name": "Standout Barber",
  "description": "Studio cukur rambut pria presisi & perawatan modern di Sukarame, Bandar Lampung.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#1A3AA3",
  "icons": [
    {
      "src": "/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    },
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}'''

with open("public/site.webmanifest", "w", encoding="utf-8") as f:
    f.write(webmanifest_content)

print("Generated public/site.webmanifest")
