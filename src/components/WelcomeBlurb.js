import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class WelcomeBlurb extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      $(document).ready(function(){
        $('.parallax').parallax();
      });
    }
    render() {
      return (
        <div className="center">
          <h1 className="display-1 primary-text"><b>RitterCykler</b> er din forhandler inden for cykler og cykeludstyr</h1>
          <h4 className="headline-light secondary-text">Vores medarbejdere står klar til at hjælpe dig til at finde det udstyr eller den cykel, der passer netop dig. Hvad enten det er mountainbike, racer eller ny hverdagscykel. Vi rådgiver dig efter dine behov og vores erfaring.</h4>
        </div>
      );
    }
}

export default WelcomeBlurb;
