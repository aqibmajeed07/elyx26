import os
import shutil
from PIL import Image

os.makedirs('src/assets', exist_ok=True)
os.makedirs('public/assets', exist_ok=True)

hero_source = r"C:\Users\Meer Haroon\.gemini\antigravity-ide\brain\d3ba27a1-ad10-4944-84c3-015309aaf750\artifex_hero_bg_1790361070361.jpg"

assets_map = {
    'gcelogo.jpg': 'gcelogo.jpg',
    'fine_arts_logo.jpg': 'pdf_images/p1_3_Image3.jpg',
    'instagram_qr.jpg': 'pdf_images/p15_2_Image2.jpg',
    'cultural_painting.jpg': 'pdf_images/p1_1_Image1.jpg',
    'artifex_hero.jpg': hero_source
}

for dest_name, src_path in assets_map.items():
    if os.path.exists(src_path):
        # copy to src/assets
        dest_src = os.path.join('src/assets', dest_name)
        dest_pub = os.path.join('public/assets', dest_name)
        shutil.copyfile(src_path, dest_src)
        shutil.copyfile(src_path, dest_pub)
        print(f"Copied {src_path} -> {dest_src} & {dest_pub}")

        # also generate webp version for performance
        try:
            im = Image.open(src_path)
            webp_name = dest_name.rsplit('.', 1)[0] + '.webp'
            im.save(os.path.join('src/assets', webp_name), 'WEBP', quality=85)
            im.save(os.path.join('public/assets', webp_name), 'WEBP', quality=85)
            print(f"Generated WebP: {webp_name}")
        except Exception as e:
            print(f"WebP generation error for {dest_name}: {e}")
    else:
        print(f"Warning: {src_path} does not exist!")

print("Assets setup completed successfully!")
