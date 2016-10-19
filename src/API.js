import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  receiveAnimalList () {
    axios.get('/api/animals')
      .then((res) => {
        ServerActions.receiveAnimalList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.receiveAnimalList', err);
      });
  },

  sendNewAnimal (aPackage) {
    axios.post('/api/animals', aPackage)
      .then((res) => {
        ServerActions.receiveAnimalList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.sendNewAnimal', err);
      });
  },

  updateAnimal (id, uPackage) {
    axios.put(`/api/animals/${id}`, uPackage)
      .then((res) => {
        console.log('res: ', res);
        ServerActions.receiveAnimalList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.updateAnimal', err);
      });
  }
};

export default API;
