import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () =>
  <div>
    <div style={{"height": "100vh", "marginTop": "72px"}} className="white">
      <div className="container">
        <img style={{"objectFit": "fill", "width": "300px", "height": "300"}} src="https://media.giphy.com/media/UsOoz5EYqRxXW/giphy.gif"/>
        <h1 className="left-align text-primary text-thin text-large-title-ax5">Ups!</h1>
        <h5 className="left-align text-secondary text-large-title">Siden blev ikke fundet</h5>
        <p className="left-align text-secondary text-body">Beklager men siden du ledte efter eksisterer ikke. Måske eksisterede det aldrig.<br/>Uanset hvad er vi kede at at lede dig på afveje og har allerede taget de næste skridt<br/>og fyret medarbejderen der var ansvarlig.</p>
        <br/>
        <Link className="red-text center-align waves-effect waves-dark btn-flat" to={'/'}>Tilbage til Forside
          <i className="material-icons left">arrow_back</i>
        </Link>

      </div>
    </div>
    <div className="divider"></div>
  </div>

export default NotFound;
