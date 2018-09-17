"use strict";

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category
