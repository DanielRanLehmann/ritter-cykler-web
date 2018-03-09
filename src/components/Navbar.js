import React, { Component } from 'react';
import './Navbar.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import SideNav from './SideNav.js'

function Dropdown(props) {
  return (
    <ul id="dropdown1" className="dropdown-content">
      <li><a href="#!">one</a></li>
      <li><a href="#!">two</a></li>
      <li className="divider"></li>
      <li><a href="#!">three</a></li>
    </ul>
  );
}

/*
function HalfwayFAB(props) {
  if (!props.materialIconName) {
    return null;
  }

  return (
    <a className="btn-floating btn-large halfway-fab waves-effect waves-light green accent-3">
      <i className="material-icons">{props.materialIconName}</i>
    </a>
  )
}
*/

// has been deprecated.
function NavContent(props) {
  const subtitle = props.subtitle ? <span className="secondary-text body-1 nav-title">{props.subtitle}</span> : null;
  return (
    <div className="nav-content grey lighten-5">
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l10 xl6">
            <span className="black-text primary-text display-1 nav-title">
              {props.title}<br/>
              {subtitle}
            </span>
          </div>
        </div>
      </div>
      {props.halfwayFAB}
    </div>
  )
}

class Navbar extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      $( document ).ready(function(){
        $(".button-collapse").sideNav();
      });

    }
    render() {

      var activeItem = null;
      if (this.props.activeItem) {
        activeItem = this.props.activeItem.toLowerCase();
      }

      return (
        <div>
          <nav className="grey darken-4 z-depth-0 nav-extended">
            <div className="nav-wrapper container">

              <a className="brand-logo dark-primary-text title">RitterCykler</a>
              <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>

              <ul className="right hide-on-med-and-down">
                <li className={activeItem === "mærker" ? "active" : null}><a>MÆRKER</a></li>
                <li className={activeItem === "værksted og priser" ? "active" : null}><a>VÆRKSTED OG PRISER</a></li>
                <li className={activeItem === "kontakt" ? "active" : null}><a>KONTAKT</a></li>
                <li><a className="dropdown-trigger" data-target="dropdown1"><i className="material-icons">more_vert</i></a></li>
              </ul>

              <SideNav userView={{
                "photoURL": "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/223686_2270744738095_7609972_n.jpg?oh=239757edf8fc9ec2e6de0987107a9ab9&oe=5B0CBDB0",
                "name": "Daniel Lehmann",
                "email": "danielran11@gmail.com"
              }}/>

            </div>

          </nav>
        </div>
      );
    }
}

export default Navbar;
