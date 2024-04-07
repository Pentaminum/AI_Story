const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { uploadImages, readImages } = require('./src/controllers/fileController');

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

app.get('/read/images', readImages);

app.listen(PORT, () => {
  console.log(`Server listening at Port:${PORT}`)
});