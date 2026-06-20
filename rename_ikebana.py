import os
import re
import shutil

ikebana_dir = "_ikebana"
images_dir = "assets/images"

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

for filename in os.listdir(ikebana_dir):
    if not filename.endswith(".md"): continue
    
    filepath = os.path.join(ikebana_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Extract title
    title_match = re.search(r'^title:\s*"([^"]+)"', content, re.MULTILINE)
    if not title_match:
        title_match = re.search(r'^title:\s*([^\n]+)', content, re.MULTILINE)
    
    if not title_match:
        print(f"No title found in {filename}")
        continue
        
    title = title_match.group(1).strip()
    slug = slugify(title)
    
    # Extract image
    img_match = re.search(r'^image:\s*([^\n]+)', content, re.MULTILINE)
    if not img_match:
        print(f"No image found in {filename}")
        continue
        
    old_img_path = img_match.group(1).strip()
    old_img_filename = os.path.basename(old_img_path)
    old_img_ext = os.path.splitext(old_img_filename)[1]
    
    new_img_filename = f"{slug}{old_img_ext}"
    new_img_relpath = f"/assets/images/{new_img_filename}"
    
    # Rename image
    old_img_full_path = os.path.join(images_dir, old_img_filename)
    new_img_full_path = os.path.join(images_dir, new_img_filename)
    
    if os.path.exists(old_img_full_path):
        os.rename(old_img_full_path, new_img_full_path)
        print(f"Renamed {old_img_filename} to {new_img_filename}")
    else:
        print(f"Warning: {old_img_full_path} not found")
        
    # Update markdown content
    new_content = re.sub(r'^image:\s*([^\n]+)', f"image: {new_img_relpath}", content, flags=re.MULTILINE)
    
    # Write back and rename markdown file
    new_md_filename = f"{slug}.md"
    new_md_filepath = os.path.join(ikebana_dir, new_md_filename)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
        
    if filename != new_md_filename:
        os.rename(filepath, new_md_filepath)
        print(f"Renamed {filename} to {new_md_filename}")

