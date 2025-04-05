from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import numpy as np
from io import BytesIO
import cv2, base64, json
import uvicorn

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

photo_memo = []

class StringRequest(BaseModel):
    content: str


@app.post("/invert_image")
async def invertImage(req: StringRequest):
    image_data = base64.b64decode(req.content)
    image = Image.open(BytesIO(image_data))
    img_array = np.array(image)
    
    processed_img = np.fliplr(img_array)
    
    _, img_encoded = cv2.imencode('.jpg', cv2.cvtColor(processed_img, cv2.COLOR_RGB2BGR))
    img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')
    return json.dumps({"processed_img": img_base64})

@app.post("/process_image")
async def processImage(req: StringRequest):
    image_data = base64.b64decode(req.content)
    image = Image.open(BytesIO(image_data))
    img_array = np.array(image)
    
    # AI processing to extract bounding box
    processed_img = np.fliplr(img_array)
    brand = "Brand Name"
    
    _, img_encoded = cv2.imencode('.jpg', cv2.cvtColor(processed_img, cv2.COLOR_RGB2BGR))
    img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')
    
    return {"brand": brand, "image": img_base64}

@app.post("/save_img")
async def saveImage(req: StringRequest):
    image_data = base64.b64decode(req.content)
    image = Image.open(BytesIO(image_data))
    img_array = np.array(image)
    img_base64 = base64.b64encode(cv2.imencode('.jpg', img_array)[1]).decode('utf-8')
    photo_memo.append(img_base64)
    return {"processed_img": "RESPONSE"}

@app.get("/fetch_img")
async def fetchImage():
    return photo_memo

@app.delete("/delete_img")
async def fetchImage(req: StringRequest):
    idx = int(base64.b64decode(req.content))
    print("Deleted", idx)
    photo_memo.pop(idx)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3500)