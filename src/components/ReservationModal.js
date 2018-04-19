import React, { Component } from 'react';
// import './ProductReservationModal.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import fire from '../fire.js';
import Select from './Select.js';

import CheckoutPreviewCell from './CheckoutPreviewCell.js';

class ReservationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      qty: 1
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
    this.setState({qty: parseInt(e.target.value)});
  }

  handleReservation(e) {
    e.preventDefault();

    var preferredPickupAt = $('#preferred-pickup-date').val();
    if (preferredPickupAt === "") {
      preferredPickupAt = null;
    }

    // this needs to be updated slightly.
    const reservationData = {
      "createdAt": new Date().getTime(),
      "productId": this.props.product.id,
      "productName": this.props.product.name,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "email": this.state.email,
      "phone": this.state.phone,
      "preferredPickupDate": preferredPickupAt,
      "qty": this.state.qty,
      "productSize": this.props.selectedSize,
      "total": parseFloat(this.props.product.discountPrice * this.state.qty),
      "currency": this.props.product.currency,
    }

    $('.modal').modal('close');
    this.props.handleSubmit(e, reservationData);
  }

  componentDidMount() {

    var minDate = new Date();

    const daysInAdvance = 14;
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + daysInAdvance);

    this.$selectQTY = $(this.selectQTY);
    this.handleQTYChange = this.handleQTYChange.bind(this);
    this.$selectQTY.on('change', this.handleQTYChange); // remember to turn off.

    $(document).ready(function() {
      $('.datepicker').pickadate({
         selectMonths: true,
         selectYears: 1,
         format: 'dd mmmm, yyyy',
         formatSubmit: 'dd mmmm, yyyy',
         min: minDate,
         max: maxDate,
         today: 'Today',
         clear: 'Clear',
         close: 'Ok',
         closeOnSelect: false
       });

      $('select').material_select();
      $('.modal').modal();
    });
  }

  componentWillUnmount() {
    this.$selectQTY.off('change', this.handleQTYChange);
  }

  render() {

    var qtyField = null;
    var minQTY = 1;
    var maxQTY = minQTY;

    if (this.props.selectedSize && this.props.selectedSize !== "Vælg størrelse") {
      var _selectedSize = this.props.selectedSize.replace("(udsolgt)", "").trim()
      console.log("the selected size: " + _selectedSize);

      maxQTY = this.props.product.qty[_selectedSize];

      qtyField = <div className="input-field inline">
                    <input style={{"width": "100px"}} value={this.state.qty} onChange={this.handleQTYChange} id="qty" type="number" className="validate" min={minQTY.toString()} max={maxQTY.toString()} required="" aria-required="true"/>
                  </div>
    }


    var checkoutPreviewCell = null;
    if (this.props.product) {
      checkoutPreviewCell = <CheckoutPreviewCell product={this.props.product}
                                            qty={this.state.qty}
                                            selectedSize={_selectedSize} />
    }

    var reserveBtnClass = "waves-effect green-text text-accent-3 btn-flat";

    if (!this.state.firstName ||
        !this.state.lastName ||
        !this.state.email ||
        !this.props.product.id ||
        !this.props.product.name ||
        (this.state.qty < minQTY || this.state.qty > maxQTY)) {
      reserveBtnClass += " disabled"
    }
    var reserveBtn =  <button className={reserveBtnClass} form="reservation-form" type="submit" name="action">Reservér</button>
    // <a onClick={this.handleReservation} className={reserveBtnClass}>Reservér</a>

    return (
      <div id="product-reservation-modal" className="white modal modal-fixed-footer z-depth-0">
            <div className="modal-content">
              <h4 className="text-primary text-bold text-title-1">Reserver</h4>
              <p className="text-secondary text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <form id="reservation-form" className="col s12" onSubmit={this.handleReservation}>
               <div className="row">
                 <div className="input-field col s12 m6">
                   <input value={this.state.firstName} onChange={this.handleFirstNameChange} id="first-name" type="text" className="validate" required="" aria-required="true"/>
                   <label htmlFor="first-name">Fornavn *</label>
                 </div>
                 <div className="input-field col s12 m6">
                   <input value={this.state.lastName} onChange={this.handleLastNameChange} id="last-name" type="text" className="validate" required="" aria-required="true"/>
                   <label htmlFor="last-name">Efternavn *</label>
                 </div>
               </div>

               <div className="row">
                 <div className="input-field col s12">
                   <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="validate" required="" aria-required="true"/>
                   <label htmlFor="email" data-error="Ugyldig email">Email *</label>
                 </div>
               </div>

               <div className="row">
                 <div className="input-field col s12">
                   <input value={this.state.phone} onChange={this.handlePhoneChange} id="phone" type="tel" className="validate"/>
                   <label htmlFor="phone" data-error="Ugyldig mobil nr.">Mobil nr.</label>
                 </div>
               </div>

               <div className="row">
                 <div className="input-field col s12">
                   <input value={this.state.preferredPickupAt} onChange={this.handlePreferredPickupAtChange} id="preferred-pickup-date" type="text" className="datepicker"/>
                   <label htmlFor="preferred-pickup-date">Din fortrukne afhentningsdato</label>
                 </div>
               </div>

               <div className="row">
                  <div className="col s12">
                    Antal Varer *:
                    {qtyField}
                  </div>
                </div>

             </form>

             {checkoutPreviewCell}

            </div>
            <div className="white modal-footer">
              <a className="modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Annuller</a>
              {reserveBtn}
            </div>
          </div>
    );
  }
}

export default ReservationModal;
