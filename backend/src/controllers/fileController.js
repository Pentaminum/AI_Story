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

const readPrompts = async () => {
    try {
        const options = {
            scriptPath: path.join(__dirname, '../../python/'),
        };

        const result = await PythonShell.run('a2.py', options);
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

const generateImage = async (req, res) => {
    try{
        const result = await readPrompts();
        return res.status(200).send(result);
    } catch (error) {
        res.status(400).json({
            message: ("Error while generating images: ", error.message)
    })
}
};

const storyReady = async (req, res) => {
    try {
        // check if images are generated = means story is ready
        const imageFilePath = path.join(__dirname, '../../python/ai_generated_images');
        const files = fs.readdirSync(imageFilePath);

        // Check if there are 3 image files
        const requiredImages = ['image_0.png', 'image_1.png', 'image_2.png'];
        const existingImages = files.filter(file => requiredImages.includes(file));
        if (existingImages.length === requiredImages.length) {
            return res.status(200).send('Success');
        } else {
            return res.status(400).send('Fail');
        }

    } catch (error) {
        console.error('Error while checking story status:', error);
        return res.status(500).send('Error checking story status:', error.message);
    }
};

const getStory = async (req, res) => {
    try {
        const storynum = parseInt(req.params.num); 
        const validStoryNumbers = [1, 2, 3];
        if (!validStoryNumbers.includes(storynum)) { 
            return res.status(400).send('Invalid story number');
        }
        const storyFilePath = path.join(__dirname, '../../python/story.json');
        const jsonData = fs.readFileSync(storyFilePath, 'utf8');
        const storyObject = JSON.parse(jsonData);

        let story;
        if (storynum === 2) {
            story = storyObject.story["2"].middle + " " + storyObject.story["2"].climax;
        } else {
            story = storyObject.story[storynum.toString()];
        }

        return res.status(200).send({ story });
    } catch (error) {
        console.error('Error while getting story:', error);
        return res.status(500).send('Error getting story:', error.message);
    }
};

const getImage = async (req, res) => {
    try {
        const imagenum = parseInt(req.params.num); 
        const validImageNumbers = [1, 2, 3];
        if (!validImageNumbers.includes(imagenum)) { 
            return res.status(400).send('Invalid image number');
        }
        const imageFilePath = path.join(__dirname, '../../python/ai_generated_images/');
        const imageFileName = `image_${imagenum - 1}.png`;

        const imageData = fs.readFileSync(path.join(imageFilePath, imageFileName));
        res.contentType('image/png'); 

        return res.status(200).send(imageData );
    } catch (error) {
        console.error('Error while getting image:', error);
        return res.status(500).send('Error getting image:', error.message);
    }
};

const getTitle = async (req, res) => {
    try {
        const storyFilePath = path.join(__dirname, '../../python/story.json');
        const jsonData = fs.readFileSync(storyFilePath, 'utf8');
        const storyObject = JSON.parse(jsonData);
        const title = storyObject.title;
        return res.status(200).send({ title });
    } catch (error) {
        console.error('Error while getting title:', error);
        return res.status(500).send('Error getting tile:', error.message);
    }
};

module.exports = {
    uploadImages,
    readImages,
    readPrompts,
    uploadSettings,
    generateImage,
    storyReady,
    getStory,
    getImage,
    getTitle
};