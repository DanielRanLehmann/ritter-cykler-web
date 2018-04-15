import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function Stars(props) {
  if (!props.rating || props.rating > 5.0) {
    return null;
  }
  
  var iconNames = ["star_border", "star_border", "star_border", "star_border", "star_border"];
  for (var i = 0; i < Math.floor(props.rating); i++) {
    iconNames[i] = "star"
  }

  // this is a bit strange
  const threshold = 0.25;
  const remainingHalfStar = Math.abs(Math.floor(props.rating) - props.rating) >= threshold;

  if (remainingHalfStar) {
    iconNames[Math.floor(props.rating)] = "star_half";
  }

  return (
    <div className="row">
    {
      iconNames.map((iconName, index) =>
        <div className="col s1">
          <i className="amber-text text-accent-4 material-icons">{iconName}</i>
        </div>
      )
    }
    </div>
  )
}

class StoreReviewCard extends Component {

  render() {
    return (
      <div className="left card-panel white z-depth-0">
        <Stars rating={this.props.starRating} />
        <span className="primary-text mdc-typography--body-1">{this.props.body}</span><br/><br/>
        <span className="secondary-text mdc-typography--body-1">{this.props.author}</span>
      </div>
    );
  }
}

export default StoreReviewCard;
