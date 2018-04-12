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

    const reservationData = {
      "createdAt": new Date().getTime(),
      "productId": this.props.product.id,
      "productName": this.props.product.name,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "email": this.state.email,
      "phone": this.state.phone,
      "preferredPickupDate": $('#preferred-pickup-date').val(),
      "qty": this.state.qty,
      "productSize": this.props.selectedSize,
      "total": (this.props.product.discountPrice * this.state.qty),
      "currencyCode": this.props.product.currencyCode,
      "currencySymbol": this.props.product.currencySymbol,
    }

    console.log(reservationData);
    this.props.handleSubmit(e, reservationData);
  }

  componentDidMount() {

    var minDate = new Date();

    const daysInAdvance = 14;
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + daysInAdvance);

    console.log("minDate")
    console.log(minDate)
    console.log("maxDate")
    console.log(maxDate)

    this.$selectQTY = $(this.selectQTY);
    this.handleQTYChange = this.handleQTYChange.bind(this);
    this.$selectQTY.on('change', this.handleQTYChange); // remember to turn off.

    $(document).ready(function() {
      $('.datepicker').pickadate({
         selectMonths: true,
         selectYears: 1,
         format: 'yyyy-mm-dd',
         formatSubmit: 'yyyy-mm-dd',
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
                    <input style={{"width": "100px"}} value={this.state.qty} onChange={this.handleQTYChange} id="qty" type="number" className="validate" min={minQTY.toString()} max={maxQTY.toString()} />
                  </div>
    }


    var checkoutPreviewCell = null;
    if (this.props.product) {
      checkoutPreviewCell = <CheckoutPreviewCell product={this.props.product}
                                            qty={this.state.qty}
                                            selectedSize={_selectedSize} />
    }

    var reserveBtnClass = "modal-action modal-close waves-effect green-text text-accent-3 btn-flat";

    if (!this.state.firstName ||
        !this.state.lastName ||
        !this.state.email ||
        !this.props.product.id ||
        !this.props.product.name ||
        (this.state.qty < minQTY || this.state.qty > maxQTY)) {
      reserveBtnClass += " disabled"
    }
    var reserveBtn = <a onClick={this.handleReservation} className={reserveBtnClass}>Reservér</a>

    return (
      <div id="product-reservation-modal" className="white modal modal-fixed-footer z-depth-0">
            <div className="modal-content">
              <h4 className="primary-text headline">Reserver</h4>
              <p className="secondary-text body-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <form className="col s12">
               <div className="row">
                 <div className="input-field col s12 m6">
                   <input value={this.state.firstName} onChange={this.handleFirstNameChange} id="first-name" type="text" className="validate"/>
                   <label htmlFor="first-name">Fornavn *</label>
                 </div>
                 <div className="input-field col s12 m6">
                   <input value={this.state.lastName} onChange={this.handleLastNameChange} id="last-name" type="text" className="validate"/>
                   <label htmlFor="last-name">Efternavn *</label>
                 </div>
               </div>

               <div className="row">
                 <div className="input-field col s12">
                   <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="validate"/>
                   <label htmlFor="email">Email *</label>
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

               <div className="row">
                  <div className="col s12">
                    Antal Varer:
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
