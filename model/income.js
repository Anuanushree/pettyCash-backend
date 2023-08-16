const mongoose = require('mongoose');
const { schema } = require('./user');
const incomeSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    salary: Number,
    incentive: Number,
    rentIncome: Number,
    others: Number,
    rent: Number,
    loan: Number,
    transport: Number,
    utilies: Number,
    glossary: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}

);
module.exports = mongoose.model('Income', incomeSchema, "incomedata");