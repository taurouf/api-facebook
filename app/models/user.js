const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
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
      unique: true,
      index: true
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

userSchema.plugin(uniqueValidator);


module.exports = userSchema;
