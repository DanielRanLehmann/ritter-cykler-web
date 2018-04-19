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

        <div className="white section">

          <div className="container">
            <div className="row">
              <div className="col s12 m12 l10 xl6">
                <h6 className="text-large-title green-text text-accent-3 text-bold">Værksted og Priser</h6>
                <span className="text-primary text-body">Alt hvad vi kan reparer, laves til næste hverdag kl.17. Cykler kan indleveres i hele åbningstiden. Når cyklen er færdig, bliver der sendt en sms til kunden. Cyklen skal afhentes <b>senest</b> 30 min før lukketid.</span>
              </div>
            </div>
          </div>

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
