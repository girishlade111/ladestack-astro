import os
from PIL import Image

def make_comparison(ref_path, ren_path, out_path, title):
    ref = Image.open(ref_path).convert('RGB')
    ren = Image.open(ren_path).convert('RGB')
    
    # Crop hero regions
    # In ref: top 65% of image
    ref_crop = ref.crop((0, 0, ref.size[0], int(ref.size[1] * 0.65)))
    # In ren: top 65% of image
    ren_crop = ren.crop((0, 0, ren.size[0], int(ren.size[1] * 0.65)))
    
    # Scale ref to match ren height
    target_h = 500
    ref_scaled = ref_crop.resize((int(ref_crop.size[0] * (target_h / ref_crop.size[1])), target_h), Image.Resampling.LANCZOS)
    ren_scaled = ren_crop.resize((int(ren_crop.size[0] * (target_h / ren_crop.size[1])), target_h), Image.Resampling.LANCZOS)
    
    total_w = ref_scaled.size[0] + ren_scaled.size[0] + 20
    comp = Image.new('RGB', (total_w, target_h), (20, 20, 20))
    comp.paste(ref_scaled, (0, 0))
    comp.paste(ren_scaled, (ref_scaled.size[0] + 20, 0))
    
    comp.save(out_path)
    print(f"Saved: {out_path} ({comp.size})")

out_dir = 'scratch/comparisons'
if not os.path.exists(out_dir): os.makedirs(out_dir)

make_comparison(
    r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_9b9fa34e.png',
    'scratch/rendered_hero/rendered_desktop_dark.png',
    'scratch/comparisons/dark_desktop_comparison.png',
    'Dark Desktop'
)

make_comparison(
    r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987140_f49af50a.png',
    'scratch/rendered_hero/rendered_desktop_light.png',
    'scratch/comparisons/light_desktop_comparison.png',
    'Light Desktop'
)

make_comparison(
    r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_d17cfd6e.png',
    'scratch/rendered_hero/rendered_mobile_dark.png',
    'scratch/comparisons/dark_mobile_comparison.png',
    'Dark Mobile'
)

make_comparison(
    r'C:/Users/Girish Lade/.gemini/antigravity/brain/3f7541f6-1ec3-4538-bb77-0de47c88bb87/.user_uploaded/media_1793184987135_8a372ef7.png',
    'scratch/rendered_hero/rendered_mobile_light.png',
    'scratch/comparisons/light_mobile_comparison.png',
    'Light Mobile'
)
