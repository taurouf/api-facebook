const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    montant: {
      type: Number,
      required: true,
    },
    quantite: {
      type: Number,
      min: 1,
      max: 50,
      required: true,
    },
    personneExterieure: String,
  },
  {
    collection: "discussion",
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

module.exports = discussionSchema;
