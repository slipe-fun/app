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

url = "https://i.pinimg.com/736x/d0/5b/68/d05b688ef9df4d224b35123648469d48"
hash_str = blurhash_from_url(url)

print("bh:", hash_str)
