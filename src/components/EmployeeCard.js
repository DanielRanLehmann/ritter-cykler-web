import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class EmployeeCard extends Component {

  render() {
    return (
      <div className="center card-panel white z-depth-0">

        <div className="col s4 offset-s4">
          <img className="circle responsive-img" src={this.props.profilePictureURL}/>
        </div>

        <div style={{"paddingTop":" 24px"}} className="col s12">
          <span className="text-primary text-headline text-bold"><b>{this.props.name}</b></span><br/><br/>
          <span className="text-secondary text-body">{this.props.description}</span>
        </div>

      </div>
    );
  }
}

export default EmployeeCard;
