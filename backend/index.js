const express = require('express')
const app = express()


app.get('/', (req, res) => {
  res.json('Hello World!')
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});