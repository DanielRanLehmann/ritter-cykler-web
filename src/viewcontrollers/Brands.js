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
        <HeaderView
          title={ "Mærker" }
          subtitle={ "Vi fører følgende mærker i butikken"}
        />

        <div className="white">
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
