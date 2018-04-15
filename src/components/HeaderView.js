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

  render() {
    const subtitle = this.props.subtitle ? <span className="secondary-text mdc-typography--subheading2 nav-title">{this.props.subtitle}</span> : null;
    return (
      <div className="header-view grey lighten-5">
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col s12 m12 l10 xl6">
                <h6 className="black-text primary-text mdc-typography--display1">{this.props.title}</h6>
                {subtitle}
              </div>
            </div>
            {this.props.halfwayFAB}
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderView;
