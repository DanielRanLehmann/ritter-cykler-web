import React, { Component } from 'react';
// import './NewsletterForm.css'

import '../extensions/stringFormatting.js';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import fire from '../fire.js';

class NewsletterForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        successfulFormCompletion: false
      }

      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePhoneChange = this.handlePhoneChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

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

    handleSubmit(e) {
      e.preventDefault()

      var _phone = null;
      if (this.state.phone) {
        _phone = this.state.phone.strip('\s');
        if(!_phone.match(/[a-z]/i)) {
          if (!_phone.hasPrefix('(+45)') || !_phone.hasPrefix('+45')) {
            _phone = "+45" + _phone
          }
          console.log(_phone)
        } else {
          console.log("invalid phone no")
        }
      }
      const subscriberData = {
        "createdAt": new Date().getTime(),
        "firstName": this.state.firstName.capitalize(),
        "lastName": this.state.lastName.capitalize(),
        "email": this.state.email,
        "phone": _phone
      }

      this.props.handleSubmit(e, subscriberData);
    }

    render() {

      if (this.props.successfulFormCompletion) {
        var successDescription = "Du vil løbende få masser af spændende tilbud over email";
        if (this.state.phone) {
          successDescription +=  " og telefonen.";
        }

        successDescription += ". Du kan til hver en tid afmelder vores nyhedsbrev ved blot at klikke på linket \'afmeld\' nederst i bunden i en af vores mails.";

        return (
          <div>
            <div className="section">
              <h4 className="white-text dark-primary-text text-body"><b>Tak! Du er nu tilmeldt vores nyhedsbrev</b></h4>
              <p className="white-text dark-primary-text text-body">{successDescription}</p>
            </div>
          </div>
        );
      }

      var subscribeBtn = null;

      if ((this.state.firstName) &&
          (this.state.lastName) &&
          (this.state.email)) {
        subscribeBtn = <a onClick={this.handleSubmit} id="subscribe-newsletter-btn" className="z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger" href="#modal1">Tilmeld</a>
      } else {
        subscribeBtn = <a onClick={this.handleSubmit} id="subscribe-newsletter-btn" className="disabled z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger" href="#modal1">Tilmeld</a>
      }

      return (
        <div className="row">
          <div className="col s12 m6">
            <p className="green-text text-accent-3 text-subhead">NYHEDSBREV</p>
            <h5 className="white-text text-display-1">Ja Tak!<br/>Send mig gerne email&#39;s og sms&#39;er om sidste nyt fra Bike Shop</h5>
            <p className="dark-secondary-text white-text text-subhead">* Vi opbevarer din e-mail adresse og dit telefonnummer sikkert og giver eller sælger dem ikke videre til tredjepart.</p>
          </div>
          <div className="col s12 m6">
            <form>
              <div className="input-field col s12">
                <input value={this.state.firstName} onChange={this.handleFirstNameChange} id="first_name" type="text" className="validate"/>
                <label htmlFor="first_name">Fornavn *</label>
              </div>
              <div className="input-field col s12">
                <input value={this.state.lastName} onChange={this.handleLastNameChange} id="last_name" type="text" className="validate"/>
                <label htmlFor="last_name">Efternavn *</label>
              </div>

              <div className="input-field col s12">
                <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="validate"/>
                <label htmlFor="email">Email *</label>
              </div>

              <div className="input-field col s12">
                <input value={this.state.phone} onChange={this.handlePhoneChange} id="phone" type="text" className="validate"/>
                <label htmlFor="phone">Telefon</label>
              </div>

              {subscribeBtn}

            </form>
          </div>
        </div>
      );
    }
}

export default NewsletterForm;
