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

            if (this.product.imageNames && this.product.imageNames.length > 0) {

              for (var i = 0; i < this.product.imageNames.length; i++) {
                const imageName = this.product.imageNames[i];
                api.asyncFetchProductImageURL(product.id, imageName, imageURL => {
                  this.imageURLs.push(imageURL)
                  if (i == (this.product.length - 1)) {
                    this.setState({imageURLs: this.imageURLs});
                  }
                });
              }
            }
            // where should I put the set statement?

            let _selectedSize = this.product.sizes.includes("*") ? "*" : "Vælg størrelse";
            let _sizeSoldout = null;
            if (_selectedSize) {
                _sizeSoldout = (this.state.product.qty[_selectedSize] <= 0);
            }

            this.setState({
              product: this.product,
              selectedSize: _selectedSize,
              isSelectedSizeSoldout: _sizeSoldout,
              isLoading:false
            });

          } else {
            document.title = "Ritter Cykler";
            console.log("product does not exist in database.")
          }
        }).catch( (error) => {
          console.log(this.errorMessage = 'Error - ' + error.message)
        });

    } else {
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

    var selectSizeField = null;

    var reserveBtnStyle = null;
    var reserveBtn = null;
    var reserveBtnDisabled = null;
    var reserveBtnDisabled = false;
    var reserveBtnClass = "z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger";
    var _isSelectedSizeSoldout = this.state.isSelectedSizeSoldout;

    var carousel = null;
    var mediaSection = null;

    // MULTIPLE SIZES ? THEN DISPLAY SIZES SELECT FIELD

    if (!this.state.product.sizes.includes("*")) {

      var sizeOptions = []
      this.state.product.sizes.forEach((size) => {
        const soldout = this.state.product.qty[size] == 0;
        const disabled = soldout ? "disabled" : null
        sizeOptions.push([size + " " + (soldout ? "(udsolgt)" : null), soldout]);

        console.log(sizeOptions)
        /*
        sizeOptions.push(
          <option value={size} disabled>
            <a className="black-text">{size} {soldout ? "(udsolgt)" : null}</a>
         </option>
        );
        */

      });

      selectSizeField =
        <div className="row">
          <div className="input-field col s4">
            <Select onSelection={(e) => {this.handleSizeChange(e.target.value)} }
                    options={sizeOptions} // [text, soldout] # like a tuple.
                    placeholder={"Vælg størrelse"}
            />
          </div>
        </div>

    } else {
      reserveBtnStyle = {"marginTop": "1.5rem"};
    }

    // STATE OF RESERVATION BUTTON
    reserveBtnDisabled = (!this.state.product.inStock || _isSelectedSizeSoldout)

    if (reserveBtnDisabled || (selectSizeField && this.state.selectedSize === "Vælg størrelse")) {
      reserveBtnClass += " disabled"
    }

    var reserveBtnText = !_isSelectedSizeSoldout ? "Reservér" : "Udsolgt";
    reserveBtn = <a style={reserveBtnStyle}
                    onClick={this.openReservationModal}
                    className={reserveBtnClass}>
                    {reserveBtnText}
                  </a>

    // DISPLAY IMAGES IN CAROUSEL IF ANY EXISTS

    if (this.state.product.imageURLs.length > 0) {
      carousel = <Carousel carouselDidLoad={this.state.carouselDidLoad} imageURLs={this.state.product.imageURLs}/>;
    }

    // YOUTUBE URL PROVIDED?

    if (this.state.product.youtubeURL) {
      var _youtubeURL = this.state.product.youtubeURL.replace("watch?v=", "embed/")
      mediaSection = <div className="section white">
        <div className="container">
          <div className="section">
            <div className="video-container">
              <iframe width="100%" height="480" src={_youtubeURL} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
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
                <h5 className="primary-text headline">{this.state.product.name}</h5>
                <h5 className="primary-text subheading">
                  <FormattedNumber
                      style='currency'
                      currency={this.state.product.currency}
                      value={this.state.product.discountPrice}
                  />
                </h5>

                {selectSizeField}

                <div style={{"paddingTop": "0px"}} className="row">
                  <div className="left">
                    {reserveBtn}
                  </div>
                </div>

                <ReservationModal
                  handleSubmit={this.handleReservationSubmit}
                  product={this.state.product}
                  selectedSize={this.state.selectedSize}
                />

                <div style={{"paddingTop": "4px"}}>
                  <p className="secondary-text body-1"><i className="left inline-small-icon material-icons">chat_bubble</i> Få hjælp til at købe produktet. <a className="green-text text-accent-3" href="https://messenger.com">Skriv på Messenger</a> eller<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ring til os på 45 87 66 01</p>
                </div>

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
            <h5 className="primary-text headline">Produkt Information</h5>
            <div className="divider"></div>

            <div className="section">
              <div className="col s12">
                <div className="row">
                  <div className="col l3 hide-on-med-and-down">
                    <h5 className="primary-text subheading">Overblik</h5>
                  </div>
                  <div className="col s12 l8 offset-l1">
                    <h5 className="hide-on-large-only primary-text subheading">Overblik</h5>
                    <p className="primary-text body-1">{this.state.product.descriptionText}</p>
                  </div>

                </div>
              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="primary-text subheading">Highlights</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only primary-text subheading">Highlights</h5>
                  <ul className="primary-text body-1">
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
                  <h5 className="primary-text subheading">Lagde du mærke til?</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only primary-text subheading">Lagde du mærke til?</h5>
                  <p className="primary-text body-1">{this.state.product.didYouNoticeText}</p>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="primary-text subheading">Forslået brug</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only primary-text subheading">Forslået brug</h5>
                  <p className="primary-text body-1">{this.state.product.recommendedText}</p>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="primary-text subheading">Ud af boksen</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only primary-text subheading">Out of the box</h5>
                  <ul className="primary-text body-1">
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
                  <h5 className="primary-text subheading">Tekniske specifikationer</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only primary-text subheading">Tekniske specifikationer</h5>
                  <ul className="primary-text body-1">
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
                  <h5 className="primary-text subheading">Fabrikant information</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only primary-text subheading">Fabrikant information</h5>
                  <ul className="primary-text body-1">
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

          <h5 className="primary-text headline">
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
