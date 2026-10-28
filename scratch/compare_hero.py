import os
from PIL import Image

def analyze(name, path):
    if not os.path.exists(path):
        print(f"Missing: {path}")
        return
    img = Image.open(path).convert('RGB')
    w, h = img.size
    print(f"\n=== {name} ({w}x{h}) ===")
    
    # Sample top lamp center
    cx = w // 2
    lamp_colors = []
    for y in range(0, min(100, h), 10):
        r, g, b = img.getpixel((cx, y))
        lamp_colors.append((y, r, g, b))
        
    print("Top Lamp center pixels (y=0..100):")
    for y, r, g, b in lamp_colors:
        print(f"  y={y:2d}: rgb({r:3d},{g:3d},{b:3d}) #{r:02x}{g:02x}{b:02x}")
        
    # Sample headline text colors
    print("Colored pixels in headline region:")
    colored = []
    for y in range(int(h * 0.1), int(h * 0.5), 2):
        for x in range(int(w * 0.1), int(w * 0.9), 4):
            r, g, b = img.getpixel((x, y))
            diff = max(r, g, b) - min(r, g, b)
            if diff > 40:
                colored.append((diff, r, g, b, x, y))
    colored.sort(key=lambda p: p[0], reverse=True)
    seen = set()
    for diff, r, g, b, x, y in colored[:8]:
        hex_c = f"#{r:02x}{g:02x}{b:02x}"
        if hex_c not in seen:
            seen.add(hex_c)
            print(f"  rgb({r:3d},{g:3d},{b:3d}) {hex_c} at ({x}, {y})")

analyze('Rendered Desktop Dark', 'scratch/rendered_hero/rendered_desktop_dark.png')
analyze('Rendered Desktop Light', 'scratch/rendered_hero/rendered_desktop_light.png')
analyze('Rendered Mobile Dark', 'scratch/rendered_hero/rendered_mobile_dark.png')
analyze('Rendered Mobile Light', 'scratch/rendered_hero/rendered_mobile_light.png')
