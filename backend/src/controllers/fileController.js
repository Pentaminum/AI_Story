const express = require('express');
const { generateStory } = require('./chatGptController');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');

const uploadImages = async (req, res) =>{
    try{
        const uploadDir = path.join(__dirname, '../../python/user_uploaded_images/');
        for (const file of req.files.images) {
            const newName = Date.now() + '-' + file.name; // Adding timestamp to avoid overwriting files with same name
            const newPath = path.join(uploadDir, newName);
            file.mv(newPath, (err) => {
                if (err) {
                    throw new Error('Failed to move file');
                }
            });
        }
        res.status(200).json({
            message: "Images uploaded successfully"
        })
    } catch (error){
        res.status(400).json({
            message: ("Error while uploading images: ", error.message)
        })
    }
}

const readImages = async () => {
    try {
        const options = {
            scriptPath: path.join(__dirname, '../../python/'),
        };

        const result = await PythonShell.run('a.py', options);
        return result;

    } catch (error) {
        return error;
    }
};

const uploadSettings = async (req, res) => {
    try {
        const result = await readImages();
        console.log('Result:', result);
        const { theme, place, main_trait, conflict } = req.body;
        try{
            // Read the contents of description.txt
            const descriptionFilePath = path.join(__dirname, '../../python/description.txt');
            const lines = await fs.promises.readFile(descriptionFilePath, 'utf8');
            const result = await generateStory({
                body: {
                    image_description : lines.split('\n'),
                    theme: theme,
                    place: place,
                    main_trait: main_trait,
                    conflict: conflict,
                },
            });
            const storyString = JSON.stringify(result, null, 2);
            // Transform the object values into an array
            const imageArray = Object.values(result.image);
            const imageObject = { image: imageArray };
            const imageString = JSON.stringify(imageObject, null, 2);
            fs.writeFile(path.join(__dirname, '../../python/story.json'), storyString, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing story to file:', err);
                    return;
                }
                console.log('JSON file has been saved.');
            });
            fs.writeFile(path.join(__dirname, '../../python/img_prompts.json'), imageString, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing image_prompts to file:', err);
                    return;
                }
                console.log('JSON file has been saved.');
            });
            return res.status(200).send({result});
        } catch (error) {
            console.error('Error while generating stories:', error);
            return res.status(500).send('Error generating stories: ', error.message);
        };
    } catch (error) {
        res.status(400).json({
            message: ("Error while uploading settings: ", error.message)
        })
    }
};

const getStory = async (req, res) => {
    try {
        const storyFilePath = path.join(__dirname, '../../python/story.txt');
    } catch (error) {
        console.error('Error while reading story:', error);
        return res.status(500).send('Error reading story:', error.message);
    }
};

module.exports = {
    uploadImages,
    readImages,
    uploadSettings
};