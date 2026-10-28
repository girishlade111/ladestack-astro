import os
from PIL import Image

def profile_column(img_path, cx, y_start, y_end, step):
    img = Image.open(img_path).convert('RGB')
    data = []
    for y in range(y_start, y_end, step):
        r, g, b = img.getpixel((cx, y))
        data.append((y, r, g, b))
    return data

ref_dark_path = r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_9b9fa34e.png'
ren_dark_path = 'scratch/rendered_hero/rendered_desktop_dark.png'

ref_img = Image.open(ref_dark_path)
ren_img = Image.open(ren_dark_path)

print(f"Ref Dark Size: {ref_img.size}, Ren Dark Size: {ren_img.size}")
ref_cx = ref_img.size[0] // 2
ren_cx = ren_img.size[0] // 2

print("\n--- Dark Theme Falloff (Reference vs Rendered) ---")
print("Ref Y | Ref RGB            | Ren Y | Ren RGB")
for i in range(12):
    ref_y = 150 + i * 20
    ren_y = 10 + i * 20
    if ref_y < ref_img.size[1] and ren_y < ren_img.size[1]:
        r1, g1, b1 = ref_img.convert('RGB').getpixel((ref_cx, ref_y))
        r2, g2, b2 = ren_img.convert('RGB').getpixel((ren_cx, ren_y))
        print(f"{ref_y:5d} | rgb({r1:3d},{g1:3d},{b1:3d}) #{r1:02x}{g1:02x}{b1:02x} | {ren_y:5d} | rgb({r2:3d},{g2:3d},{b2:3d}) #{r2:02x}{g2:02x}{b2:02x}")

