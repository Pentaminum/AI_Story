const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { uploadImages, uploadSettings, generateImage, readImages, readPrompts, storyReady, getStory, getImage, getTitle} = require('./src/controllers/fileController');
const { generateStory } = require('./src/controllers/chatGptController');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Backend Server running!')
});

// send images/data to server
app.post('/upload/images', uploadImages);
app.post('/upload/settings', uploadSettings);

// generate images
app.get('/generate/images', generateImage);

// // text -> image // image -> text
// app.get('/read/images', readImages); // will only be used for testing
// app.get('/read/prompts', readPrompts); // will only be used for testing

// get story, image, title
app.get('/storynum/:num', getStory);
app.get('/imagenum/:num', getImage);
app.get('/title', getTitle);

// check if the story is ready
app.get('/story/ready', storyReady);

app.listen(PORT, () => {
  console.log(`Server listening at Port:${PORT}`)
});