import API from '../API';
// import AppDispatcher from '../AppDispatcher';

const AnimalActions = {
  sendNewAnimal (aPackage) {
    API.sendNewAnimal(aPackage);
  },

  updateAnimal (id, uPackage) {
    API.updateAnimal(id, uPackage);
  }
};

export default AnimalActions;
