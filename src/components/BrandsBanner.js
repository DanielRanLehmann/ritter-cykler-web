import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class BrandsBanner extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {
      return (
        <div className="row">
          <div className="col s2">
            <img width="100%" src="http://localhost:3000/images/brands/colnago-logo.png"/>
          </div>
          <div className="col s2">
            <img className="displayed" width="100%" src="http://localhost:3000/images/brands/pinarello-logo.png"/>
          </div>
          <div className="col s2">
            <img className="displayed" width="100%" src="http://localhost:3000/images/brands/principia-logo.png"/>
          </div>
          <div className="col s2">
            <img className="displayed" width="100%" src="http://localhost:3000/images/brands/trek-logo.png"/>
          </div>
          <div className="col s2">
            <img className="displayed" width="100%" src="http://localhost:3000/images/brands/fondriest-logo.png"/>
          </div>
          <div className="col s2">
            <img className="displayed" width="100%" src="http://localhost:3000/images/brands/giro-logo.png"/>
          </div>
        </div>
      );
    }
}

export default BrandsBanner;
