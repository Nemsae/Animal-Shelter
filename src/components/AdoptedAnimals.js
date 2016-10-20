import React, { Component } from 'react';
import AnimalStore from '../stores/AnimalStore';
import AdoptedList from './AdoptedList';
import API from '../API';
import AnimalActions from '../actions/AnimalActions';

export default class AdoptedAnimals extends Component {
  constructor () {
    super();

    this.state = {
      unadopted: AnimalStore.getNotAdoptedAnimals(),
      clients: AnimalStore.getClientList()
    };

    this._onChange = this._onChange.bind(this);
    this._adoptAnimal = this._adoptAnimal.bind(this);
  }

  componentWillMount () {
    API.receiveClientsList();
    API.receiveNotAdoptedList();
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      unadopted: AnimalStore.getNotAdoptedAnimals(),
      clients: AnimalStore.getClientList()
    });
  }

  _adoptAnimal (animal, clientsId) {
    animal.clientId = clientsId;
    console.log('animal: ', animal);
    console.log('clientId: ', clientsId);
    AnimalActions.updateAnimal(animal.id, animal);
  }

  render () {
    console.log('unadopted: ', this.state.unadopted);
    return (
      <div className='text-center'>
        <h1>Lonely Animals</h1>
        <AdoptedList unadopted={this.state.unadopted} clients={this.state.clients} _adoptAnimal={this._adoptAnimal} />
      </div>
    );
  }
}
