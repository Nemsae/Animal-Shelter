const express = require('express');
const router = express.Router();

const AnimalsModel = require('../models/animalsModel');

router.route('/')
  .get((req, res) => {
    AnimalsModel.findAll()
      .then((animals) => {
        res.send(animals);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
    console.log('req.body: ', req.body);
    AnimalsModel.create(req.body)
      .then(() => {
        return AnimalsModel.findAll();
      })
      .then((animals) => {
        res.send(animals);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/adopted')
  .get((req, res) => {
    AnimalsModel.findAdopted()
      .then((adoptedAnimals) => {
        res.send(adoptedAnimals);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/notadopted')
  .get((req, res) => {
    AnimalsModel.findNotAdopted()
      .then((notAdoptedAnimals) => {
        res.send(notAdoptedAnimals);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/:id')
  .put((req, res) => {
    AnimalsModel.update(req.params.id, req.body)
    .then(() => {
      return AnimalsModel.findAll();
    })
    .then((animals) => {
      res.send(animals);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  });

module.exports = router;
