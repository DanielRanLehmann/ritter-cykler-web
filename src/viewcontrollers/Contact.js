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

      <div className="section white">
        <div className="container">
          <h6 className="text-large-title text-bold green-text text-accent-3">Kontakt</h6>
        </div>
      </div>
      <div className="divider container"></div>


        <div className="section white">

          <div className="container">
          <div className="row">
            <div className="col s12 l6">
              <div className="white">
                <div>
                  <h6 className="text-primary text-title-2 text-bold">Information</h6>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">location_on</i>Lyngby Storcenter 88, 2800 Kongens Lyngby *</p>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">phone</i>45 87 66 01</p>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">email</i>info@rittercykler.dk</p>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">access_time</i>Mandag – Fredag 10:00 – 19:00<br/>Lørdag og Søndag 10:00 – 17:00 </p>
                </div>
                <br></br>
                <p className="text-secondary text-callout">* Ritter Cykler er beliggende på det 'lille torv' i Lyngbystorcenter. Det lille torv er placeret i den sydøstlige del af centeret ud til Klampenborgvej.<a className="green-text text-accent-3" href={require('../assets/lyngbystorcenter-centeroversigt-februar-2018.png')}> Se kort over lyngbystorcenter</a></p>
              <div>

              <br></br>

                <div className="row">
                  <div className="col s1">
                    <a href="https://www.facebook.com/rittercykler/" target="_blank" style={{fontSize: "24px"}} className="grey-text fa fa-facebook"></a>
                  </div>
                  <div className="col s1">
                    <a href="https://www.instagram.com/rittercykler/" target="_blank" style={{fontSize: "24px"}} className="grey-text fa fa-instagram"></a>
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
