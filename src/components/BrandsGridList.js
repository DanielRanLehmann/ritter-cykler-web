import React, { Component } from 'react';
import './BrandsGridList.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function Tile(props) {
  return (
    <div>
      <div className="center-align tile">
        <img width="100%" src={props.image}/>
        <h5 className="primary-text text-title-2 text-bold">{props.title}</h5>
        <a target="_blank" href={props.href} className="waves-effect btn-flat green-text text-accent-3"><i className="left material-icons">open_in_new</i>Besøg Siden</a>
      </div>
    </div>
  )
}

class BrandsGridList extends Component {
    constructor(props) {
      super(props);

    }

    render() {

      return (
        <div>
          <div className="row">
            {
              this.props.tiles.map((tile) =>
                <div className="col s12 m6 l4 xl3">
                  <Tile image={require('../assets/brands/color/' + tile.imageName)} title={tile.title} href={tile.href}/>
                </div>
              )
            }
          </div>
        </div>
      );
    }
}

export default BrandsGridList;
