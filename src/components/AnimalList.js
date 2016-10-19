import React, { Component } from 'react';
import AnimalStore from '../stores/AnimalStore';
import AnimalActions from '../actions/AnimalActions';

export default class AnimalList extends Component {
  constructor () {
    super();

    this.state = {
      animals: AnimalStore.getAnimals(),
      uName: '',
      uType: '',
      uId: ''
    };

    this._onChange = this._onChange.bind(this);
    this._updateEntry = this._updateEntry.bind(this);
    this._grabNameInput = this._grabNameInput.bind(this);
    this._grabTypeInput = this._grabTypeInput.bind(this);
    this._grabIdInput = this._grabIdInput.bind(this);
  }

  componentWillMount () {
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      animals: AnimalStore.getAnimals()
    });
  }

  _grabNameInput (e) {
    // let { name1 } = this.refs;
    // console.log('name1: ', name1);
    let nameInput = e.target.value;
    console.log('nameInput: ', nameInput);
    this.setState({
      uName: nameInput
    });
  }

  _grabTypeInput (e) {
    let typeInput = e.target.value;
    console.log('typeInput: ', typeInput);
    this.setState({
      uType: typeInput
    });
  }

  _grabIdInput (e) {
    let idInput = e.target.value;
    console.log('idInput: ', idInput);
    this.setState({
      uId: idInput
    });
  }

  _updateEntry (animal) {
    let id = animal.id;
    console.log('this.refs[animal.clientId]: ', this.refs[animal.clientId]);
    let updatedPackage = {
      name: this.refs[animal.name].value,
      type: this.refs[animal.type].value,
      clientId: this.refs[animal.clientId] ? this.refs[animal.clientId].value : ''
    };
    // console.log('this.refs[animal.clientId].value: ', this.refs[animal.clientId].value);
    console.log('updatedPackage: ', updatedPackage);
    AnimalActions.updateAnimal(id, updatedPackage);
  }

  render () {
    let { animals } = this.state;
    // console.log('animals: ', animals);
    return (
      <div>
        {
          animals.map((animal) => {
            return (
              <div className='card col-xs-4' key={animal.id}>
                <img className='card-img-top' src='https://i.ytimg.com/vi/9JmD_g_qCOM/maxresdefault.jpg' alt='Card image cap' />
                <div className='card-block'>
                  <h4 className='card-title'>{animal.name}</h4>
                  <p className='card-text'>Type: {animal.type}</p>
                  <p className='card-text'>Client ID: {animal.clientId}</p>
                  <a href='#' className='btn btn-primary updateButton' data-toggle='modal' data-target={`#modal${animal.id}`}>Update Info</a>
                </div>

                <div className='modal fade' id={`modal${animal.id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>&times;</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>Additional Info</h4>
                      </div>
                      <div className='modal-body'>
                        <input className='col-xs-12' type='text' ref={animal.name} onChange={this._grabNameInput} defaultValue={animal.name} />
                        {/* <input className='col-xs-12' type='text' ref={`name${animal.name}`} onChange={this._grabNameInput} defaultValue={animal.name} /> */}
                        {/* <input className='col-xs-12' type='text' ref='name1' onChange={this._grabNameInput} defaultValue={animal.name} /> */}
                        <input className='col-xs-12' type='text' ref={animal.type} onChange={this._grabTypeInput} defaultValue={animal.type} />
                        <input className='col-xs-12' type='text' ref={animal.clientId} onChange={this._grabIdInput} defaultValue={animal.clientId} />
                      </div>
                      <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Entry</button>
                        <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._updateEntry.bind(this, animal)}>Update Entry</button>
                        {/* <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._updateEntry.bind(this, animal.id)}>Update Entry</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}