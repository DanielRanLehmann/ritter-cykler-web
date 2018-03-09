import React, { Component } from 'react';
// import './Footer.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };

    }

    componentWillMount() {

    }

    render() {
      return (
        <footer className="white page-footer">
          <div className="container">

            <div className="divider"></div>

            <div className="section">
              <div className="row">
                <div className="col l6 s12">
                  <h5 className="black-text primary-text body-2">Kontakt</h5>
                  <p className="black-text primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">location_on</i>Lyngby Storcenter 88, 2800 Kongens Lyngby</p>
                  <p className="black-text primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">phone</i>45 87 66 01</p>
                  <p className="black-text primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">email</i>info@rittercykler.dk</p>
                  <p className="black-text primary-text body-1"><i className="left inline-small-icon material-icons green-text text-accent-3">access_time</i>Mandag – Fredag 10:00 – 19:00<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lørdag og Søndag 10:00 – 17:00 </p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="black-text primary-text body-2">Links</h5>
                  <ul>
                    <li><a className="body-1 green-text text-accent-3" href="#!">Mærker</a></li>
                    <li><a className="body-1 green-text text-accent-3" href="#!">Værksted og priser</a></li>
                    <li><a className="body-1 green-text text-accent-3" href="#!">Kontakt</a></li>
                    <li><a className="body-1 green-text text-accent-3" href="#!">Retur og Gebyrregler</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section center-align">
              <h6 className="black-text primary-text title">RitterCykler</h6>
              <p className="black-text secondary-text body-1">Butikken blev grundlagt tilbage i 1977 af cykelrytteren Ole Ritter. I dag drives og ejes butikken af Bent Isaksen, der har over 30 års erfaring i branchen, og stadig arbejder tæt sammen med Ole Ritter om at skaffe det helt rigtige udvalg til kunderne.</p>
              <div className="row">
                <div className="col s1 offset-s5">
                  <i className="grey-text small icon ion-social-facebook"></i>
                </div>
                <div className="col s1">
                  <i className="grey-text small icon ion-social-instagram"></i>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    }
}

export default Footer;