// Tuodaan express
const express = require("express");
// Tuodaan router moduuli expressistä
const router = express.Router();
// Otetaan moduuli käyttöön
const flavour = require("../models/flavourModel");
// Tuodaan tuotemalli
const amount = require("../models/countingModel");
// Exportoidaan reitti funktiona
module.exports = function () {
  // Poistetaan yksi maku tietokannasta id:n perusteella
  router.delete("/api/delete/:Id", async (req, res) => {
    const apiId = req.params.Id;
    try {
      // Poistetaan maku jos se löytyy Id:llä
      const deletedFlavour = await flavour.findOneAndDelete({ Id: apiId });
      // Jos makua ei löydy, annetaan status 404 ja viesti
      if (!deletedFlavour) {
        console.log("The page you tried to reach does not exist!");
        return res.status(404).end();
      } else {
        // Jos saadaan vastaus, päivitetään laskuri
        await amount.findOneAndUpdate({}, { $inc: { seq: -1 } });
        res.status(200).json(deletedFlavour);
      }
      // Tarkistetaan ja lokitetaan serverierrorit
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  return router;
};
