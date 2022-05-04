const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    DateDeDebut: {
      type: Date,
      required: true,
    },
    DateDeFin: {
      type: Date,
      required: true,
    },
    Lieu: {
      type: String,
      required: true,
    },
    Photo: {
      type: String,
    },
    Private:{
      type: Boolean
    }
  },
  {
    collection: "evenement",
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

module.exports = evenementSchema;
