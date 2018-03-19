import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Radium from "radium";

import './Navbar.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import SideNav from './SideNav.js';

function MoreDropdown(props) {
  return (
    <ul id='dropdown1' className='dropdown-content'>
      <li>
        <NavLink
          className={"black-text"}
          to="/gebyr-og-returregler"
          activeClassName="active">Gebyr og Returregler
        </NavLink>
      </li>
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
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
          }
        );
      });

    }
    render() {

      const RadiatingNavLink = Radium(NavLink);

      var activeItem = null;
      if (this.props.activeItem) {
        activeItem = this.props.activeItem.toLowerCase();
      }

      return (
        <nav className="grey darken-4 z-depth-0 nav-extended">
          <div className="nav-wrapper container">

            <NavLink to={'/'} className="brand-logo dark-primary-text title" activeClassName="active">RitterCykler</NavLink>
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>

            <ul className="nav-items right hide-on-med-and-down">
              <li>
                <RadiatingNavLink
                  style={{ ":hover": { background: "green" } }}
                  key="brands"
                  to="/maerker"
                  activeStyle={{ opacity: 0.65, color: 'white'}}
                  activeClassName="active">MÆRKER
                </RadiatingNavLink>
              </li>

              <li>
                <NavLink
                  key="workshop"
                  to="/vaerksted-og-priser"
                  activeStyle={{ opacity: 0.65, color: 'white'}}
                  activeClassName="active">VÆRKSTED OG PRISER
                </NavLink>
              </li>

              <li>
                <NavLink
                  key="contact"
                  className="nav_link"
                  to="/kontakt"
                  activeStyle={{ opacity: 0.65, color: 'white'}}
                  activeClassName="active">KONTAKT
                </NavLink>
              </li>

              <li><a className="dropdown-button tooltipped" data-position="bottom" data-delay="50" data-tooltip="Mere" data-activates='dropdown1'><i className="material-icons">more_vert</i></a></li>

            </ul>

            <MoreDropdown />

            <SideNav/>

          </div>

        </nav>
      );
    }
}

Navbar = Radium(Navbar);
export default Navbar;
