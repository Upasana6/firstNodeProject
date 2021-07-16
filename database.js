const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    movieName : String,
    description: String,
    rating: Number,
    url: String
});

module.exports = mongoose.model('Movie', movieSchema);