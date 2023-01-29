const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

const languageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    color: {
        type: String,
        required: true,
        trim: true,
        default: 'red'
    }
})

const recordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
        type: Schema.Types.ObjectId,
        ref: 'Language',
        required: true
    },
    description: {
        type: String,
        required: true,
    },
});

const Record = mongoose.model('Record', recordSchema);

const User = mongoose.model('User', userSchema);

const Language = mongoose.model('Language', languageSchema);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = { Record, User, Language };