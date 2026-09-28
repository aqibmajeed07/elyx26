import pypdf
import os

reader = pypdf.PdfReader("ARTIFEX'25_RULEBOOK.pdf")
os.makedirs("pdf_images", exist_ok=True)
count = 0
for i, page in enumerate(reader.pages):
    for j, img in enumerate(page.images):
        count += 1
        filename = f"pdf_images/p{i+1}_{j+1}_{img.name}"
        with open(filename, 'wb') as f:
            f.write(img.data)
        print(f"Extracted: {filename}")
print(f"Total images extracted: {count}")
