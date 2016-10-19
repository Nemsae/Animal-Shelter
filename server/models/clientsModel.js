const db = require('../config/db');
const squel = require('squel');

const TABLE_NAME = 'Clients';

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80),
  PRIMARY KEY (id)
)`, (err) => {
  if (err) throw err;
});

exports.findAll = function () {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${TABLE_NAME}`, (err, clients) => {
      if (err) return reject(err);
      resolve(clients);
    });
  });
};

exports.findSpecific = function () {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                  .from(TABLE_NAME)
                  .field('Animals.id', 'id')
                  .field('Animals.name')
                  .field('clientId')
                  .field('Clients.name', 'clientName')
                  .join('Clients', null, 'Animals.clientId = Clients.id')
                  // .where('Animals.teamId = 1')
                  .toString();
    db.query(sql, (err, players) => {
      if (err) return reject(err);
      resolve(players);
    });
  });
};

exports.create = function (client) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(client).toString();

    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.update = function (animalId, updateObj) {
  return new Promise((resolve, reject) => {
    let sql = squel.update().table(TABLE_NAME).setFields(updateObj).where(`id = ${animalId}`).toString();

    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
