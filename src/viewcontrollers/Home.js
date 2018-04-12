import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";
// import './Home.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import VisibilitySensor from 'react-visibility-sensor';

import HeroImageView from '../components/HeroImageView.js';
import FeaturedBrands from '../components/FeaturedBrands.js';
import WelcomeBlurb from '../components/WelcomeBlurb.js';
import ReservationPromoTable from '../components/ReservationPromoTable.js';
import NewsletterForm from '../components/NewsletterForm.js';

import productsData from '../assets/property-lists/test-products.json';
import ProductGridList from '../components/ProductGridList.js';

import * as api from '../api/api.js';

// list only for testing purposes of
// hero images
import heroImages from '../assets/property-lists/hero-images.json';

function Preloader(props) {
  return (
      <div style={{height:"100px"}}>
      <div className="preloader-wrapper active small center-preloader">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

class Home extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      lastProductId: null,
      productImageURLs: {},
      isLoading: true,
      isLoadingLatestBatch:false,
      didReachBottom: false,
      successfulNewsletterFormCompletion: false
    };

    this.products = [];
    this.productImageURLs = {};

    this.selectedReservationProduct = {};
    // this.reservationBtnClicked = this.reservationBtnClicked.bind(this);
    this.handleProductDetailClick = this.handleProductDetailClick.bind(this);
    this.asyncFetchProducts = this.asyncFetchProducts.bind(this);

    this.handleNewsletterFormSubmit = this.handleNewsletterFormSubmit.bind(this);
  }

  componentDidMount() {
      window.scrollTo(0, 0);
      document.title = "Ritter Cykler";
  }

  handleNewsletterFormSubmit(e, subscriberData) {
    e.preventDefault();
    if (!subscriberData) {
      throw("no subscriber data found.")
    }

    api.subscribeToNewsletter(subscriberData, success => {
      if (success) {
        this.setState({successfulNewsletterFormCompletion: true})
      }
    }).catch(function(error) {
      var $toastContent = $('<span>Ups! Der skete en fejl</span>').add($('<button onClick="this.handleSubmit; class="btn-flat toast-action">Prøv Igen</button>'));
      Materialize.toast($toastContent, 10000);
    });
  }

  asyncFetchProducts() {
    if ((this.state.isLoadingLatestBatch && !this.state.isLoading) || this.state.didReachBottom) { // did not fetch last batch [yet] and has finished initial loading.
      return;
    }

    this.setState({isLoadingLatestBatch: true})

    api.asyncFetchProducts(this.state.lastProductId, products => {
      console.log(this.state.lastProductId);
      console.log(products);

      this.products = this.products.concat(products);
      this.setState({
        products: this.products,
        lastProductId: this.products[(this.products.length - 1)].id,
        isLoading: false,
        isLoadingLatestBatch: false,
        didReachBottom: (products.length === 0) // or check the shallow-keys.length()?
      });

      products.forEach((product) => {
        if (product.imageNames) {
          api.asyncFetchProductImageURL(product.id, product.imageNames[0], imageURL => {
            this.productImageURLs[product.id] = imageURL;
            this.setState({productImageURLs: this.productImageURLs});
          });
        }
      });

    }).catch( (error) => {
      Materialize.toast('Ups! Noget gik galt. Prøv at genindlæse siden', 10000)
      console.log(this.errorMessage = 'Error - ' + error.message)
    });
  }

  handleProductDetailClick(e, product) {
    e.preventDefault();
    this.props.history.push(`/produkt/${product.id}`)
  }

  render() {

    var productSection = <ProductGridList
                            selectedReservationProduct={this.state.selectedReservationProduct}
                            handleProductDetailClick={this.handleProductDetailClick}
                            products={this.state.products}
                            imageURLs={this.state.productImageURLs}
                          />;

    var visibilitySensor = null;
    if (!this.state.didReachBottom)
    {
      visibilitySensor = <VisibilitySensor delayedCall={true} onChange={this.asyncFetchProducts}>
        <Preloader />
      </VisibilitySensor>
    }

    return (

      <div>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Ritter Cykler</title>
            <link rel="canonical" href={window.location.href} />
            <meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
            <meta property="og:type"               content="article" />
            <meta property="og:title"              content="When Great Minds Don’t Think Alike" />
            <meta property="og:description"        content="How much does culture influence creative thinking?" />
            <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
        </Helmet>

        <HeroImageView imageSrc={heroImages["img_01"]} height={500} />

        <div className="section grey lighten-5">
          <div className="container">
            <FeaturedBrands />
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
          <div className="container">
            <h3 className="primary-text headline">Udvalgte tilbud</h3>
            <div className="divider"></div>
            {productSection}
          </div>
          { visibilitySensor }
        </div>

        <div className="section grey darken-4">

          <div className="container">
            <NewsletterForm
              theme={"dark"}
              successfulFormCompletion = {this.state.successfulNewsletterFormCompletion}
              handleSubmit = {this.handleNewsletterFormSubmit}
            />
          </div>

        </div>
      </div>
    )
  }
}

export default Home;
