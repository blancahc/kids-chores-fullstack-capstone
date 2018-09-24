"use strict";

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe
