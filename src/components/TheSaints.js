import React, { Component } from 'react';
import AnimalStore from '../stores/AnimalStore';
import API from '../API';
import AnimalActions from '../actions/AnimalActions';

export default class TheSaints extends Component {
  constructor () {
    super();

    this.state = {
      clients: AnimalStore.getClientList(),
      input: '',
      rescues: AnimalStore.getRescues()
    };

    this._onChange = this._onChange.bind(this);
    this._addNewClient = this._addNewClient.bind(this);
    this._grabInput = this._grabInput.bind(this);
  }

  componentWillMount () {
    API.receiveClientsList();
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      clients: AnimalStore.getClientList(),
      rescues: AnimalStore.getRescues()
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

  _fetchRescues (id) {
    console.log('id: ', id);
    API.receiveRescues(id);
  }

  render () {
    let { clients, rescues } = this.state;
    console.log('rescues: ', rescues);
    let Rescues = [];
    if (rescues !== undefined) {
      Rescues = rescues.map((rescue, i) => (
        <h4 key={i}>{rescue.name} the {rescue.type}</h4>
      ));
    }
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
        </div>
          {
              clients.map((client) => {
                return (
                  <div className='card col-xs-3' key={client.id}>
                    <img className='card-img-top' src='https://i.ytimg.com/vi/9JmD_g_qCOM/maxresdefault.jpg' alt='Card image cap' />
                    <div className='card-block'>
                      <h4 className='card-title'>{client.name}</h4>
                      <button className='btn btn-primary' data-toggle='modal' data-target={`#modal${client.id}`} onClick={this._fetchRescues.bind(null, client.id)}>Rescues</button>
                    </div>
                    <div className='modal fade' id={`modal${client.id}`} tabIndex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
                      <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                              <span aria-hidden='true'>&times;</span>
                            </button>
                            <h4 className='modal-title' id='myModalLabel'>Rescues of {client.name}</h4>
                          </div>
                          <div className='modal-body'>
                            {Rescues}
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
