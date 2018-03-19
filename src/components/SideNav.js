import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// import './SideNav.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function UserView(props) {
  return (
    <li><div className="user-view">
      <div className="background grey darken-4"></div>
      <a href="#!user"><img className="circle" src={props.photoURL}/></a>
      <a href="#!name"><span className="white-text name">{props.name}</span></a>
      <a href="#!email"><span className="white-text email">{props.email}</span></a>
    </div></li>
  );
}

class SideNav extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }
    render() {

      var userView = null;
      if (this.props.userView) {
        const data = this.props.userView;

        var _name = "Ukendt navn";
        var _email = "Ukendt email";
        var _photoURL = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

        if (data["name"]) { _name = data["name"]; }
        if (data["email"]) { _email = data["email"]; }
        if (data["photoURL"]) { _photoURL = data["photoURL"]; }

        userView = <UserView name={_name}
                             email={_email}
                             photoURL={_photoURL}/>;
      }

      return (
        <ul id="slide-out" className="side-nav">
          { userView }
          <li>
            <NavLink
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
              to="/kontakt"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Kontakt
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reklamation-og-returregler"
              activeStyle={{ color:"white", "background-color": '#00e676'}}
              activeClassName="active">Reklamation og Returregler
            </NavLink>
          </li>
        </ul>
      );
    }
}

export default SideNav;
