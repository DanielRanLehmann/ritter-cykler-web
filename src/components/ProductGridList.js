import React, { Component } from 'react';
import './ProductGridList.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import ProductGridListTile from './ProductGridListTile.js';

class ProductGridList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedProduct: null
      };
    }

    render() {
      return (
        <div>
          <div className="row flex">
            {
              this.props.products.map((product) =>
                <div className="col s12 m6 l4 xl3">

                  <ProductGridListTile
                    product={product}
                    handleProductDetailClick = {this.props.handleProductDetailClick}
                    reservationBtnClicked = {this.props.reservationBtnClicked}
                    openModal={this.openModal}
                    imageURL={product.imageURLs[0]}
                    name={product.name}
                    isNew={product.isNew}
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
