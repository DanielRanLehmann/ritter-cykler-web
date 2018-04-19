import React, { Component } from 'react';
import './FloatingActionButton.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class FAB extends Component {
    constructor(props) {
      super(props);
      this.state = {
        position: null,
        materialIconName: this.props.materialIconName
      };

    }

    componentWillMount() {
      var _position = this.props.positionHalfway ? "halfway-fab" : null;
      this.setState({position: _position});
    }

    render() {
      return (
        <a className={'btn-floating btn-large ' + this.state.position + ' waves-effect waves-light green accent-3 z-depth-0'}>
          <i className="material-icons">{this.state.materialIconName}</i>
        </a>
      );
    }
}

export default FAB;
