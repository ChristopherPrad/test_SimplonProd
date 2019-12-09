const express = require("express");
const contacts = express.Router();
const cors = require("cors");
const Contact = require("../models/Contact");

// Permet d'intéragir plus facilement entre le navigateur et le serveur
contacts.use(cors());

/**
 * Enregistrer un contact dans la BDD
 * @param contactData
 * @return contact
 */
contacts.post("/create", (req, res) => {
  const today = new Date();
  console.log(req.body);
  console.log("hep");
  const contactData = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    numero: req.body.numero,
    fonction: req.body.fonction,
    date: today
  };

  Contact.create(contactData)
    .then(contact => {
      res.json({
        status: contact.id + "registered!"
      });
    })
    .catch(err => {
      res.send("error:" + err);
    });
});

// RECUPERER L'ENSEMBLE DES CONTACTS
contacts.get("/all", (req, res) => {
  Contact.find().then(result => res.json(result));
});

/**
 * Modifier les contacts dans la BDD
 * @param contact "id contact"
 * @return  contact modifié dans la BDD
 */
contacts.put("/modify/:id", function(req, res) {
  Contact.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    contact
  ) {
    if (err)
      return res.status(500).send("There was a problem updating the contact.");
    res.status(200).send(contact);
  });
});

/**
 * Supprimer les contacts de la BDD
 * @param contact "id contact"
 * @return contact supprimé de la BDD
 */
contacts.delete("/del/:id", function(req, res) {
  Contact.findByIdAndDelete(req.params.id, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(contact);
  });
});
/**
 * Permet de filtrer la BDD par lettre grace a la technique RegExp
 * @param letter
 * @return contact filtrer par lettre au clic
 */

contacts.get("/search-letter/:letter", function(req, res) {
  const letter = req.params;
  var pattern = new RegExp("^" + letter.letter + "");
  console.log(pattern);
  // Contact.find();
  Contact.find({ nom: { $regex: pattern, $options: "i" } }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(contact);
  });
});

/**
 * Permet de filtrer la BDD en fonction des lettres rentrés dans l'input
 * @param value
 * @return contact filtrer
 */
contacts.get("/input-search/:value", function(req, res) {
  const value = req.params;
  var pattern = new RegExp("" + value.value + "");
  console.log(value);
  // Contact.find();
  Contact.find({ nom: { $regex: pattern, $options: "i" } }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send(contact);
  });
});

module.exports = contacts;
