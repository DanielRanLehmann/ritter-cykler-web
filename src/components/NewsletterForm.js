import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class NewsletterForm extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {
      return (
        <div className="row">
          <div className="col s12 m6">
            <p className="green-text text-accent-3 caption">NYHEDSBREV</p>
            <h5 className="white-text display-1">Ja Tak!<br/>Send mig gerne emails og smser om sidste nyt fra RitterCykler</h5>
            <p style={{"opacity": "0.70"}} className="white-text caption">* Vi opbevarer din e-mail adresse og dit telefonnummer sikkert og giver eller sælger dem ikke videre til tredjepart.</p>
          </div>
          <div className="col s12 m6">
            <form>
              <div className="input-field col s12">
                <input id="first_name" type="text" className="validate"/>
                <label htmlFor="first_name">Fornavn</label>
              </div>
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate"/>
                <label htmlFor="last_name">Efternavn</label>
              </div>

              <div className="input-field col s12">
                <input id="email" type="email" className="validate"/>
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field col s12">
                <input id="phone" type="number" className="validate"/>
                <label htmlFor="phone">Mobil nr.</label>
              </div>

              <a id="product-item-order-btn" className="z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger" href="#modal1">Tilmeld</a>
            </form>
          </div>
        </div>
      );
    }
}

export default NewsletterForm;
