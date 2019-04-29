const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
});

// const question = mongoose.model('question', questionSchema);
module.exports = mongoose.model('question', questionSchema);