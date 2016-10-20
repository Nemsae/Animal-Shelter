require('dotenv').config();

const db = require('./server/config/db');
const squel = require('squel');

//  drop the tablesx
// db.query('drop table Teams');
db.query('drop table Animals', (err) => {
  if (err) throw err;

  require('./server/models/animalsModel');
  // require('./server/models/clientsModel');

  //  insert some sample data
  let animalSql = squel.insert().into('Animals').setFieldsRows([
    { name: 'John', type: 'Red Panda', img: 'http://i.imgur.com/RUoZBlm.png'},
    { name: 'Donovan', type: 'Golden Retriever', img: 'http://reliabletexaspower.com/wp-content/uploads/2014/12/golden-retriever.jpg'},
    { name: 'Josh', type: 'Seal', img: 'http://www.biologicaldiversity.org/assets/img/species/mammals/BeardedSealFlickr_foilistpeter.jpg'},
    { name: 'Miggy', type: 'Ferret', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/XenoFerret.jpg'}
  ]).toString();

  db.query(animalSql, (err) => {
    if (err) throw err;
  });

  // //  insert some sample data
  // let teamSql = squel.insert().into('Teams').setFieldsRows([
  //   { name: 'Dodgers' }, //  insert
  //   { name: 'Giants' }
  // ]).toString();
  //
  // db.query(teamSql, (err) => {
  //   if (err) throw err;
  // });

  db.end(() => console.log('Done!'));
});
