import React, { Component } from 'react';
import './Contact.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import HeaderView from '../components/HeaderView.js';
import FAB from '../components/FloatingActionButton.js';

import GoogleMap from '../components/GoogleMap.js';
import ContactForm from '../components/ContactForm.js';

import StoreDirectionsView from '../components/StoreDirectionsView.js';
import ReviewCard from '../components/StoreReviewCard.js';

import * as api from '../api/api.js';

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      sucessfullFormCompletion: false
    };

    this.handleContactFormSubmit = this.handleContactFormSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "Kontakt - Ritter Cykler";

    $( document ).ready(function(){

    });

  }

  handleContactFormSubmit(e, enquiryData) {
    e.preventDefault();
    if (!enquiryData) {
      throw("please provide some data")
    }

    api.sendContactEnquiry(enquiryData, success => {
      if (success) {
        this.setState({successfulFormCompletion: true});
      }
    }).catch( (error) => {
      Materialize.toast('Ups! Noget gik galt. Prøv igen', 10000)
    });
  }

  render() {
    return (

      <div>

        <HeaderView title={ "Kontakt" } />

        <div className="section white">
          <div className="container">
          <div className="row">
            <div className="col s12 l6">
              <div className="white">
                <div>
                  <h6 className="primary-text title">Information</h6>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">location_on</i>Lyngby Storcenter 88, 2800 Kongens Lyngby *</p>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">phone</i>45 87 66 01</p>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">email</i>info@rittercykler.dk</p>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">access_time</i>Mandag – Fredag 10:00 – 19:00<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lørdag og Søndag 10:00 – 17:00 </p>
                </div>
                <p className="secondary-text body-1">* Ritter Cykler er beliggende på det lille torv. Det lille torv er placeret i den sydøstlige del af centeret ud til Klampenborgvej.<a className="green-text text-accent-3" href={require('../assets/lyngbystorcenter-centeroversigt-februar-2018.png')}> Se kort over lyngbystorcenter</a></p>
              <div>

                <div className="row">
                  <div className="col s1">
                    <i className="grey-text small icon ion-social-facebook"></i>
                  </div>
                  <div className="col s1">
                    <i className="grey-text small icon ion-social-instagram"></i>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section white">

              <div className="col s12 l6">
                <div style={{"marginBottom": "24px"}} className="hide-on-large-only divider"></div>
                <ContactForm
                  handleSubmit={this.handleContactFormSubmit}
                  successfulFormCompletion={this.state.successfulFormCompletion}
                />
              </div>
            </div>
            </div>
          </div>
        </div>

        <div id="google-map">
          <GoogleMap />
        </div>

      </div>
    );
  }
}

export default Contact;
