const mongoose = require('mongoose');

const EventScema = new mongoose.Schema({
    titre: {type: String, unique: true},
    description: String,
    date: Date,
    lieu: String,
    categorie: String
});

const EventModel = mongoose.model("Evenement", EventScema);
module.exports = EventModel