var mongoose = require("mongoose");

// SCHEMA DEFINITION

var playerSchema = new mongoose.Schema({

    name: String,
    games: Number,
    wins: Number,
    loses: Number,
    draws: Number,
    last_win: Date

})

module.exports = mongoose.model("Player",playerSchema)