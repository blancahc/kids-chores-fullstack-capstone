"use strict";

const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    subcategoryName: {
        type: String,
        required: false
    },
    categoryBelongstoName: {
        type: String,
        required: false
    },
    budgetSubcategoryAmount: {
        type: Number,
        required: false
    },
    incomeExpense: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
