import React, { Component } from 'react';
import './FeedbackButton.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class FeedbackButton extends Component {

  render() {
    return (
      <a id="feedback-btn" href="#!" className="btn-flat waves-effect btn-floating">
        <i className="material-icons">feedback</i>
      </a>
    );
  }
}

export default FeedbackButton;
