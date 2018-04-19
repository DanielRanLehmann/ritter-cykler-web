import React, { Component } from 'react';
import './HeroImageView.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class HeroImageView extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      $(document).ready(function(){
        $('.parallax').parallax();
      });
    }
    render() {

      var height = 500;
      if (this.props.height) { height = this.props.height; }

      return (
        <div className="parallax-container">
           <div className="parallax"><img src={this.props.imageSrc}/></div>
         </div>
      );
    }
}

export default HeroImageView;
