const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        default: 'vy'
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Number,
        required: true,
        min: 1
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    language: {
        type: String,
        enum: ['C++', 'Python', 'HTML', 'CSS3', 'Pascal', 'Rust'],
        required: true
    },
    description: {
        type: String,
        required: true,
    },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;