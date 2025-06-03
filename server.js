const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/Routes')
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors()); // allows frontend to access API
app.use('/', routes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});