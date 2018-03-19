import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import './Home.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import fire from '../fire.js';

import HeroImageView from '../components/HeroImageView.js';
import FeaturedBrands from '../components/FeaturedBrands.js';
import WelcomeBlurb from '../components/WelcomeBlurb.js';
import ReservationPromoTable from '../components/ReservationPromoTable.js';
import NewsletterForm from '../components/NewsletterForm.js';

import productsData from '../property-lists/test-products.json';
import ProductGridList from '../components/ProductGridList.js';

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
      productImageURLs: {},
      isLoading: true,
    };

    this.products = [];
    this.productImageURLs = {};

    this.selectedReservationProduct = {};
    this.reservationBtnClicked = this.reservationBtnClicked.bind(this);
    this.handleProductDetailClick = this.handleProductDetailClick.bind(this);
  }

  componentDidMount() {
      this.asyncFetchProducts();
  }

  asyncFetchProducts() {

    const storage = fire.storage();

    fire.database().ref('products').once("value", snapshot => {
       snapshot.forEach((product) => {
          var productData = product.val();
          productData["id"] = product.key;
          this.products.push(productData);

          if (productData.imageNames && productData.imageNames.length > 0) {
            var imageRef = storage.ref("product-images/" + productData.id + "/" + productData.imageNames[0]);
            imageRef.getDownloadURL().then((url) => {
              this.productImageURLs[productData.id] = url;
              this.setState({productImageURLs: this.productImageURLs});
            });
          }
        });

        this.setState({
          products: this.products,
          isLoading: false
        });

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

    var productSection = null;

    if (this.state.isLoading) {
      productSection = <Preloader />;
    } else {
      productSection = <ProductGridList
                          selectedReservationProduct={this.state.selectedReservationProduct}
                          handleProductDetailClick={this.handleProductDetailClick}
                          reservationBtnClicked={this.reservationBtnClicked}
                          products={this.state.products}
                          imageURLs={this.state.productImageURLs}
                        />
    }

    return (

      <div>
        <HeroImageView imageSrc={"http://localhost:3000/images/hero-golden-gate.jpeg"} height={500} />

        <div className="section white">
          <div className="row container">
            <FeaturedBrands />
          </div>
          <div className="container divider"></div>
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
            {productSection}
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
