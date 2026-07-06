import os
import re

root_dir = r"d:\Loved"

def process_file(file_path):
    if not (file_path.endswith(".html") or file_path.endswith(".js")):
        return
    
    # Avoid processing our own scratch script
    if "scratch" in file_path:
        return
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {file_path} due to read error: {e}")
        return

    original = content
    
    # Replace arabic الاء with لولو
    content = content.replace("الاء", "لولو")
    
    # Replace English Alaa/ALAA with Lolo/LOLO
    content = content.replace("Alaa", "Lolo")
    content = content.replace("ALAA", "LOLO")
    
    if content != original:
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated: {file_path}")
        except Exception as e:
            print(f"Error writing to {file_path}: {e}")

# Traverse directories
for root, dirs, files in os.walk(root_dir):
    # Skip .git directory
    if ".git" in root:
        continue
    for file in files:
        full_path = os.path.join(root, file)
        process_file(full_path)

print("Replacement sweep complete across all HTML and JS files.")
