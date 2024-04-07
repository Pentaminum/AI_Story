const express = require('express');
const { generateStory } = require('./chatGptController');
const { PythonShell } = require('python-shell');
const path = require('path');
const { spawnSync } = require('child_process');



const uploadImages = async (req, res) =>{
    try{
        res.status(200).json({
            message: "Images uploaded successfully"
        })
    } catch (error){
        res.status(400).json({
            message: ("Error while uploading images: ", error.message)
        })
    }
}

const readImages = async (req, res) => {
    try {
        const pipenvInstall = spawnSync('pipenv', ['install'], { stdio: 'inherit' });

        if (pipenvInstall.status !== 0) {
            throw new Error('Failed to install Python dependencies');
        }
        const options = {
            scriptPath: path.join(__dirname, '../../python/'),
            args: [],
        }

        await PythonShell.run("image_to_text.py", options);
        res.status(200).json({ message: 'Images read successfully' });
    } catch (error) {
        console.error(`Error while reading images: ${error.message}`);
        res.status(400).json({ message: 'Error while reading images' });
    }
};



module.exports = {
    uploadImages,
    readImages
};