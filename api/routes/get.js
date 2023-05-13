// Tuodaan express moduuli
const express = require("express");
// Tuodaan router moduuli expressistä
const router = express.Router();
// Tuodaan tuotemalli
const flavour = require("../models/flavourModel");
// Exportoidaan reitti funktiona
module.exports = function () {
  //haetaan kaikki tiedot tiedokannasta, jos ei löydy yhtään tietoa tietokannassa, annetaan statuskoodi 404
  router.get("/api/getall", async (req, res) => {
    try {
      const allFlavours = await flavour.find({});
      if (allFlavours.length === 0) {
        console.log("The page you tried to reach does not exist!");
        return res.status(404).end();
      } else {
        // Jos löytyy dataa, annetaan statuskoodi 200 ja lähetetään sata Json muodossa
        res.status(200).json(allFlavours);
      }
      // Tarkistetaan ja lokitetaan serverierrorit
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  //haetaan kaikki tiedot tiedokannasta
  router.get("/api/:Id", async (req, res) => {
    try {
      const apiId = req.params.Id;
      const singleFlavour = await flavour.findOne({ Id: apiId });
      // Jos yrittää hakea Id:llä jota ei ole tietokannassa, tulee status 404 ja viesti
      if (!singleFlavour) {
        console.log("The page you tried to reach does not exist!");
        res.status(404).end();
      } else {
        res.status(200).json(singleFlavour);
      }
      // Jos Id ei ole hyväksyttävässä muodossa, annetaan virhekoodi 400 ja lokitetaan viesti
    } catch (error) {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    }
  });
  return router;
};
