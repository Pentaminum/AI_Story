from transformers import AutoModelForCausalLM, AutoTokenizer
from PIL import Image
import os

# https://huggingface.co/vikhyatk/moondream2
model_id = "vikhyatk/moondream2"
revision = "2024-03-13"
model = AutoModelForCausalLM.from_pretrained(
    model_id, trust_remote_code=True, revision=revision
)
tokenizer = AutoTokenizer.from_pretrained(model_id, revision=revision)


def process_images():
    # get the path of the current py file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # append 'images' to get to the images folder
    img_folder = os.path.join(current_dir, 'images')

    # question = "Describe this image in detail."
    question = "Describe this image with detailed context, including objects, people, background elements, colors, textures, emotions, and any symbols or text present."
    description_file = os.path.join(current_dir, 'description.txt')

    # check if the folder exists
    if not os.path.exists(img_folder):
        print(f"Folder {img_folder} does not exist.")
        return

    # open the description file for writing
    with open(description_file, 'w') as file:
        # iterate over each file in the image folder
        for filename in os.listdir(img_folder):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                try:
                    # get the path to the image
                    file_path = os.path.join(img_folder, filename)
                    # load the image
                    image = Image.open(file_path)
                    # encode the image using the model
                    enc_image = model.encode_image(image)
                    # ask the model a question about the image
                    answer = model.answer_question(enc_image, question, tokenizer)
                    # write the answer to the description file
                    file.write(f"{answer}\n\n")
                except Exception as e:
                    print(f"Failed to process {filename}: {e}")


process_images()