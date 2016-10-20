import React from 'react';

const AdoptedList = ({unadopted, clients, _adoptAnimal}) => {
  console.log('clients: ', clients);
  let unadoptedJSX = unadopted.map((animal) => {
    return (
      <div className='card col-xs-4' key={animal.id}>
        <img className='card-img-top' src='https://i.ytimg.com/vi/9JmD_g_qCOM/maxresdefault.jpg' alt='Card image cap' />
        <div className='card-block'>
          <h4 className='card-title'>{animal.name}</h4>
          <p className='card-text'>Type: {animal.type}</p>
          <div className='btn-group'>
            <button type='button updateButton' className='btn btn-success dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              Adopt!
            </button>
            <div className='dropdown-menu'>
              {
                clients.map((client) => {
                  return (
                    <a className='dropdown-item dropDownBro' href='#' onClick={() => _adoptAnimal(animal, client.id)} key={client.id}>{client.name}</a>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      {unadoptedJSX}
    </div>
  );
};

export default AdoptedList;
