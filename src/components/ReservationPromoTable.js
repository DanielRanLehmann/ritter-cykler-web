import React, { Component } from 'react';
import './ReservationPromoTable.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class ReservationPromoTable extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {
      return (
        <div>
          <div className="row">
            <h3 className="primary-text headline center-align">Reserver Online!</h3>
            <div className="col s12 m4">
              <div className="center promo promo-example">
                <i className="material-icons">local_offer</i>
                <p className="promo-caption title primary-text">1. Vælg et tilbud</p>
                <p className="center body-1 secondary-text">Du finder et bredt sortiment af forskelligt cykeludstyr og cykeltyper. Vi har alt fra Mountainbikes til racer og cross, herre, dame, tri, sports, citybikes og ikke mindst børnecykler fra anderkendte kvalitets mærker.</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="center promo promo-example">
                <i className="material-icons">event_available</i>
                <p className="promo-caption title primary-text">2. Reserver</p>
                <p className="center body-1 secondary-text">By utilizing elements and principles of Material Design, we were able to create a framework that focuses on User Experience.</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="center promo promo-example">
                <i className="material-icons">store</i>
                <p className="promo-caption title primary-text">3. Hent i butikken</p>
                <p className="center body-1 secondary-text">Kom ind forbi butikken i Lyngby Storcenter og se vores udvalg af cykler og cykeludstyr. Du kan også følge os på vores Instagram og Facebook hvor vi løbende opdaterer med nyheder og tilbud.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default ReservationPromoTable;
