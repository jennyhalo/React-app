// Haetaan mongoose jotta voimme luoda mallin ja skeeman tietokantaan lähetettävästä datasta
const mongoose = require("mongoose");
// Haetaan Skeema mongoosesta
const Schema = mongoose.Schema;
// Määritellään Skeema jäätelömaulle
const flavourSchema = new Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    Flavour: {
      type: String,
      require: true,
    },
    Description: {
      type: String,
      require: true,
    },
    Image: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

// Luodaan malli jäätelömaulle
const flavourModel = mongoose.model("Flavour", flavourSchema);
// Exportoidaan malli
module.exports = flavourModel;
