import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <div className="section">
              <div className="row">
                <div className="col l6 s12">
                  <h5 className="text-primary text-title-3 text-bold">Kontakt</h5>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">location_on</i>Lyngby Storcenter 88, 2800 Kongens Lyngby</p>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">phone</i>45 87 66 01</p>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">email</i>info@rittercykler.dk</p>
                  <p className="text-primary text-body"><i className="left inline-small-icon material-icons green-text text-accent-3">access_time</i>Mandag – Fredag 10:00 – 19:00<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lørdag og Søndag 10:00 – 17:00 </p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="text-primary text-title-3 text-bold"><b>Links</b></h5>
                  <ul>
                    <li><Link to={'/maerker'} className="text-body green-text text-accent-3" activeClassName="active">Mærker</Link></li>
                    <li><Link to={'/vaerksted-og-priser'} className="text-body green-text text-accent-3" activeClassName="active">Værksted Og Priser</Link></li>
                    <li><Link to={'/kontakt'} className="text-body green-text text-accent-3" activeClassName="active">Kontakt</Link></li>
                    <li><Link to={'/reklamation-og-returregler'} className="text-body green-text text-accent-3" activeClassName="active">Reklamation og Returregler</Link></li>
                    <li><Link to={'/om-os'} className="text-body green-text text-accent-3" activeClassName="active">Om os</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section center-align">
              <h6 className="text-primary logo text-title-1">Bike Shop</h6>
              <br></br>
              <p className="text-primary text-body">Vi bytter alle nye og ikke ibrugtagene varer i 14 dage efter købs dato mod forevisning af gyldig kvittering, til et tilgodebevis eller penge retur. Dette gælder ikke bestilte varer.</p>
              <br></br>
              <div className="row">
                <div className="col s1 offset-s5">
                  <a href="https://www.facebook.com/rittercykler/" target="_blank" style={{fontSize: "30px"}} className="grey-text fa fa-facebook"></a>
                </div>
                <div className="col s1">
                  <a href="https://www.instagram.com/rittercykler/" target="_blank" style={{fontSize: "30px"}} className="grey-text fa fa-instagram"></a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    }
}

export default Footer;
