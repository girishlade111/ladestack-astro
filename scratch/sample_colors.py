import os
from PIL import Image

def analyze_image(name, path):
    img = Image.open(path).convert('RGB')
    w, h = img.size
    print(f"\n==================== {name} ({w}x{h}) ====================")
    
    # 1. Lamp area (typically around x in [w*0.25, w*0.75], y in [h*0.15, h*0.35])
    # Let's inspect a horizontal slice across the top emitter line
    # Find the y with the most distinct lamp line
    print("--- Searching for lamp emitter line and glow ---")
    cx = w // 2
    for y in range(int(h * 0.1), int(h * 0.4), 5):
        r, g, b = img.getpixel((cx, y))
        print(f"  y={y:3d} (center x={cx}): rgb({r:3d},{g:3d},{b:3d}) #{r:02x}{g:02x}{b:02x}")

    # Let's find headline text colors
    # We look for pixels with high saturation or distinct hue
    print("\n--- Sampling colored text in headline area ---")
    colored_pixels = []
    for y in range(int(h * 0.25), int(h * 0.6), 2):
        for x in range(int(w * 0.2), int(w * 0.8), 2):
            r, g, b = img.getpixel((x, y))
            # Measure saturation / colorness
            max_c = max(r, g, b)
            min_c = min(r, g, b)
            diff = max_c - min_c
            if diff > 40: # colored
                colored_pixels.append((diff, r, g, b, x, y))
                
    colored_pixels.sort(key=lambda p: p[0], reverse=True)
    print("Top 10 most saturated pixels (headline accent / glow):")
    seen_colors = set()
    count = 0
    for diff, r, g, b, x, y in colored_pixels:
        hex_c = f"#{r:02x}{g:02x}{b:02x}"
        if hex_c not in seen_colors:
            seen_colors.add(hex_c)
            print(f"  rgb({r:3d},{g:3d},{b:3d}) {hex_c} at ({x}, {y}) [diff={diff}]")
            count += 1
            if count >= 10:
                break

analyze_image('dark_desktop', r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_9b9fa34e.png')
analyze_image('light_desktop', r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987140_f49af50a.png')
analyze_image('dark_mobile', r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_d17cfd6e.png')
analyze_image('light_mobile', r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_8a372ef7.png')

