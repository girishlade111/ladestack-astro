import os
from PIL import Image

ref_light_path = r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987140_f49af50a.png'
ren_light_path = 'scratch/rendered_hero/rendered_desktop_light.png'

ref_img = Image.open(ref_light_path).convert('RGB')
ren_img = Image.open(ren_light_path).convert('RGB')

ref_cx = ref_img.size[0] // 2
ren_cx = ren_img.size[0] // 2

print("\n--- Light Theme Falloff (Reference vs Rendered) ---")
print("Ref Y | Ref RGB            | Ren Y | Ren RGB")
for i in range(12):
    ref_y = 150 + i * 20
    ren_y = 10 + i * 20
    if ref_y < ref_img.size[1] and ren_y < ren_img.size[1]:
        r1, g1, b1 = ref_img.getpixel((ref_cx, ref_y))
        r2, g2, b2 = ren_img.getpixel((ren_cx, ren_y))
        print(f"{ref_y:5d} | rgb({r1:3d},{g1:3d},{b1:3d}) #{r1:02x}{g1:02x}{b1:02x} | {ren_y:5d} | rgb({r2:3d},{g2:3d},{b2:3d}) #{r2:02x}{g2:02x}{b2:02x}")
