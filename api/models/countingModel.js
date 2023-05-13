// Haetaan mongoose jotta voimme luoda mallin ja scheman tietokantaan lähetettävästä datasta
const mongoose = require("mongoose");
// Haetaan Skeema mongoosesta
const Schema = mongoose.Schema;
// Määritellään skeema jäätelömakujen määrän laskemista varten
const countingSchema = new Schema({
  Id: {
    type: String,
  },
  seq: {
    type: Number,
  },
});
// Luodaan laskentamalli
const countingModel = mongoose.model("AmountOfFlavours", countingSchema);
// Exportoidaan laskentamalli
module.exports = countingModel;
