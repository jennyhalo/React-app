// Otetaan express moduuli käyttöön
const express = require("express");
// luodaan app
const app = express();
// tuodaan bodyparser
const bodyParser = require("body-parser");
// Otetaan mongoose käyttöön
const mongoose = require("mongoose");
// Otetaan dotenv tiedosto käyttöön
require("dotenv").config();
// Tuodaan reitit
const getRoute = require("./routes/get.js")();
const postRoute = require("./routes/post.js")();
const putRoute = require("./routes/put.js")();
const deleteRoute = require("./routes/delete.js")();

// MIDDLEWARE
// Jokainen request joka tulee muutetaan JSON muotoon
app.use(express.json());
// otetaan bodyparser käyttöön
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
// Otetaan reitit käyttöön
app.use(getRoute);
app.use(postRoute);
app.use(putRoute);
app.use(deleteRoute);

// Yhdistetään tietokantaan hakemalla env tiedostosta tietokannan osoite, jossa käyttäjätunnus ja salasana on piilotettuna
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // Onnistuneessa yhteydessä tietokantaan lokitamme viestin
  .then(() => {
    console.log("Connected to database!");
  })
  // Ongelman ilmetessä lokitamme virheviestin
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
// Määritellään portti
const PORT = process.env.PORT;
//Kuunnellaan määriteltyä porttia ja lähetetään viesti konsoliin funktion avulla
app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));
