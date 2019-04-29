const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
    parentId: String,
    text: String,
    rating: Number
});

// const answer = mongoose.model('answer', answerSchema);
module.exports = mongoose.model('answer', answerSchema);
