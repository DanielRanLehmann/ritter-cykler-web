import React, { Component } from 'react';
// import './WorkshopAndPrices.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import HeaderView from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/HeaderView.js';
import FAB from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/FloatingActionButton.js';

import WorkshopPricesTable from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/WorkshopPricesTable.js';
import WorkshopSurveyForm from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/WorkshopSurveyForm.js';

import workshopPricesData from '../assets/property-lists/workshop-prices.json';

class WorkshopAndPrices extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "Værksted og Priser - Ritter Cykler"
  }
  render() {
    return (

      <div>

        <HeaderView
          title={ "Værksted Og Priser" }
          subtitle={ "Vores værksteds politik er at alt hvad vi kan reparer, laves til næste hverdag kl.17. Cykler kan indleveres i hele åbningstiden. Når cyklen er færdig, bliver der sendt en sms til kunden. Cyklen skal afhentes senest 30 min før lukketid."}
        />

        <div className="white section">
          <div className="container">
            <WorkshopPricesTable rows={workshopPricesData} />
          </div>
        </div>



        <div className="white section">
          <div className="container">
            <div className="divider"></div>
            <WorkshopSurveyForm surveyId={"-L63fDO7f_YjdvGHRXb8"}/>
          </div>
        </div>

        <div className="divider"></div>

      </div>
    );
  }
}

export default WorkshopAndPrices;
