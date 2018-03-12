import React, { Component } from 'react';

import './ProductGridList.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import ProductReservationModal from './ProductReservationModal.js';

function Cell(props) {
  return (
    <div onClick={ (e) => props.handleProductDetailClick(e, props.product) } style={{"cursor": "pointer"}} className="product-cell center-align hoverable">
      <img className="product-cell-image" width="100%" src={props.imageSrc}/>
      <h5 className="primary-text title">{props.name}</h5>
      <p className="primary-text body-1">{props.normalPrice} {props.currencySymbol}</p>
      <a onClick={ (e) => props.reservationBtnClicked(e, props.product) } id="reservation-btn" className="center z-depth-0 green accent-3 waves-effect waves-light btn">Reservér</a>
    </div>
  )
}

// <div className="solid-black-divider"></div>

class ProductGridList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedProduct: null
      };
    }

    matchingImageURL(productId) {
      var imageURL = "http://localhost:3000/images/product-placeholder.png";
      if (productId in this.props.imageURLs) {
        imageURL = this.props.imageURLs[productId];
      }
      return imageURL;
    }
    render() {


      return (
        <div>
          <div className="row">
            {
              this.props.products.map((product) =>
                <div className="col s12 m6 l4">

                  <Cell
                    product={product}
                    handleProductDetailClick = {this.props.handleProductDetailClick}
                    reservationBtnClicked = {this.props.reservationBtnClicked}
                    openModal={this.openModal}
                    imageSrc={this.matchingImageURL(product.id)}
                    name={product.name}
                    normalPrice={product.normalPrice}
                    currencySymbol={product.currencySymbol}
                  />

                </div>
              )
            }

          </div>
          <ProductReservationModal product={this.props.selectedReservationProduct}/>
        </div>
      );
    }
}

export default ProductGridList;
