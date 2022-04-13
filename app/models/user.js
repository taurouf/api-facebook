const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
    },
    Prenom: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Photo: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user",
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
