import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import './Home.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import fire from '../fire.js';
import VisibilitySensor from 'react-visibility-sensor';

import HeroImageView from '../components/HeroImageView.js';
import FeaturedBrands from '../components/FeaturedBrands.js';
import WelcomeBlurb from '../components/WelcomeBlurb.js';
import ReservationPromoTable from '../components/ReservationPromoTable.js';
import NewsletterForm from '../components/NewsletterForm.js';

import productsData from '../property-lists/test-products.json';
import ProductGridList from '../components/ProductGridList.js';

import * as api from '../api/api.js';

function Preloader(props) {
  return (
      <div style={{height:"800px"}}>
      <div className="preloader-wrapper active center-preloader">
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
      didReachBottom: false
    };

    this.products = [];
    this.productImageURLs = {};

    this.selectedReservationProduct = {};
    this.reservationBtnClicked = this.reservationBtnClicked.bind(this);
    this.handleProductDetailClick = this.handleProductDetailClick.bind(this);
    this.asyncFetchProducts = this.asyncFetchProducts.bind(this);
  }

  componentDidMount() {
      // this.asyncFetchProducts();
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
          api.asyncFetchProductImage(product.id, product.imageNames[0], imageURL => {
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
    this.props.history.push(`/produkt/${product.id}`);
  }

  reservationBtnClicked(e, product) {
    e.stopPropagation();

    this.selectedReservationProduct = product;
    this.selectedReservationProduct["firstImageURL"] = "http://localhost:3000/images/product-placeholder.png";
    this.setState({selectedReservationProduct: this.selectedReservationProduct});

    const storage = fire.storage();

    if ("imageNames" in this.selectedReservationProduct && this.selectedReservationProduct.imageNames.length > 0) {
      var imageRef = storage.ref("product-images/" + this.selectedReservationProduct.id + "/" + this.selectedReservationProduct.imageNames[0]);
      imageRef.getDownloadURL().then((url) => {
        this.selectedReservationProduct["firstImageURL"] = url;
        this.setState({selectedReservationProduct: this.selectedReservationProduct});
      });
    }

    $('#product-reservation-modal').modal('open'); // open after async setstate call?
  }

  render() {

    var productSection = <ProductGridList
                            selectedReservationProduct={this.state.selectedReservationProduct}
                            handleProductDetailClick={this.handleProductDetailClick}
                            reservationBtnClicked={this.reservationBtnClicked}
                            products={this.state.products}
                            imageURLs={this.state.productImageURLs}
                          />;

    /*
    if (this.state.isLoading) {
      productSection = <Preloader />;
    } else {
      productSection = <ProductGridList
                          asyncFetchProducts={this.asyncFetchProducts}
                          selectedReservationProduct={this.state.selectedReservationProduct}
                          handleProductDetailClick={this.handleProductDetailClick}
                          reservationBtnClicked={this.reservationBtnClicked}
                          products={this.state.products}
                          imageURLs={this.state.productImageURLs}
                        />
    }
    */

    var visibilitySensor = null;
    if (!this.state.didReachBottom)
    {
      visibilitySensor = <VisibilitySensor delayedCall={true} onChange={this.asyncFetchProducts}>
        <Preloader />
      </VisibilitySensor>
    }

    return (

      <div>
        <HeroImageView imageSrc={"http://localhost:3000/images/hero-golden-gate.jpeg"} height={500} />

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
            <h3 className="primary-text headline">Tilbud</h3>
            <div className="divider"></div>
            {productSection}
          </div>
          { visibilitySensor }
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
