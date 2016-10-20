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
        console.log('res: ', res.data);
        ServerActions.receiveAnimalList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.updateAnimal', err);
      });
  },

  receiveNotAdoptedList () {
    axios.get('/api/animals/notadopted')
      .then((res) => {
        ServerActions.receiveNotAdoptedList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.receiveNotAdoptedList', err);
      });
  },

  receiveAdoptedList () {
    axios.get('/api/animals/adopted')
      .then((res) => {
        ServerActions.receiveAdoptedList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.receiveAdoptedList', err);
      });
  },

  receiveClientsList () {
    axios.get('/api/clients')
      .then((res) => {
        // console.log('res: ', res.data);
        ServerActions.receiveClientsList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.receiveClientsList', err);
      });
  }
};

export default API;
