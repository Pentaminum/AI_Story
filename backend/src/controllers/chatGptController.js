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
            "theme":${story_settings.theme},
            "place setting":${story_settings.place_setting},
            "protagonist's main trait":${story_settings.main_trait},
            "primary conflict":${story_settings.conflict},

        ] \n 
        1. create a story based on the given settings.(500~1000 words) \n
        2. create 3 descriptions(around 50 words) depicting the important scenes from the story you created, enabling us to draw corresponding images with them later.
        `;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{"role": "system", "content": prompt}],
            max_tokens: 100,
        });
        const jobs = response.choices[0].message.content;
        return jobs;
    } catch (error) {
        console.error('Error generating jobs:', error);
        throw error;
    }
};

module.exports = {
    generateStory
};