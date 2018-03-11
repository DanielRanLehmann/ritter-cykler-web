import React, { Component } from 'react';
import './ProductDetails.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Breadcrumbs from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/Breadcrumbs.js';
import Carousel from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/Carousel.js';
import ProductReservationModal from '../components/ProductReservationModal.js';

import fire from '../fire.js';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: {
        highlightTags: [],
        outOfTheBoxTags: [],
        techSpecTags: [],
        manifacturerInfoTags: []
      },
      imageURLs: [],
      isLoading: true
    };

    this.productData = { highlightTags: [], outOfTheBoxTags: [], techSpecTags: [], manifacturerInfoTags: [] };
    this.imageURLs = [];
    this.carouselItems = [];
    this.openReservationModal = this.openReservationModal.bind(this);
  }

  openReservationModal() {
    $('#product-reservation-modal').modal('open');
  }

  asyncFetchProductDetails(productId) {
    if (!productId) {
      return;
    }

    const storage = fire.storage();

    fire.database().ref('products/' + productId).once("value", snapshot => {
       const product = snapshot.val();
       if (product) {
         this.productData = product;
         this.productData["id"] = snapshot.key;
         this.setState({productData: this.productData});

         if (this.productData.imageNames && this.productData.imageNames.length > 0) {

           /*
           for (var i = 0; i < this.productData.imageNames.length; i++) {
             var imageName = this.productData.imageNames[i];
             var imageRef = storage.ref("product-images/" + productId + "/" + imageName);
             imageRef.getDownloadURL().then((url) => {
               this.imageURLs.push(url);
               this.carouselItems.push({"href": "#item" + i.toString(), "src": url});
               // this.setState({imageURLs: this.imageURLs}); // isLoading plays a vital part for the carousel to be init correctly.
               if (i === this.productData.imageNames.length) {
                 // last image has been fetched.. product page has finished loading
                 console.log(this.imageURLs);

                 this.setState({imageURLs: this.imageURLs, isLoading: false});

               }
             });
           }
           */

           this.productData.imageNames.forEach((imageName) => {
             var imageRef = storage.ref("product-images/" + productId + "/" + imageName);
             imageRef.getDownloadURL().then((url) => {
               this.imageURLs.push(url);
               this.carouselItems.push({"href": "#item", "src": url});
               if (this.carouselItems.length == this.productData.imageNames.length) {
                  this.setState({imageURLs: this.imageURLs, isLoading: false}); // isLoading plays a vital part for the carousel to be init correctly.
               }
             });
           });

         }

       } else {
         console.log("no product with that particular id exists");
         // a 404 error has occurred.
       }
    });
  }

  componentDidMount() {
    if (this.props.productId) {
        this.asyncFetchProductDetails(this.props.productId);
    } // else a 404 error has occured.
  }

  render() {

    if (this.state.isLoading) {
        return (
          <div>
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

    var reserveBtn = null;
    if (this.state.productData.inStock) {
      reserveBtn = <a onClick={this.openReservationModal} className="z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger">Reservér</a>
    } else {
      reserveBtn = <a className="disabled z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger">Udsolgt</a>
    }

    var breadcrumbItems = null;
    if (this.props.breadcrumbs) {
      breadcrumbItems = this.props.breadcrumbs;
      breadcrumbItems.push(<a href="#!" className="white-text breadcrumb">{this.state.productData.name}</a>);

    }

    return (
        <div>

          <Breadcrumbs items={breadcrumbItems}/>

          <div className="section white">
            <div className="container">
              <div className="row">
                <div className="col s12 l6">
                <h5 className="primary-text display-1">{this.state.productData.name}</h5>
                <h5 className="secondary-text subheading">{this.state.productData.normalPrice} {this.state.productData.currencySymbol}</h5>

                <div style={{"paddingTop": "24px"}} className="row">
                  <div className="left">
                    {reserveBtn}
                  </div>
                  <div className="left">
                    <a href={this.state.productData.officialProductURL} className="waves-effect waves-white green-text text-accent-3 btn-flat"><i className="left material-icons">open_in_new</i>BESØG OFFICIEL SIDE</a>
                  </div>
                </div>

                <ProductReservationModal product={this.state.productData}/>

                <div style={{"paddingTop": "4px"}}>
                  <p className="secondary-text body-1"><i className="left inline-small-icon material-icons">chat_bubble</i> Få hjælp til at købe produktet. <a className="green-text text-accent-3" href="https://messenger.com">Skriv på Messenger</a> eller<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ring til os på 45 87 66 01</p>
                </div>
              </div>

              <div style={{"paddingTop": "24px"}} className="col s12 l6">
                <Carousel items={this.carouselItems}/>
              </div>
            </div>
          </div>
        </div>

        <div className="container divider"></div>

        <div className="section white">
          <div className="container">
            <div className="section">
              <div className="video-container">
                <iframe width="100%" height="480" src={this.state.productData.youtubeURL} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="section container row">
            <h5 className="primary-text headline">Produkt Information</h5>
            <div className="divider"></div>

            <div className="section containr">
              <div className="col s12">
                <div className="row">
                  <div className="col l3 hide-on-med-and-down">
                    <h5 className="primary-text subheading">Overblik</h5>
                  </div>
                  <div className="col s12 l8 offset-l1">
                    <h5 className="hide-on-large-only primary-text subheading">Overblik</h5>
                    <p className="primary-text body-1">{this.state.productData.descriptionText}</p>
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
                    this.state.productData.highlightTags.map((tag) =>
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
                  <p className="primary-text body-1">{this.state.productData.didYouNoticeText}</p>
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
                  <p className="primary-text body-1">{this.state.productData.recommendedText}</p>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col l3 hide-on-med-and-down">
                  <h5 className="primary-text subheading">Out of the box</h5>
                </div>
                <div className="col s12 l8 offset-l1">
                  <h5 className="hide-on-large-only primary-text subheading">Out of the box</h5>
                  <ul className="primary-text body-1">
                  {
                    this.state.productData.outOfTheBoxTags.map((tag) =>
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
                    this.state.productData.techSpecTags.map((tag) =>
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
                    this.state.productData.manifacturerInfoTags.map((tag) =>
                      <li>{tag}</li>
                    )
                  }
                  </ul>
                </div>
              </div>
            </div>

          </div>

        <div className="divider"></div>
      </div>
    );
  }
}

export default ProductDetails;
