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
          <div className="row">
            <h3 className="primary-text mdc-typography--display1 center-align">Reserver Online!</h3>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center green-text text-accent-2"><i className="material-icons">local_offer</i></h2>
                <h5 className="mdc-typography--headline center">1. Vælg et tilbud</h5>

                <p className="secondary-text mdc-typography--subheading2 center">Du finder et bredt sortiment af forskelligt cykeludstyr og cykeltyper. Vi har alt fra Mountainbikes til racer og cross, herre, dame, tri, sports, citybikes og ikke mindst børnecykler fra anderkendte kvalitets mærker.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center green-text text-accent-2"><i className="material-icons">event_available</i></h2>
                <h5 className="mdc-typography--headline center">2. Reservér</h5>

                <p className="secondary-text mdc-typography--subheading2 center">Find et produkt der fanger din interesse, vælg eventuelt en afhentningsdato, og klik reservér</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center green-text text-accent-2"><i className="material-icons">store</i></h2>
                <h5 className="mdc-typography--headline center">3. Hent i butikken</h5>

                <p className="secondary-text mdc-typography--subheading2 center">Kom ind forbi butikken i Lyngby Storcenter og se vores udvalg af cykler og cykeludstyr. Du kan også følge os på vores Instagram og Facebook hvor vi løbende opdaterer med nyheder og tilbud.</p>
              </div>
            </div>
          </div>
      );
    }
}

export default ReservationPromoTable;
