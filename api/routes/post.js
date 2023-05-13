// Tuodaan express
const express = require("express");
// Tuodaan router moduuli expressistä
const router = express.Router();
// Tuodaan tuotemalli
const flavour = require("../models/flavourModel");
// Tuodaan tuotemalli
const amount = require("../models/countingModel");
// Tuodaan Joi kirjasto, jonka avulla vahvistetaan pyyntötiedot
const Joi = require("joi");
// Tuodaan asynchandler, jolla voi helpottaa errorien käsittelyä
const asyncHandler = require("express-async-handler");
// Määritellään schema POST pyyntöjen vahvistusta varten
const flavourPostSchema = Joi.object({
  Flavour: Joi.string().required(),
  Description: Joi.string().required(),
  Image: Joi.string().required(),
});

// Exportoidaan reitti funktion avulla
module.exports = function () {
  // Luodaan POST reitti uuden jäätelömaun luomista varten
  router.post(
    "/api/add",
    asyncHandler(async (req, res) => {
      // varmistetaan käyttäjän kirjaama sisältö
      const { error, value } = flavourPostSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      try {
        // etsitään meidän laskentamallista seuraava Id
        const idInfo = await amount.findOneAndUpdate(
          { Id: "autoval" },
          { $inc: { seq: 1 } },
          { new: true }
        );
        // Määritellään dataId
        const dataId = idInfo ? idInfo.seq : 1;

        // Luodaan uusi flavour object
        const newFlavour = new flavour({
          Id: dataId,
          Flavour: req.body.Flavour,
          Description: req.body.Description,
          Image: req.body.Image,
        });
        // tallennetaan onnistuneesti uusi maku tietokantaan 201 statuksella
        await newFlavour.save();
        res.status(201).json(newFlavour);
        // Tarkistetaan ja lokitetaan serverierrorit
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred" });
      }
    })
  );
  return router;
};
