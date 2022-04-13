const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    nom: String,
    montant: Number,
    quantite: Number,
    personneExterieure: String,
  },
  {
    collection: "users",
    // Bien optimiser la requête
    minimize: false,
    versionKey: false,
  }
).set("toJSON", {
  transform: (doc, ret) => {
    // doc : Données qu'on récupère
    ret.id = ret._id;

    delete ret._id;
  },
});

module.exports = Schema;
