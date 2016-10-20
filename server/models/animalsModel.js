const db = require('../config/db');
const squel = require('squel');

const TABLE_NAME = 'Animals';

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  id INT NOT NULL AUTO_INCREMENT,
  clientId INT,
  name VARCHAR(80),
  type VARCHAR(80),
  PRIMARY KEY (id)
)`, (err) => {
  if (err) throw err;
});

exports.findAll = function () {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${TABLE_NAME}`, (err, animals) => {
      if (err) return reject(err);
      resolve(animals);
    });
  });
};

exports.findAdopted = function () {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                  .from(TABLE_NAME)
                  .field('Animals.id', 'id')
                  .field('Animals.name')
                  .field('Animals.type')
                  .field('clientId')
                  .field('Clients.name', 'clientName')
                  .join('Clients', null, 'Animals.clientId = Clients.id')
                  // .where('Animals.clientId = 1')
                  .toString();
    db.query(sql, (err, adoptedAnimals) => {
      if (err) return reject(err);
      resolve(adoptedAnimals);
    });
  });
};

exports.findSpecific = function () {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                  .from(TABLE_NAME)
                  .field('Animals.id', 'id')
                  .field('Animals.name')
                  .field('Animals.type')
                  .field('clientId')
                  .field('Clients.name', 'clientName')
                  .join('Clients', null, 'Animals.clientId')
                  // .where('Animals.clientId = 1')
                  .toString();
    db.query(sql, (err, adoptedAnimals) => {
      if (err) return reject(err);
      resolve(adoptedAnimals);
    });
  });
};

exports.findNotAdopted = function () {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                  .from(TABLE_NAME)
                  .field('Animals.id', 'id')
                  .field('Animals.name')
                  .field('Animals.type')
                  .where('Animals.clientId = 0')
                  .toString();
    db.query(sql, (err, notAdoptedAnimals) => {
      if (err) return reject(err);
      resolve(notAdoptedAnimals);
    });
  });
};

exports.create = function (animal) {
  // console.log('animal: ', animal);
  if (animal.clientId === '') {
    animal.clientId = 0;
  }
  return new Promise((resolve, reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(animal).toString();

    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.update = function (animalId, updateObj) {
  console.log('updateObj: ', updateObj);
  if (updateObj.clientId === '') {
    updateObj.clientId = 0;
  }
  return new Promise((resolve, reject) => {
    let sql = squel.update().table(TABLE_NAME).setFields(updateObj).where(`id = ${animalId}`).toString();

    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
