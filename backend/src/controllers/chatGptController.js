const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI API with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);


// Function to generate a list of suitable jobs for given resume tokens
const generateStory = async (story_settings) => {
    try {
        // Send the resume tokens to ChatGPT to generate suitable jobs
        const prompt = `Given the story settings: \n 
        [ 
            "base image descriptions":${story_settings.image_description},
            "story theme":${story_settings.theme},
            "place setting":${story_settings.place},
            "protagonist's main trait":${story_settings.main_trait},
            "primary conflict":${story_settings.conflict},

        ] \n 
        1. generate a full story that has a proper ending based on the given settings(must be at least 500 English words) \n
        2. generate 3 scene descriptions(around 50 English words each) depicting the important scenes from the story you cerated, enabling us to draw corresponding images with them later
        
        after that put your answer in this JSON format:\n
        {
            "title": "title of the story",
            "story": {
                "1": "beginning of the story",
                "2": {
                    "middle": "middle of the story",
                    "climax": "climax of the story"
                },
                "3": "ending of the story"
            },
            "image": {
                "1": "description of beginning",
                "2": "description of middle/climax",
                "3": "description of ending"
            }
        }
        `;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            response_format: {"type": "json_object"},
            messages: [{"role": "system", "content": prompt}],
            temperature: 0.7,
        });

        const content = response.choices[0].message.content
        return JSON.parse(content);
    } catch (error) {
        console.error('Error generating jobs:', error);
        throw error;
    }
};

module.exports = {
    generateStory
};