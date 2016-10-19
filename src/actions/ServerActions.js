import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

const ServerActions = {
  receiveAnimalList (animalList) {
    console.log('animalList: ', animalList);
    AppDispatcher.dispatch({
      type: types.RECEIVE_ANIMAL_LIST,
      payload: { animalList }
    });
  }
};

export default ServerActions;
