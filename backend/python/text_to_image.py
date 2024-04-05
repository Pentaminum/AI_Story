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


# the specified maximum token indices sequence length for this model is 77, make sure our json prompt is within this limit
# otherwise, part of our input will be truncated because CLIP can only handle sequences up to 77 token
def generate_image(num):
    # get the path of the current py file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # append 'img_prompts.json' to get to the json file
    json_file = os.path.join(current_dir, f'img_prompts{num}.json')
    # check if the json file exists
    if not os.path.exists(json_file):
        print(f"File {json_file} does not exist.")
        return
    with open(json_file, 'r') as file:
        data = json.load(file)

    # create a folder to save the images
    img_folder = os.path.join(current_dir, f'story_images{num}')
    os.makedirs(img_folder, exist_ok=True)

    for index, prompt in enumerate(data['image']):
        # generate an image for the current prompt
        images = pipe(prompt=prompt).images[0]
        # get the path to save the image
        image_path = os.path.join(img_folder, f"generated_image_{index}.png")
        # save the image
        images.save(image_path)
        print(f"Saved: {image_path}")

# testing
generate_image(1)
generate_image(2)