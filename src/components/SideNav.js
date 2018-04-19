import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './SideNav.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class SideNav extends Component {
    constructor(props) {
      super(props);

      this.collapse = this.collapse.bind(this);
    }

    componentDidMount() {
      $( document ).ready(function(){
        $(".button-collapse").sideNav({
          closeOnClick: false,
          draggable: true
        });
      });
    }

    collapse() {
      $('.button-collapse').sideNav('hide')
    }

    render() {

      return (
        <ul id="slide-out" className="side-nav">
          <li>
            <NavLink exact
              onClick={this.collapse()}
              to="/"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Forside
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={this.collapse()}
              to="/maerker"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Mærker
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/vaerksted-og-priser"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Værksted og Priser
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={this.collapse()}
              to="/kontakt"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Kontakt
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={this.collapse()}
              to="/reklamation-og-returregler"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Reklamation og Returregler
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={this.collapse()}
              to="/om-os"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Om os
            </NavLink>
          </li>
        </ul>
      );
    }
}

export default SideNav;
