import API from '../API';
// import AppDispatcher from '../AppDispatcher';

const AnimalActions = {
  sendNewAnimal (aPackage) {
    API.sendNewAnimal(aPackage);
  },

  updateAnimal (id, uPackage) {
    API.updateAnimal(id, uPackage);
  },

  updateAnimal2 (id, uPackage) {
    API.updateAnimal2(id, uPackage);
  },

  addNewClient (name) {
    API.sendNewClient(name);
  }
};

export default AnimalActions;
