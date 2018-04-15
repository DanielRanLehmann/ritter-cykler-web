import React, { Component } from 'react';
import './Brands.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import HeaderView from '../components/HeaderView.js';
import FAB from '../components/FloatingActionButton.js';

import BrandsGridList from '../components/BrandsGridList.js';
import brandsData from '../assets/property-lists/brands.json';

class Brands extends Component {

  componentDidMount() {
      window.scrollTo(0, 0);
      document.title = "Mærker - Ritter Cykler";

      $( document ).ready(function(){

      });

  }

  render() {
    return (
      <div>

        <div className="white section">
          <div className="container">
            <div className="row">
              <div className="col s12 m12 l10 xl6">
                <h6 className="text-display-1 green-text text-accent-3">Mærker</h6>
                <span className="primary-text text-subhead">Vi fører følgende mærker i butikken</span>
              </div>
            </div>
          </div>

          <div className="container">
            <BrandsGridList tiles={brandsData}/>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    );
  }
}

export default Brands;
