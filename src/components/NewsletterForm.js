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
        successfulFormCompletion: false
      }

      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
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

    handleSubmit(e) {
      e.preventDefault()
      const subscriberData = {
        "createdAt": new Date().getTime(),
        "firstName": this.state.firstName.capitalize(),
        "lastName": this.state.lastName.capitalize(),
        "email": this.state.email
      }

      this.props.handleSubmit(e, subscriberData);
    }

    render() {

      if (this.props.successfulFormCompletion) {
        var successDescription = "Du vil løbende få masser af spændende tilbud over email";
        successDescription += ". Du kan afmelde vores nyhedsbrev ved at klikke på linket \'afmeld\' nederst i bunden i en af vores mails.";

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
        subscribeBtn = <button id="subscribe-newsletter-btn" className="z-depth-0 green accent-3 waves-effect waves-light btn" type="submit" name="action">Tilmeld</button>
      } else {
        subscribeBtn = <button id="subscribe-newsletter-btn" className="disabled z-depth-0 green accent-3 waves-effect waves-light btn" type="submit" name="action">Tilmeld</button>
      }

      return (
        <div className="row">
          <div className="col s12 m6">
            <p className="green-text text-accent-3 text-callout">NYHEDSBREV</p>
            <h5 className="white-text text-large-title">Ja Tak!<br/>Send mig gerne email&#39;s og sms&#39;er om sidste nyt fra Bike Shop</h5>
            <p className="text-dark-secondary text-callout">* Vi opbevarer din email adresse sikkert og giver eller sælger det ikke videre til nogen tredjepart.</p>
          </div>
          <div className="col s12 m6">
            <form onSubmit={this.handleSubmit}>

              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.firstName} onChange={this.handleFirstNameChange} id="first_name" type="text" className="validate" required="" aria-required="true"/>
                  <label htmlFor="first_name">Fornavn *</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.lastName} onChange={this.handleLastNameChange} id="last_name" type="text" className="validate" required="" aria-required="true"/>
                  <label htmlFor="last_name">Efternavn *</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="validate" required="" aria-required="true"/>
                  <label htmlFor="email" data-error="Ugyldig email">Email *</label>
                </div>
              </div>
              {subscribeBtn}
            </form>

          </div>
        </div>
      );
    }
}

export default NewsletterForm;
