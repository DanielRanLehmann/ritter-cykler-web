import React, { Component } from 'react';
import './CheckoutPreviewCell.css';
import { Link, NavLink } from 'react-router-dom';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class CheckoutPreviewCell extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {

      return (
        <div id="CheckoutPreviewCell" className="section">
          <div id="CheckoutPreviewCellContent" className="col s12">
             <div className="white">
               <img className="responsive-img hide-on-med-and-up" src={this.props.product.imageURLs[0]} alt={this.props.product.name}/>
               <div className="row">
                <div className="col s2 hide-on-small-only">
                  <img className="responsive-img" src={this.props.product.imageURLs[0]} alt={this.props.product.name}/>
                 </div>
                 <div className="col s10">
                   <span className="text-primary text-body text-bold">{this.props.product.name}{this.props.selectedSize !== "*" ? ", " + this.props.selectedSize : null}</span><br/>
                   <span className="text-primary text-body">{this.props.product.discountPrice} {this.props.product.currencySymbol} x {this.props.qty}</span><br/>
                   <span id="CheckoutPreviewCellTotal" className="text-primary text-body">TOTAL {this.props.product.normalPrice * this.props.qty} {this.props.product.currencySymbol}</span>
                  </div>
               </div>
             </div>
           </div>
        </div>
      );
    }
}

export default CheckoutPreviewCell;
