import requests
from PIL import Image
from io import BytesIO
from blurhash import encode
import numpy as np

def blurhash_from_url(image_url, x_components=4, y_components=3):
		resp = requests.get(image_url, timeout=10)
		resp.raise_for_status()
		img = Image.open(BytesIO(resp.content)).convert("RGB")
		pixels = np.array(img)
		return encode(pixels, x_components, y_components)

url = "https://preview.redd.it/helldiver-x-seaf-v0-g55jewd8qr2f1.png?width=1080&crop=smart&auto=webp&s=7af8a0f897a977ac905dda57a3c36641847a497a"
hash_str = blurhash_from_url(url)

print("bh:", hash_str)
