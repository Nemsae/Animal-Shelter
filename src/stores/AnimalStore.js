import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

let _animals = [];
let _adopted = [];
let _unadopted = [];
let _clients = [];

class AnimalStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case types.RECEIVE_ANIMAL_LIST: {
          let { animalList } = action.payload;
          _animals = animalList;
          this.emit('CHANGE');
        } break;
        case types.RECEIVE_ADOPTED_LIST: {
          let { adoptedList } = action.payload;
          _animals = adoptedList;
          this.emit('CHANGE');
        } break;
        case types.RECEIVE_NOT_ADOPTED: {
          let { notAdopted } = action.payload;
          _unadopted = notAdopted;
          this.emit('CHANGE');
        } break;
        case types.RECEIVE_CLIENT_LIST: {
          let { clientList } = action.payload;
          _clients = clientList;
          this.emit('CHANGE');
        } break;
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getAnimals () {
    return _animals;
  }

  getAdoptedAnimals () {
    return _adopted;
  }

  getNotAdoptedAnimals () {
    return _unadopted;
  }

  getClientList () {
    return _clients;
  }
}

export default new AnimalStore();
