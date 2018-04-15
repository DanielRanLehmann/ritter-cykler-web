import React, { Component } from 'react';
import './HeaderView.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class HeaderView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  // grey lighten-5 prev. class for headerview top div.

  render() {
    const subtitle = this.props.subtitle ? <span className="primary-text text-subhead nav-title">{this.props.subtitle}</span> : null;
    return (
      <div className="header-view">
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col s12 m12 l10 xl6">
                <h6 className="green-text text-accent-3 primary-text text-display-1">{this.props.title}</h6>
                {subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderView;
