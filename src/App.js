import React, { Component } from 'react';

import './App.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Navbar from './components/Navbar.js';
import FeedbackButton from './components/FeedbackButton.js';

/*
import Home from './scenes/Home.js';
import Brands from './scenes/Brands.js';
import WorkshopAndPrices from './scenes/WorkshopAndPrices.js';
import Contact from './scenes/Contact.js';
import ProductDetails from './scenes/ProductDetails.js';
*/

// find cookie legislation for DK.
import CookieBanner from 'react-cookie-banner';

import Footer from './components/Footer.js';
import FeedbackModal from './components/FeedbackModal.js';

import Main from './viewcontrollers/Main.js';

class App extends Component {

  componentDidMount() {
      $( document ).ready(function(){
        $(".button-collapse").sideNav();
      });

  }

  render() {

    return (

      <div className="App">

        <Navbar activeItem="Værksted Og Priser" />
        <Main />
        <Footer />

        <div className="hide-on-med-and-down fixed-action-btn-left">
          <FeedbackButton />
        </div>

        <FeedbackModal locationPath={window.location.pathname} />

        <CookieBanner
          message="Yes, we use cookies. If you don't like it change website, we won't miss you!"
          onAccept={() => {}}
          cookie="user-has-accepted-cookies" />
          
      </div>
    );
  }
}

export default App;
