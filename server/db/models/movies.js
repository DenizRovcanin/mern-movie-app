const mongoose = require('mongoose');
const { Schema } = mongoose;

const MoviesSchema = new Schema({
    id: Number,
    title: String,
    release_date: String,
    vote_average: Number,
});

mongoose.model('Movies', MoviesSchema);
