import React, { Component } from 'react';
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
        <div style={{"padding": "24px, 24px, 24px, 24px" }} className="section">
          <div style={{borderRadius: "2.5px", borderColor: "#e0e0e0", "borderWidth": "1px", "borderStyle": "solid"}} className="col s12">
             <div className="white">
               <div className="row valign-wrapper">
                <div className="col s2">
                  <img className="responsive-img" src={this.props.product.imageURLs[0]} alt={this.props.product.name}/>
                 </div>
                 <div className="col s10">
                   <span className="body-2 primary-text">{this.props.product.name}{this.props.selectedSize !== "*" ? ", " + this.props.selectedSize : null}</span><br/>
                   <span className="body-1 primary-text">{this.props.product.discountPrice} {this.props.product.currencySymbol} x {this.props.qty}</span><br/>
                   <span style={{"textDecoration": "underline"}} className="body-1 primary-text">TOTAL {this.props.product.normalPrice * this.props.qty} {this.props.product.currencySymbol}</span>
                  </div>
               </div>
             </div>
           </div>
        </div>
      );
    }
}

export default CheckoutPreviewCell;
