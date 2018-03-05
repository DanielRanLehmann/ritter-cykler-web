import React, { Component } from 'react';
// import './WorkshopAndPrices.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import WorkshopPricesTable from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/WorkshopPricesTable.js';
import WorkshopSurveyForm from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/WorkshopSurveyForm.js';

class WorkshopAndPrices extends Component {

  componentDidMount() {
      $( document ).ready(function(){

      });

  }
  render() {
    return (

      <div>

        <div className="grey darken-4 section">
          <div className="container">
            <div className="row">
              <div className="col s10">
                <h1 className="white-text dark-primary-text display-1">Værksted Og Priser</h1>
                <p className="white-text dark-secondary-text body-1">Vores værksteds politik er at alt hvad vi kan reparer, laves til næste hverdag kl.17. Cykler kan indleveres i hele åbningstiden. Når cyklen er færdig, bliver der sendt en sms til kunden. Cyklen skal afhentes senest 30 min før lukketid.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="white section">
          <div className="container">
            <WorkshopPricesTable />
          </div>
        </div>

        <div className="container divider"></div>

        <div className="white section">
          <div className="container">
            <WorkshopSurveyForm />
          </div>
        </div>

      </div>
    );
  }
}

export default WorkshopAndPrices;
