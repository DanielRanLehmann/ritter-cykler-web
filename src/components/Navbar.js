import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Navbar.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import SideNav from './SideNav.js';

class Navbar extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      $( document ).ready(function(){

        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
          }
        );
      });

    }
    // navbar class should be transparent.
    render() {
      return (
        <div>

          <ul id="dropdown1" className="dropdown-content">
            <li>
              <NavLink
                className={"dropdown-link", "black-text"}
                to="/reklamation-og-returregler"
                activeClassName="active">Reklamation og Returregler
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"dropdown-link", "black-text"}
                to="/om-os"
                activeClassName="active">Om os
              </NavLink>
            </li>
            <li className="divider"></li>
            <li><a className="black-text disabled" href="#!">Medarbejder</a></li>
          </ul>

          <div className="">
            <nav className="z-depth-0 nav-extended">
              <div className="nav-wrapper">

                <NavLink to={'/'} className="brand-logo" activeClassName="active">Bike Shop</NavLink>
                <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>

                <ul className="navlinks right hide-on-med-and-down">
                  <li>
                    <NavLink exact
                      key="home"
                      to="/"
                      activeStyle={{opacity: 0.65, color: 'white'}}
                      activeClassName="active">FORSIDE
                    </NavLink>
                  </li>

                  <li>
                    <NavLink

                      key="brands"
                      to="/maerker"
                      activeStyle={{opacity: 0.65, color: 'white'}}
                      activeClassName="active">MÆRKER
                    </NavLink>
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
                      to="/kontakt"
                      activeStyle={{ opacity: 0.65, color: 'white'}}
                      activeClassName="active">KONTAKT
                    </NavLink>
                  </li>

                  <li>
                    <a className="dropdown-button" data-activates='dropdown1'>MERE<i className="material-icons right">arrow_drop_down</i></a>
                  </li>
                </ul>

                <SideNav/>
              </div>
            </nav>
          </div>
        </div>

      );
    }
}

export default Navbar;
