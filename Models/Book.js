const mongoose = require('mongoose');
const Avaibility = require('../Models/Avaibility')
const bookSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    persons: {
        type: Number,
        required: true
    },
    bookIds: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'avaibility' }],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now 
    }
});
const Book = mongoose.model('book', bookSchema);

module.exports = Book;