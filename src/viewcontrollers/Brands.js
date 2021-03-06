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

        <div className="section white">
          <div className="container">
          <div className="row">
            <div className="col s12 m12 l10 xl6">
              <h6 className="text-large-title green-text text-accent-3 text-bold">Mærker</h6>
              <span className="text-primary text-body">Vi fører følgende mærker i butikken</span>
            </div>
            </div>
            <div className="divider"></div>
          </div>
        </div>


        <div className="white section">
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
