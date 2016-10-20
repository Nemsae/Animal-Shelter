import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
import AnimalList from './AnimalList';
import API from '../API';

export default class AnimalsPage extends Component {
  constructor () {
    super();

    this.state = {
      name: '',
      trigger: false
    };

    this._grabInput = this._grabInput.bind(this);
    this._submitNewEntry = this._submitNewEntry.bind(this);
    this._fetchAdoptedList = this._fetchAdoptedList.bind(this);
    this._fetchAnimalList = this._fetchAnimalList.bind(this);
  }

  componentWillMount () {
    API.receiveAnimalList();
  }

  _grabInput (e) {
    let input = e.target.value;
    this.setState({
      name: input
    });
  }

  _fetchAnimalList () {
    API.receiveAnimalList();
    let { trigger } = this.state;
    this.setState({
      trigger: !trigger
    });
  }

  _fetchAdoptedList () {
    API.receiveAdoptedList();
    let { trigger } = this.state;
    this.setState({
      trigger: !trigger
    });
  }

  _submitNewEntry () {
    let { type, clientId, input } = this.refs;
    let newAnimalPackage = {
      name: this.state.name,
      type: type.value,
      clientId: clientId.value
    };
    AnimalActions.sendNewAnimal(newAnimalPackage);
    type.value = '';
    clientId.value = '';
    input.value = '';
  }

  render () {
    let adopted = <button className='btn btn-secondary btn-danger' type='button' onClick={this._fetchAdoptedList}>Adopted</button>;
    let all = <button className='btn btn-primary' type='button' onClick={this._fetchAnimalList}>See All</button>;
    return (
      <div className='text-center'>
        <h1>Animals Page</h1>
        <div className='col-lg-12'>
          <div className='input-group'>
            <span className='input-group-btn'>
              {this.state.trigger ? all : adopted}
            </span>
            <input type='text' ref='input' className='form-control' onChange={this._grabInput} placeholder='Name of our new furry friend...' />
            <span className='input-group-btn'>
              <button className='btn btn-secondary btn-success' data-toggle='modal' data-target='#myModal' type='button'>Add</button>
            </span>
          </div>
        </div>

        <div className='modal fade' id='myModal' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
                <h4 className='modal-title' id='myModalLabel'>Additional Info</h4>
              </div>
              <div className='modal-body'>
                <input className='col-xs-12' type='text' ref='type' placeholder='Type of animal...' />
                <input className='col-xs-12' type='text' ref='clientId' placeholder='Client ID if applicable...' />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel Entry</button>
                <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this._submitNewEntry}>Submit Entry</button>
              </div>
            </div>
          </div>
        </div>
        <AnimalList {...this.state} />
      </div>
    );
  }
}
