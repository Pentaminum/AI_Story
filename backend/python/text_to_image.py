import json
import os
from diffusers import DiffusionPipeline
import torch # if using cuda

# https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0
# pip install diffusers --upgrade OR pip3 install diffusers --upgrade
# pip install invisible_watermark transformers accelerate safetensors OR pip3 install invisible_watermark transformers accelerate safetensors

# if using cpu
pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", use_safetensors=True, variant="fp16")
pipe.to("cpu")

# if using cuda
# pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
# pipe.to("cuda")

# if using cuda && using torch < 2.0
# pipe.enable_xformers_memory_efficient_attention()


def generate_image():
    # get the path of the current py file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # append 'img_prompts.json' to get to the json file
    json_file = os.path.join(current_dir, "img_prompts.json")
    # check if the json file exists
    if not os.path.exists(json_file):
        print(f"File {json_file} does not exist.")
        return
    with open('img_prompts.json', 'r') as file:
        data = json.load(file)

    # create a folder to save the images
    img_folder = os.path.join(current_dir, "story_images")
    os.makedirs(img_folder, exist_ok=True)

    for index, prompt in enumerate(data['image']):
        # generate an image for the current prompt
        images = pipe(prompt=prompt).images[0]
        # get the path to save the image
        image_path = os.path.join(img_folder, f"generated_image_{index}.png")
        # save the image
        images.save(image_path)
        print(f"Saved: {image_path}")

generate_image()