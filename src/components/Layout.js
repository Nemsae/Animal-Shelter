import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Layout extends Component {
  render () {
    return (
      <div>
        <div className='navbar navbar-inverse navbar-fixed-left'>
          <ul className='nav navbar-nav'>
            {/* <li>My Places</li> */}
            <li><Link className='link' to='/'>Home</Link></li>
            <li><Link className='link' to='/animals'>Animals</Link></li>
            <li><Link className='link' to='/adopted'>Lonely Ones</Link></li>
            <li><Link className='link' to='/clients'>The Saints</Link></li>
            {/* <li><Link className='link' to='/favorites'>Favorites</Link><img className='linkImg' src={stickers.favorites} /></li>
            <li><Link className='link' to='/watchList'>WatchList</Link><img className='linkImg' src={stickers.watchlist} /></li> */}
          </ul>
        </div>
        <div className='container'>
          <div>
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}
