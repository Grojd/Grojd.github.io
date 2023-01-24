const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let tagSchema = new Schema({
    tag: String
});

const recordSchema = new Schema({
    nickname: {
        type: String,
        required: true
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
    tags: {
        type: [tagSchema],
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;