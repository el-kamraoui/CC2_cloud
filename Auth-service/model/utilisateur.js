const mongoose = require('mongoose');

const UserScema = new mongoose.Schema({
    nom: String,
    email: {type: String, unique: true},
    login: {type: String, unique: true},
    mdp: String
});

const UserModel = mongoose.model("Utilisateur", UserScema);
module.exports = UserModel