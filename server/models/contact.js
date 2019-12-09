const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Modèle pour la création d'un contact

const ContactSchema = new Schema({
  nom: {
    type: String
  },
  prenom: {
    type: String
  },
  email: {
    type: String
  },
  numero: {
    type: String,
    required: true
  },
  fonction: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Contact = mongoose.model("contacts", ContactSchema);
