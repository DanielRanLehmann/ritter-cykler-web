import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function Stars(props) {
  if (!props.count || props.count <= 0) {
    return null;
  }

  return (
    <div className="row">
    {
      props.count.map((starType, index) =>
        <div className="col s1">
          <i className="amber-text text-accent-4 material-icons">star</i>
        </div>
      )
    }
      <div className="col s2">
        <p className="primary-text body-1">{props.count}</p>
      </div>
    </div>
  );
}

class StoreReviewCard extends Component {

  render() {
    return (
      <div className="left card-panel white z-depth-0">
        <Stars count={[1, 1, 1, .5]} />
        <span className="primary-text body-1">{this.props.body}</span><br/><br/>
        <span className="secondary-text body-1">{this.props.author}</span>
      </div>
    );
  }
}

export default StoreReviewCard;
