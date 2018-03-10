import React, { Component } from 'react';
// import './ProductReservationModal.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function ProductPreviewCell(props) {
  return (
    <div></div>
  )
}

class ProductReservationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      qty: "1"
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);

    this.handleReservation = this.handleReservation.bind(this);

  }

  handleFirstNameChange = (e) => {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange = (e) => {
    this.setState({lastName: e.target.value});
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePhoneChange = (e) => {
    this.setState({phone: e.target.value});
  }

  handleQTYChange = (e) => {
    this.setState({qty: e.target.value});
  }

  handleReservation(e) {
    e.preventDefault();

    const reservationData = {
      "createdAt": new Date().getTime(),
      "confirmationCode": 123456,
      "confirmedOrder": false,
      "productId": this.props.product.id,
      "productName": this.props.product.name,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "email": this.state.email,
      "phone": this.state.phone,
      "preferredPickupDate": $('#preferred-pickup-date').val()
    }

    console.log("here's the reservation payload");
    console.log(reservationData);

    /*
    const newOrderKey = fire.database().ref().child('orders').push().key;

    const updates = {};
    updates['/orders/' + newOrderKey] = orderData;
    updates['/product-orders/' + this.props.product.id + '/' + newOrderKey] = orderData;

    fire.database().ref().update(updates).then(() => {
      Materialize.toast("Tak! " + this.props.product.name + " er reserveret til dig.", 30000);

    }).catch(function(error) {
      var $toastContent = $('<span>Ups! Der skete en fejl</span>').add($('<button onClick="handleReservation; class="btn-flat toast-action">Prøv Igen</button>'));
      Materialize.toast($toastContent, 10000);

    }); // return here?, maybe.. depends on who's in charge of the feedback.
    */

  }

  componentDidMount() {

    this.$selectQTY = $(this.selectQTY);
    this.handleQTYChange = this.handleQTYChange.bind(this);
    this.$selectQTY.on('change', this.handleQTYChange); // remember to turn off.

    $(document).ready(function() {
      $('select').material_select();
      $('.modal').modal();
    });
  }

  componentWillUnmount() {
    this.$selectQTY.off('change', this.handleQTYChange);
  }

  render() {

    return (
      <div id="product-reservation-modal" className="white modal modal-fixed-footer z-depth-0">
            <div className="modal-content">
              <h4 className="primary-text headline">Reserver</h4>
              <p className="secondary-text body-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <form className="col s12">
               <div className="row">
                 <div className="input-field col s12 m6">
                   <input value={this.state.firstName} onChange={this.handleFirstNameChange} id="first-name" type="text" className="validate"/>
                   <label htmlFor="first-name">Fornavn</label>
                 </div>
                 <div className="input-field col s12 m6">
                   <input value={this.state.lastName} onChange={this.handleLastNameChange} id="last-name" type="text" className="validate"/>
                   <label htmlFor="last-name">Efternavn</label>
                 </div>
               </div>

               <div className="row">
                 <div className="input-field col s12">
                   <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="validate"/>
                   <label htmlFor="email">Email</label>
                 </div>
               </div>

               <div className="row">
                 <div className="input-field col s12">
                   <input value={this.state.phone} onChange={this.handlePhoneChange} id="phone" type="number" className="validate"/>
                   <label htmlFor="phone">Mobil nr.</label>
                 </div>
               </div>

               <div className="row">
                 <div className="input-field col s12">
                   <input value={this.state.preferredPickupAt} onChange={this.handlePreferredPickupAtChange} id="preferred-pickup-date" type="text" className="datepicker"/>
                   <label htmlFor="preferred-pickup-date">Din fortrukne afhentningsdato</label>
                 </div>
               </div>

             </form>

             <div style={{"padding": "24px, 24px, 24px, 24px" }} className="section">
               <div className="col s12">
                  <div className="white">
                    <div className="row valign-wrapper">
                      <div className="col s4 l2">
                        <img src={this.props.product.imageSrc} alt={this.props.product.name} className="responsive-img"/>
                      </div>
                        <div className="col s11">
                          <span className="body-1 primary-text">
                            <b>{this.props.product.name}</b><br/>
                            {this.props.product.normalPrice} {this.props.product.currencySymbol} x {this.state.qty}
                          </span>
                      </div>
                      <div className="input-field col s12 m2">
                        <select ref={selectQTY => this.selectQTY = selectQTY} defaultValue={this.state.qty}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        <label>Antal</label>
                      </div>
                    </div>
                  </div>
                </div>
             </div>

            </div>
            <div className="white modal-footer">
              <a  className="modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Annuller</a>
              <a onClick={this.handleReservation} className="modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Reservér</a>
            </div>
          </div>
    );
  }
}

export default ProductReservationModal;
