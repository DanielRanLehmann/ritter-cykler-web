import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

// NOT IN USE YET.

class Button extends Component {
    constructor(props) {
      super(props);

      this.state = {
        disabled: false,
        enalbed: true
      }

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
      // do something
    }

    componentDidMount() {
      $(document).ready(function() {
        $('.tooltipped').tooltip({delay: 50});
      });
    }

    componentWillUnmount() {
      $('.tooltipped').tooltip('remove');
    }

    render() {

      var classes = "z-depth-0 green accent-3 waves-effect waves-light btn"; // modal-trigger
      if (this.props.additionalClasses) {
        classes += " " + this.props.additionalClasses;
      }
      if (this.props.disabled) {
        classes += " disabled";
      }
      if (this.props.tooltip) {
        classes += " tooltipped";
      }

      return (
        <a style={this.props.style}
                  onClick={this.props.onClick}
                  className={classes}
                  data-position="bottom"
                  data-delay="50"
                  data-tooltip={this.props.tooltip}>
                  {this.props.title}
                </a>
      );
    }
}

export default Button;
