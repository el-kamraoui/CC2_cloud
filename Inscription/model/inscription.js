const mongoose = require('mongoose');

const InscScema = new mongoose.Schema({
    utilisateur_id: {type: mongoose.Schema.Types.ObjectId, ref: 'utilisateurs'},
    evenement_id: {type: mongoose.Schema.Types.ObjectId, ref: 'evenements'}
});

const InscModel = mongoose.model("Inscription", InscScema);
module.exports = InscModel