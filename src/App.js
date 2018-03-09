import React, { Component } from 'react';
import './App.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Navbar from './components/Navbar.js';
import FAB from './components/FloatingActionButton.js';

import FeedbackButton from './components/FeedbackButton.js';

import HeroImageView from './components/HeroImageView.js';
import BrandsBanner from './components/BrandsBanner.js';
import WelcomeBlurb from './components/WelcomeBlurb.js';
import ReservationPromoTable from './components/ReservationPromoTable.js';
import NewsletterForm from './components/NewsletterForm.js';

import Brands from './scenes/Brands.js';
import WorkshopAndPrices from './scenes/WorkshopAndPrices.js';
import Contact from './scenes/Contact.js';

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

        <Navbar activeItem={ "kontakt" } />

        <Contact />
        <WorkshopAndPrices />

        <Footer />

        <HeroImageView imageSrc={"http://localhost:3000/images/hero-golden-gate.jpeg"} height={500} />

        <div className="section grey lighten-5">
          <div className="row container">
            <BrandsBanner />
          </div>
        </div>

        <div className="section white">
          <div className="row container">
            <WelcomeBlurb />
          </div>
        </div>

        <div className="container divider"></div>

        <div className="section white">
          <div className="row container">
            <ReservationPromoTable />
          </div>
        </div>

        <div className="section white">
          <div className="row container">

            <h3 className="primary-text headline">Tilbud</h3>
            <div className="divider"></div>

          </div>
        </div>

        <div className="section grey darken-4">

          <div className="container">
            <NewsletterForm theme={"dark"} />
          </div>

        </div>

        <div className="fixed-action-btn-left">
          <FeedbackButton />
        </div>

      </div>
    );
  }
}

export default App;
