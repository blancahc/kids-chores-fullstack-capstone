"use strict";

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipename: {
        type: String,
        required: false
    },
    ingredients: {
        type: String,
        required: false
    },
    instructions: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    shared: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
