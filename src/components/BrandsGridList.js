import React, { Component } from 'react';
import './BrandsGridList.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function Tile(props) {
  return (
    <div>
      <div className="center-align tile hoverable">
        <img width="100%" src={props.imageSrc}/>
        <h5 className="primary-text title">{props.title}</h5>
        <a target="_blank" href={props.href} className="waves-effect btn-flat green-text text-accent-3"><i className="left material-icons">open_in_new</i>Besøg Siden</a>
      </div>
      <div className="divider"></div>
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
                <div className="col s12 m6 l3">
                  <Tile imageSrc={tile.imageSrc} title={tile.title} href={tile.href}/>
                </div>
              )
            }

          </div>
        </div>
      );
    }
}

export default BrandsGridList;
