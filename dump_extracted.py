import json
import os

with open('pdf_extracted_text.json', encoding='utf-8') as f:
    data = json.load(f)

for filename, text in data.items():
    clean_name = filename.replace("'", "").replace(" ", "_").replace("(", "").replace(")", "").replace(".pdf", "")
    out_file = f"{clean_name}_extracted.txt"
    with open(out_file, 'w', encoding='utf-8') as f_out:
        f_out.write(text)
    print(f"Saved {out_file}: {len(text.splitlines())} lines, {len(text)} chars")
