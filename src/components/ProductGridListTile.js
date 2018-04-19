import React, { Component } from 'react';
import './ProductGridListTile.css';

import { Link, NavLink } from 'react-router-dom';
import {FormattedNumber} from 'react-intl';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class ProductGridListTile extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    // {this.props.product.isNew}

    render() {
      return (
        <div>
          <div onClick={ (e) => this.props.handleProductDetailClick(e, this.props.product) } style={{"cursor": "pointer"}} className="product-grid-list-tile product-tile center-align">
            <img height="235px" style={{"max_height": "235px", "object-fit": "cover", "overflow": "hiddden"}} className="product-cell-image" width="100%" src={this.props.product.imageURLs[0].medium}/>
            <p className="amber-text text-accent-4 text-callout">{this.props.isNew ? "NYHED": null}</p>
            <h5 className="truncate text-primary text-headline">{this.props.name}</h5>
            <p className="primary-text text-headline">
              <FormattedNumber
                  style='currency'
                  currency={this.props.product.currency}
                  value={this.props.product.discountPrice}
              />
            </p>
          </div>
        </div>
      )
    }
}

export default ProductGridListTile;
