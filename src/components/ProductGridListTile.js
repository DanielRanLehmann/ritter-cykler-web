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
            <img height="235px" style={{"max_height": "235px", "object-fit": "cover", "overflow": "hiddden"}} className="product-cell-image" width="100%" src={this.props.product.imageURLs[0]}/>
            <p className="amber-text text-accent-4 text-subhead">NYHED</p>
            <p className="truncate primary-text text-subhead">{this.props.name}</p>
            <p className="primary-text text-subhead">
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
