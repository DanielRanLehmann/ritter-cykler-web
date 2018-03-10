import React, { Component } from 'react';
// import './Home.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import HeroImageView from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/HeroImageView.js';
import BrandsBanner from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/BrandsBanner.js';
import WelcomeBlurb from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/WelcomeBlurb.js';
import ReservationPromoTable from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/ReservationPromoTable.js';
import NewsletterForm from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/NewsletterForm.js';

import productsData from '../property-lists/test-products.json';
import ProductGridList from '../components/ProductGridList.js';

class Home extends Component {
  render() {
    return (

      <div>
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

        <div className="section white">
          <div className="row container">
            <ReservationPromoTable />
          </div>
        </div>

        <div className="section white">
          <div className="row container">

            <h3 className="primary-text headline">Tilbud</h3>
            <div className="divider"></div>
            <ProductGridList products={productsData} />
          </div>
        </div>



        <div className="section grey darken-4">

          <div className="container">
            <NewsletterForm theme={"dark"} />
          </div>

        </div>
      </div>
    )
  }
}

export default Home;
