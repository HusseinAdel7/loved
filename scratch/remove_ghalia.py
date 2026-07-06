import os

root_dir = r"d:\Loved"

def process_file(file_path):
    if not (file_path.endswith(".html") or file_path.endswith(".js")):
        return
    if "scratch" in file_path:
        return
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return

    original = content
    content = content.replace("خطيبتي الغالية", "خطيبتي")
    content = content.replace("الغالية", "")
    
    # Clean up double spaces if any
    content = content.replace("  ", " ")
    
    if content != original:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated: {file_path}")

for root, dirs, files in os.walk(root_dir):
    if ".git" in root:
        continue
    for file in files:
        full_path = os.path.join(root, file)
        process_file(full_path)

print("Finished removing 'الغالية' project-wide.")
