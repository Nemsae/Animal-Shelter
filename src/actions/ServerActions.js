import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/actionTypes';

const ServerActions = {
  receiveAnimalList (animalList) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_ANIMAL_LIST,
      payload: { animalList }
    });
  },

  receiveAdoptedList (adoptedList) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_ADOPTED_LIST,
      payload: { adoptedList }
    });
  },

  receiveNotAdoptedList (notAdopted) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_NOT_ADOPTED,
      payload: { notAdopted }
    });
  },

  receiveClientsList (clientList) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_CLIENT_LIST,
      payload: { clientList }
    });
  },

  receiveRescues (rescues) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_RESCUES,
      payload: { rescues }
    });
  }
};

export default ServerActions;
