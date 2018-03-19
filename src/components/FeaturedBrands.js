import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class FeaturedBrands extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {
      return (
        <div className="row">
          <div className="col s6 m4 l2">
            <img className="displayed" width="100%" src={require('../assets/brands/greyscale/colnago-logo.png')}/>
          </div>
          <div className="col s6 m4 l2">
            <img className="displayed" width="100%" src={require('../assets/brands/greyscale/nalini-logo.png')}/>
          </div>
          <div className="col s6 m4 l2">
            <img className="displayed" width="100%" src={require('../assets/brands/greyscale/nutcase-logo.png')}/>
          </div>
          <div className="col s6 m4 l2">
            <img className="displayed" width="100%" src={require('../assets/brands/greyscale/trek-logo.png')}/>
          </div>
          <div className="col s6 m4 l2">
            <img className="displayed" width="100%" src={require('../assets/brands/greyscale/giro-logo.png')}/>
          </div>
          <div className="col s6 m4 l2">
            <img className="displayed" width="100%" src={require('../assets/brands/greyscale/mbk-logo.png')}/>
          </div>
        </div>
      );
    }
}

export default FeaturedBrands;
