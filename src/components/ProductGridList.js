import React, { Component } from 'react';
import './ProductGridList.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import ProductReservationModal from './ProductReservationModal.js';

function Cell(props) {
  return (
    <div className="product-cell center-align hoverable">
      <img className="product-cell-image" width="100%" src={props.imageSrc}/>
      <h5 className="primary-text title">{props.title}</h5>
      <p className="primary-text body-1">{props.normalPrice} {props.currencySymbol}</p>
      <a onClick={props.openModal} id="reservation-btn" className="center z-depth-0 green accent-3 waves-effect waves-light btn">Reservér</a>
    </div>
  )
}

// <div className="solid-black-divider"></div>

class ProductGridList extends Component {
    constructor(props) {
      super(props);

      this.openModal = this.openModal.bind(this);
    }

    openModal() {
      console.log("open modal is called");
      $('#product-reservation-modal').modal('open');
    }

    render() {

      return (
        <div>
          <div className="row">
            {
              this.props.products.map((product) =>
                <div className="col s12 m6 l4">

                  <Cell
                    openModal={this.openModal}
                    imageSrc={product.imageSrc}
                    title={product.title}
                    normalPrice={product.normalPrice}
                    currencySymbol={product.currencySymbol}
                  />
                </div>
              )
            }

          </div>
          <ProductReservationModal product={{
            "imageSrc": "http://localhost:3000/images/product-placeholder.png",
            "name": "Lorem ipsum",
            "normalPrice": 35999,
            "currencySymbol": "kr",
            "currencyCode": "DKK",
            "qty": 1
          }}/>
        </div>
      );
    }
}

export default ProductGridList;
