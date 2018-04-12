import React, { Component } from 'react';
//import './ProductDetailHeaderView.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class ProductDetailHeaderView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
          <div className="row">
            <div className="col s12 l6">
            <p className="caption amber-text text-accent-4">NYHED</p>
            <h5 className="primary-text display-1">{this.state.productData.name}</h5>
            <h5 className="secondary-text subheading">{this.state.productData.normalPrice} {this.state.productData.currencySymbol}</h5>

            <div style={{"paddingTop": "0px"}} className="row">

              <div className="input-field col s4">
                 <select ref={sizeField => this.sizeField = sizeField} defaultValue={this.state.selectedProductSize}>
                  <option value="-1" disabled selected>Vælg størrelse</option>
                  {
                    Object.values(this.state.productData.sizes).map((size, index) =>
                      <option value={index}><a className="black-text">{size}</a></option>
                    )
                  }
                 </select>
               </div>

            </div>
            <div style={{"paddingTop": "0px"}} className="row">
              <div className="left">
                {reserveBtn}
              </div>
            </div>

            <ProductReservationModal product={this.state.productData}/>

            <div style={{"paddingTop": "4px"}}>
              <p className="secondary-text body-1"><i className="left inline-small-icon material-icons">chat_bubble</i> Få hjælp til at købe produktet. <a className="green-text text-accent-3" href="https://messenger.com">Skriv på Messenger</a> eller<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ring til os på 45 87 66 01</p>
            </div>

            <div className="divider"></div>

          </div>


          <div className="col s12 l6">
            <Carousel />
          </div>
    )
  }
}

export default ProductDetailHeaderView;
