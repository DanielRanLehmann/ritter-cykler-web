import React, { Component } from 'react';
import './FeedbackButton.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class FeedbackButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    $('#feedback-modal').modal('open'); // open after async setstate call?
  }

  render() {
    return (
      <a onClick={this.handleClick} id="feedback-btn" href="#!" className="btn-flat waves-effect btn-floating">
        <i className="material-icons">feedback</i>
      </a>
    );
  }
}

export default FeedbackButton;
