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

class Contact extends Component {

  componentDidMount() {
    $( document ).ready(function(){

    });

  }

  render() {
    return (

      <div>

        <HeaderView title={ "Kontakt" } />

        <div className="section white">
          <div className="row container">
            <div className="col s12 m6">
              <div className="white">
                <div>
                  <h6 className="primary-text title">Information</h6>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">location_on</i>Lyngby Storcenter 88, 2800 Kongens Lyngby *</p>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">phone</i>45 87 66 01</p>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">email</i>info@rittercykler.dk</p>
                  <p className="primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">access_time</i>Mandag – Fredag 10:00 – 19:00<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lørdag og Søndag 10:00 – 17:00 </p>
                </div>
                <p className="secondary-text body-1">* The Apple Store is located in the Valley Plaza mall, in the JC Penney wing opposite Build-A-Bear and next to Guess. Valley Plaza is located on the east side of the 99 at Ming Avenue, just south of the 58/Barstow-Bakersfield highway.<a className="green-text text-accent-3" href="https://lyngbystorcenter.dk/wp-content/uploads/2016/04/Centeroversigt_web_februar_2018.png"> Se kort over lyngbystorcenter</a></p>
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

            <div className="col s12 m6">
              <ContactForm />
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
