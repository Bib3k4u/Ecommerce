const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const otpRoutes = require('./routes/createUserRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(otpRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
