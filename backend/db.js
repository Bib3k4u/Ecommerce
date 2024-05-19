const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bibek:bibek111@cluster0.gaaho0t.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
