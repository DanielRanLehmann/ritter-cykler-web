import React, { Component } from 'react';
import './App.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Navbar from './components/Navbar.js';
import FeedbackButton from './components/FeedbackButton.js';

import Home from './scenes/Home.js';
import Brands from './scenes/Brands.js';
import WorkshopAndPrices from './scenes/WorkshopAndPrices.js';
import Contact from './scenes/Contact.js';

import ProductDetails from './scenes/ProductDetails.js';

import Footer from './components/Footer.js';

class App extends Component {

  componentDidMount() {
      $( document ).ready(function(){
        $(".button-collapse").sideNav();
      });

  }

  render() {
    return (

      <div className="App">

        <Navbar activeItem="kontakt2" />
        <WorkshopAndPrices />

        <ProductDetails
          id={"-L5ck1XUopm8SLknYkiq"}
          breadcrumbs={[
            <a href="/" style={{"opacity": "0.70"}} className="white-text breadcrumb"><i style={{"opacity": "0.70"}} className="material-icons">home</i></a>
          ]}
        />

        <Footer />

        <div className="fixed-action-btn-left">
          <FeedbackButton />
        </div>

      </div>
    );
  }
}

export default App;
