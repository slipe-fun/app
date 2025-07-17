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

url = "https://i.pinimg.com/1200x/e1/81/c3/e181c38330f26e4323f8bcdb79167edd.jpg"
hash_str = blurhash_from_url(url)

print("bh:", hash_str)
