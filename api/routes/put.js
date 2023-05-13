// Tuodaan express
const express = require("express");
// Tuodaan router moduuli expressistä
const router = express.Router();
// Tuodaan tuotemalli
const flavour = require("../models/flavourModel");
const { json } = require("body-parser");
// Tuodaan Joi kirjasto, jonka avulla vahvistetaan pyyntötiedot
const Joi = require("joi");
// Tuodaan asynchandler, jolla voi helpottaa errorien käsittelyä
const asyncHandler = require("express-async-handler");

// Määritellään schema PUT pyyntöjen vahvistusta varten
const flavourPutSchema = Joi.object({
  Flavour: Joi.string().required(),
  Description: Joi.string().required(),
  Image: Joi.string().required(),
});
// Exportoidaan funktion avulla
module.exports = function () {
  // Päivitetään dokumentin sisältö id:n perusteella
  router.put(
    "/api/update/:Id",
    asyncHandler(async (req, res) => {
      // Vahvistetaan syöttökentän sisältö
      const { error, value } = flavourPutSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      try {
        // Määritellään Id
        const apiId = req.params.Id;
        // Etsitään jäätelömakua id:llä
        const FlavourId = await flavour.findOne({ Id: apiId });
        // Jos Id:tä ei löydy, annetaan status 404
        if (!FlavourId) {
          console.log("The page you tried to reach does not exist!");
          return res.status(404).end();
        } else {
          // Jos jäätelömaku löytyy Id:llä niin sen sisältö päivitetään
          const updatedFlavour = await flavour.findOneAndUpdate(
            { Id: apiId },
            { ...req.body },
            { new: true }
          );
          // Annetaan statuskoodi 201 joka viestii, että uusi tieto luotu
          res.status(201).json(updatedFlavour);
        }
        // Tarkistetaan ja lokitetaan serverierrorit
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    })
  );
  return router;
};
