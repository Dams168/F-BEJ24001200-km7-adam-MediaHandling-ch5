require('dotenv').config();
const express = require('express');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mediaRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});