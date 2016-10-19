const express = require('express');
const router = express.Router();

const ClientsModel = require('../models/clientsModel');

router.route('/')
  .get((req, res) => {
    ClientsModel.findAll()
      .then((clients) => {
        res.send(clients);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
    ClientsModel.create(req.body)
      .then(() => {
        return ClientsModel.findAll();
      })
      .then((clients) => {
        res.send(clients);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/:id')
  .put((req, res) => {
    ClientsModel.update(req.params.id, req.body)
    .then(() => {
      return ClientsModel.findAll();
    })
    .then((clients) => {
      res.send(clients);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  });

module.exports = router;
