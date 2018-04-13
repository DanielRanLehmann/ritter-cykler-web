import React, { Component } from 'react';
// import './WorkshopAndPrices.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import HeaderView from '../components//HeaderView.js';
import FAB from '../components/FloatingActionButton.js';

import WorkshopPricesTable from '../components/WorkshopPricesTable.js';
import WorkshopSurveyForm from '../components/WorkshopSurveyForm.js';

import workshopPricesData from '../assets/property-lists/workshop-prices.json';

import * as api from '../api/api.js';

class WorkshopAndPrices extends Component {

  constructor() {
    super();

    // put survey form states here.
    this.state = {
      isSurveyCompleted: false,
      successfulSurveyCompletion: false
    };

    this.callbackSurveyForm = this.callbackSurveyForm.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "Værksted og Priser - Ritter Cykler"
  }

  callbackSurveyForm(e, responseData) {
    e.preventDefault();

    api.sendSurveyResponse("-L63fDO7f_YjdvGHRXb8", responseData, success => {
      if (success) {
        this.setState({
          isSurveyCompleted: true,
          successfulSurveyCompletion: true
        });
      }
    })
    /*
    .catch( (error) => {
      console.log(this.errorMessage = 'Error - ' + error.message)
    });
    */
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
            <WorkshopSurveyForm
              handleSubmit={this.callbackSurveyForm}
              isSurveyCompleted={this.state.isSurveyCompleted}
              successfulSurveyCompletion={this.state.successfulSurveyCompletion}
            />
          </div>
        </div>

        <div className="divider"></div>

      </div>
    );
  }
}

export default WorkshopAndPrices;
