import re

file_path = r"d:\Loved\shared\js\translations.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove line: home_lead_author: "- خطيبكِ المخلص",
# (We replace it with an empty string: home_lead_author: "")
content = re.sub(r'home_lead_author:\s*"- خطيبكِ المخلص",', 'home_lead_author: "",', content)
content = re.sub(r'home_lead_author:\s*"- Warmly, Your Fiancé",', 'home_lead_author: "",', content)

# Replace 'الاء' with 'لولو'
content = content.replace("الاء", "لولو")

# Replace 'Alaa' with 'Lolo'
content = content.replace("Alaa", "Lolo")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Replaced names and removed signature successfully.")
