import React, { Component } from 'react';
import AnimalStore from '../stores/AnimalStore';
import API from '../API';
import AnimalActions from '../actions/AnimalActions';

export default class TheSaints extends Component {
  constructor () {
    super();

    this.state = {
      clients: AnimalStore.getClientList(),
      input: ''
    };

    this._onChange = this._onChange.bind(this);
    this._addNewClient = this._addNewClient.bind(this);
    this._grabInput = this._grabInput.bind(this);
  }

  componentWillMount () {
    API.receiveClientsList();
    API.receiveClientsList2();
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      clients: AnimalStore.getClientList()
    });
  }

  _grabInput (e) {
    this.setState({
      input: e.target.value
    });
  }

  _addNewClient () {
    let { input } = this.state;
    let newClient = {
      name: input
    };
    AnimalActions.addNewClient(newClient);
  }

  render () {
    let { clients } = this.state;
    console.log('clients: ', clients);
    return (
      <div className='text-center'>
        <h1>The Saints</h1>
        <div className='col-lg-12'>
          <div className='input-group'>
            <span className='input-group-btn'>
            </span>
            <input type='text' ref='clientInput' className='form-control' onChange={this._grabInput} placeholder='Name of our new client' />
            <span className='input-group-btn'>
              <button className='btn btn-secondary btn-success' onClick={this._addNewClient} type='button'>Add</button>
            </span>
          </div>
          {
              clients.map((client) => {
                return (
                  <div className='card col-xs-3' key={client.id}>
                    <img className='card-img-top' src='https://i.ytimg.com/vi/9JmD_g_qCOM/maxresdefault.jpg' alt='Card image cap' />
                    <div className='card-block'>
                      <h4 className='card-title'>{client.name}</h4>
                      <p className='card-text'>Rescues: {}</p>
                    {/* <p className='card-text'>Type: {animal.type}</p>
                    <p className='card-text'>Client ID: {animal.clientId}</p> */}
                    </div>
                  </div>
                );
              })
          }
        </div>

        {/* <div className='modal fade' id='myModal' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
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
        <AnimalList {...this.state} /> */}
      </div>
    );
  }
}
