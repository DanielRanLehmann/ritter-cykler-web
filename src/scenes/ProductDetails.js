import React, { Component } from 'react';
import './ProductDetails.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Breadcrumbs from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/Breadcrumbs.js';
import Carousel from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/Carousel.js';

class ProductDetails extends Component {

  componentDidMount() {
    $(document).ready(function(){
      $('.carousel').carousel({
        indicators: true,
        fullWidth: true,
        shift: 4,
      });
    });
  }

  render() {

    var reserveBtn = null;
    reserveBtn = <a className="z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger">Reservér</a>


    var breadcrumbItems = null;
    if (this.props.breadcrumbs) {
      breadcrumbItems = this.props.breadcrumbs;
      breadcrumbItems.push(<a href="#!" className="white-text breadcrumb">Product Name</a>);
    }

    return (
        <div>

          <Breadcrumbs items={breadcrumbItems}/>

          <div className="section white">
            <div className="container">
              <div className="row">
                <div className="col s12 l6">
                <h5 className="primary-text display-1">Product Name</h5>
                <h5 className="secondary-text subheading">Price</h5>

                <div style={{"paddingTop": "24px"}} className="row">
                  <div className="left">
                    {reserveBtn}
                  </div>
                  <div className="left">
                    <a href="https://apple.com" className="waves-effect waves-white green-text text-accent-3 btn-flat"><i className="left material-icons">open_in_new</i>BESØG OFFICIEL SIDE</a>
                  </div>
                </div>

                <div style={{"paddingTop": "4px"}}>
                  <p className="secondary-text body-1"><i className="left inline-small-icon material-icons">chat_bubble</i> Få hjælp til at købe produktet. <a className="green-text text-accent-3" href="https://messenger.com">Skriv på Messenger</a> eller<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ring til os på 45 87 66 01</p>
                </div>
              </div>

              <div style={{"paddingTop": "24px"}} className="col s12 l6">
                <Carousel items={[
                  {
                    "href": "#one!",
                    "src": "https://static.evanscycles.com/production/bikes/road-bikes/product-image/969-638/pinarello-dogma-60-1-sky-edition-2010-road-bike-00134014-9999-1.jpg"
                  },
                  {
                    "href": "#two!",
                    "src": "https://racycles.azureedge.net/assets/standard/59788/P16_ROKH_411.JPG"
                  },
                  { "href": "#three!",
                    "src": "https://content.competitivecyclist.com/images/items/1200/PIN/PIN004G/S167BKLV.jpg"
                  }
                ]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container divider"></div>

        <div className="section white">
          <div className="container">
            <div className="section">
              <div className="video-container">
                <iframe width="100%" height="480" src="https://www.youtube.com/embed/XGxYmmkE87A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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
                    <p className="primary-text body-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                    <li>item 4</li>
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
                  <p className="primary-text body-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                  <p className="primary-text body-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                    <li>item 4</li>
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
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                    <li>item 4</li>
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
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                    <li>item 4</li>
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
