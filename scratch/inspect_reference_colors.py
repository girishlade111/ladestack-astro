import os
from PIL import Image

images = {
    'dark_desktop': r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_9b9fa34e.png',
    'dark_mobile': r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_d17cfd6e.png',
    'light_desktop': r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987140_f49af50a.png',
    'light_mobile': r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_8a372ef7.png',
}

for name, path in images.items():
    if not os.path.exists(path):
        print(f"Missing: {name}")
        continue
    img = Image.open(path).convert('RGB')
    w, h = img.size
    print(f"\n=== {name} ({w}x{h}) ===")
    
    # Let's find brightest / most saturated colors in the top half
    # Specifically looking at y between 10% and 40% of height
    pixels = []
    # Sample down
    for y in range(0, int(h * 0.6), max(1, h // 200)):
        for x in range(0, w, max(1, w // 100)):
            r, g, b = img.getpixel((x, y))
            pixels.append((r, g, b, x, y))
            
    # Sort by brightness
    brightest = sorted(pixels, key=lambda p: p[0] + p[1] + p[2], reverse=True)[:5]
    print("Top brightest pixels in top 60%:")
    for r, g, b, x, y in brightest:
        print(f"  rgb({r},{g},{b}) / #{r:02x}{g:02x}{b:02x} at ({x}, {y})")

