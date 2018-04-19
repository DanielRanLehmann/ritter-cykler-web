import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import './ProductDetails.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Breadcrumbs from '../components/Breadcrumbs.js';
import Carousel from '../components/Carousel.js';
import ReservationModal from '../components/ReservationModal.js';

import FBComments from '../components/FBComments.js';

import fire from '../fire.js';

import Select from '../components/Select.js';
import Button from '../components/Button.js';
import * as api from '../api/api.js';

import {FormattedNumber} from 'react-intl';

import NotFound from './NotFound.js';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: "Vælg størrelse",
      isSelectedSizeSoldout: false,
      product: {
        imageURLs: [], // only for testing.
        sizes: [],
        qty: [],
        descriptionText: null,
        highlightTags: [],
        outOfTheBoxTags: [],
        techSpecTags: [],
        manifacturerInfoTags: []
      },
      imageURLs: [],
      isLoading: true,
      productExists: null,
      helmet: null
    };

    this.product = { highlightTags: [], outOfTheBoxTags: [], techSpecTags: [], manifacturerInfoTags: [] };
    this.imageURLs = [];
    this.carouselItems = [];
    this.openReservationModal = this.openReservationModal.bind(this);

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleReservationSubmit = this.handleReservationSubmit.bind(this);
  }

  openReservationModal() {
    $('#product-reservation-modal').modal('open');
  }

  handleSizeChange(value) {
    this.setState({
        selectedSize: value,
        isSelectedSizeSoldout: (this.state.product.qty[value] <= 0)
      });
  }

  handleReservationSubmit(e, reservation) {
    e.preventDefault();

    // the callback is a bit weird here..
    // if callback is triggered everything is well, no need for success var.
    api.sendReservation(reservation, success => {
      if (success) {
          Materialize.toast("Tak! " + this.state.product.name + " er reserveret til dig.", 4000);
          // should reload product details because qty has changed.
      }

    }).catch(function(error) {
      console.log(error);
      var $toastContent = $('<span>Ups! Der skete en fejl</span>').add($('<button onClick="handleOrder; class="btn-flat toast-action">Prøv Igen</button>'));
      Materialize.toast($toastContent, 10000);

    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const productId = this.props.match.params.productId;
    if (productId) {
        // document.title = "Indlæser";
        api.asyncFetchProductDetails(productId, (exists, product) => {
          if (exists) {
            // document.title = product.name + " - Ritter Cykler";
            this.product = product;

            let _selectedSize = this.product.sizes.includes("*") ? "*" : "Vælg størrelse";
            let _sizeSoldout = null;
            if (_selectedSize) {
                _sizeSoldout = (this.state.product.qty[_selectedSize] <= 0);
            }

            this.setState({
              product: this.product,
              selectedSize: _selectedSize,
              isSelectedSizeSoldout: _sizeSoldout,
              isLoading:false,
              productExists: true
            });

          } else {
            document.title = "Ritter Cykler";

            this.setState({
              productExists: false,
              isLoading: false
            });
          }
        }).catch( (error) => {
          console.log(this.errorMessage = 'Error - ' + error.message)
        });

    } else {
      console.log("this is called.")
      // else a 404 error has occured. push to 404 scene or detail that the product was not found.
      // push to 404 error?
      // or redirect to 'home' -> /
    }
  }

  render() {

    // LOADING STATE
    if (this.state.isLoading) {
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

            <div style={{height:"100vh"}}>
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
          </div>
        )
    }

    if (!this.state.productExists) {
      return (
        <NotFound />
      )
    }

    var selectSizeField = null;

    var reservationBtnStyle = null;
    var initialBtnPadding = null;
    var reservationBtn = null;
    var reservationBtnDisabled = null;
    var reservationBtnDisabled = false;
    var reservationBtnClass = "z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger";
    var _isSelectedSizeSoldout = this.state.isSelectedSizeSoldout;

    var carousel = null;
    var mediaSection = null;

    // MULTIPLE SIZES ? THEN DISPLAY SIZES SELECT FIELD

    if (!this.state.product.sizes.includes("*")) {

      var sizeOptions = []
      this.state.product.sizes.forEach((size) => {
        const soldout = this.state.product.qty[size] == 0;
        const disabled = soldout ? "disabled" : null
        sizeOptions.push({
          "value": size,
          "text": size + " " + (soldout ? "(udsolgt)" : ""),
          "disabled": soldout
        });

        // size + " " + (soldout ? "(udsolgt)" : null)

      });

      selectSizeField =
        <div className="row">
          <div className="input-field col s4">
            <Select onSelection={(e) => {this.handleSizeChange(e.target.value)} }
                    options={sizeOptions} // [text, soldout] # like a tuple.
                    placeholder={"Vælg størrelse"}
                    selectDisabled={!this.state.product.inStock}
            />
          </div>
        </div>


    } else {
      reservationBtnStyle = {};
      initialBtnPadding = <br></br>
    }

    // STATE OF RESERVATION BUTTON
    reservationBtnDisabled = (!this.state.product.inStock || _isSelectedSizeSoldout)

    if (reservationBtnDisabled || (selectSizeField && this.state.selectedSize === "Vælg størrelse")) {
      reservationBtnClass += " disabled"
    }

    var reservationBtnText = (_isSelectedSizeSoldout || this.state.product.inStock) ? "Reservér" : "Udsolgt";
    reservationBtn = <a style={reservationBtnStyle}
                    onClick={this.openReservationModal}
                    className={reservationBtnClass}>
                    {reservationBtnText}
                  </a>

    // DISPLAY IMAGES IN CAROUSEL IF ANY EXISTS

    if (this.state.product.imageURLs.length > 0) {
      var largeImgURLs = []
      for (var imageURL in this.state.product.imageURLs) {
        largeImgURLs.push(imageURL.large)
      }

      carousel = <Carousel carouselDidLoad={this.state.carouselDidLoad} imageURLs={largeImgURLs}/>;
    }

    // YOUTUBE URL PROVIDED?

    if (this.state.product.youtubeURL) {
      var _youtubeURL = this.state.product.youtubeURL.replace("watch?v=", "embed/")
      mediaSection = <div className="section white">
        <div className="container">
          <div className="section">
            <div className="center">
              <h5 className="text-primary text-title-1 text-bold">Se i aktion</h5>
              <br></br>
              <div className="video-container">
                <iframe width="100%" height="480" src={_youtubeURL} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    }

    return (

        <div>

          <Helmet>
              <meta charSet="utf-8" />
              <title>{this.state.product.name} - Ritter Cykler</title>
              <link rel="canonical" href={window.location.href} />
              <meta property="og:url"                content={window.location.href} />
              <meta property="og:type"               content="product" />
              <meta property="og:title"              content={this.state.product.name} />
              <meta property="og:description"        content={this.state.product.descriptionText} />
              <meta property="og:image"              content={this.state.product.imageURLs[0]} />
          </Helmet>

          <Breadcrumbs items={[
            <Link to={'/'} className="breadcrumb"><i className="material-icons">home</i></Link>,
            <a href="#!" className="white-text breadcrumb">{this.state.product.name.substring(0, 20) + "..."}</a>
          ]}/>

          <div className="section white">
            <div className="container">
              <div className="row">
                <div className="col s12 l6">
                <p className="caption amber-text text-accent-4">{this.state.product.isNew ? "Nyhed" : null}</p>
                <h5 className="text-primary text-large-title text-bold">{this.state.product.name}</h5>
                <h5 className="text-primary text-title-3">
                  <FormattedNumber
                      style='currency'
                      currency={this.state.product.currency}
                      value={this.state.product.discountPrice}
                  />
                </h5>

                {selectSizeField}

                {initialBtnPadding}
                {reservationBtn}
                <br></br>
                <br></br>


                <ReservationModal
                  handleSubmit={this.handleReservationSubmit}
                  product={this.state.product}
                  selectedSize={this.state.selectedSize}
                />

                <p className="hide-on-med-and-up text-secondary text-body"><i className="left inline-small-icon material-icons">chat_bubble</i> Få hjælp til at købe produktet. <a className="green-text text-accent-3" href="https://messenger.com">Skriv på Messenger</a> eller ring til os på 45 87 66 01</p>
                <p className="hide-on-small-only text-secondary text-body"><i className="left inline-small-icon material-icons">chat_bubble</i> Få hjælp til at købe produktet. <a className="green-text text-accent-3" href="https://messenger.com">Skriv på Messenger</a> eller<br/>ring til os på 45 87 66 01</p>

                <div className="divider"></div>

              </div>


              <div className="col s12 l6">
                {carousel}
              </div>
            </div>
          </div>
        </div>

        {mediaSection}

        <div className="section container row">
            <h5 className="text-primary text-title-1 text-bold">Produkt Information</h5>
            <div className="divider"></div>

            <div className="section">
              <div className="col s12">
                <div className="row">
                  <div className="col l3 hide-on-med-and-down">
                    <h5 className="text-primary text-title-2">Overblik</h5>
                  </div>
                  <div className="col s12 l8 offset-l1">
                    <h5 className="hide-on-large-only text-title-2">Overblik</h5>
                    <p className="text-primary text-body">{this.state.product.descriptionText}</p>
                  </div>

                </div>
              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="text-title-2">Highlights</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only text-title-2">Highlights</h5>
                  <ul className="text-primary text-body">
                  {
                    this.state.product.highlightTags.map((tag) =>
                      <li>{tag}</li>
                    )
                  }
                  </ul>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="text-title-2">Lagde du mærke til?</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only text-title-2">Lagde du mærke til?</h5>
                  <p className="text-primary text-body">{this.state.product.didYouNoticeText}</p>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="text-title-2">Forslået brug</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only text-title-2">Forslået brug</h5>
                  <p className="text-primary text-body">{this.state.product.recommendedText}</p>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="text-title-2">Ud af boksen</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only text-title-2">Ud af kassen</h5>
                  <ul className="text-primary text-body">
                  {
                    this.state.product.outOfTheBoxTags.map((tag) =>
                      <li>{tag}</li>
                    )
                  }
                  </ul>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="text-title-2">Tekniske specifikationer</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only text-title-2">Tekniske specifikationer</h5>
                  <ul className="text-primary text-body">
                  {
                    this.state.product.techSpecTags.map((tag) =>
                      <li>{tag}</li>
                    )
                  }
                  </ul>
                </div>
              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="text-title-2">Fabrikant information</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only text-title-2">Fabrikant information</h5>
                  <ul className="text-primary text-body">
                  {
                    this.state.product.manifacturerInfoTags.map((tag) =>
                      <li>{tag}</li>
                    )
                  }
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <div className="section container">

          <h5 className="text-primary text-title-1 text-bold">
            Kommentarer
          </h5>

          <div className="divider"></div>

          <div className="section">
            <div className="col s12">
            <FBComments appId={"908452875925365"} href={window.location.href}/>
            </div>
          </div>

          </div>

        <div className="divider"></div>
      </div>
    );
  }
}

export default ProductDetails;
