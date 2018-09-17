"use strict";

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionCategoryName: {
        type: String,
        required: false
    },
    transactionSubcategoryName: {
        type: String,
        required: false
    },
    transactionMonthName: {
        type: String,
        required: false
    },
    transactionAmount: {
        type: Number,
        required: false
    },
    incomeExpenseTransaction: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
