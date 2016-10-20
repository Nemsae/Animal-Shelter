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
  let playerSql = squel.insert().into('Animals').setFieldsRows([
    { name: 'Furry', type: 'Ferret' },
    { name: 'Kitty', type: 'Cat' },
    { name: 'Puppy', type: 'Dog' }
  ]).toString();

  db.query(playerSql, (err) => {
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
