const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// Set static folder
app.use(express.static(path.join(__dirname, './public')));

// CORS middleware
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
