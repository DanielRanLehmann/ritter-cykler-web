import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

// <h4 className="headline-light secondary-text">Vores medarbejdere står klar til at hjælpe dig til at finde det udstyr eller den cykel, der passer netop dig. Hvad enten det er mountainbike, racer eller ny hverdagscykel. Vi rådgiver dig efter dine behov og vores erfaring.</h4>

class AboutUsBlurb extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="center">
          <h1 className="mdc-typography--display3 primary-text">Om os</h1>
          <p className="secondary-text mdc-typography--headline">Butikken blev grundlagt tilbage i 1977 af cykelrytteren Ole Ritter. I dag drives og ejes butikken af Bent Isaksen, der har over 30 års erfaring i branchen, og stadig arbejder tæt sammen med Ole Ritter om at skaffe det helt rigtige udvalg til kunderne.</p>
        </div>
      );
    }
}

export default AboutUsBlurb;
