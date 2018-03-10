import React, { Component } from 'react';
import './ProductGridList.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function Cell(props) {
  return (
    <div className="product-cell center-align hoverable">
      <img className="product-cell-image" width="100%" src={props.imageSrc}/>
      <h5 className="primary-text title">{props.title}</h5>
      <p className="primary-text body-1">{props.normalPrice} {props.currencySymbol}</p>
      <a id="product-item-order-btn" className="center z-depth-0 green accent-3 waves-effect waves-light btn">Reservér</a>
    </div>
  )
}

// <div className="solid-black-divider"></div>

class ProductGridList extends Component {
    constructor(props) {
      super(props);

    }

    render() {

      return (
        <div>
          <div className="row">
            {
              this.props.products.map((product) =>
                <div className="col s12 m6 l4">

                  <Cell
                    imageSrc={product.imageSrc}
                    title={product.title}
                    normalPrice={product.normalPrice}
                    currencySymbol={product.currencySymbol}
                  />
                </div>
              )
            }

          </div>
        </div>
      );
    }
}

export default ProductGridList;
