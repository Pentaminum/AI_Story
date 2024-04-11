from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
from PIL import Image
import torch
import os

model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")

print()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

max_legnth = 50
num_beams = 4
gen_kwargs = {"max_length": max_legnth, "num_beams": num_beams}

def predict_caption(image_paths):
    images = []
    for image_path in image_paths:
        image = Image.open(image_path)
        if image.mode != "RGB":
            image = image.convert("RGB")
        images.append(image)
    
    pixel_values = feature_extractor(
        images=images, return_tensors="pt").pixel_values
    pixel_values = pixel_values.to(device)

    output_ids = model.generate(pixel_values, **gen_kwargs)

    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
    preds = [pred.capitalize() for pred in preds]
    print("Final Caption is: ", preds)
    return preds

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, 'user_uploaded_images', 'kitten.jpg')
    predict_caption([file_path])