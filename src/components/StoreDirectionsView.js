import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function Tabs(props) {
  if (!props.items) {
    return null;
  }

  return (
    <ul className="tabs" style={{"border-bottom-style": "solid", "border-color":"#e0e0e0", "border-width": "1px"}}>
    {
        props.items.map((tab, index) =>
          <li className="tab col s4">
            <a className="active" href={"#tab" + index.toString()}>{tab}</a>
          </li>
        )
    }
    </ul>
  );
}

class StoreDirectionsView extends Component {

  render() {
    return (
      <div>

        <Tabs items={["Kort", "Lyngby Storcenter", "Instruktioner"]} />

        <div id="tab0" className="col s12">
          <div>
            <h1>Google maps goes here</h1>
          </div>
        </div>

        <div id="tab1" style={{"width": "100%", "height": "450px"}} className="col s12">
          <div style={{"paddingTop": "24px"}}>
            <img className="materialboxed" width="100%" src="https://lyngbystorcenter.dk/wp-content/uploads/2016/04/Centeroversigt_web_februar_2018.png"/>
          </div>
        </div>

        <div id="tab2" className="col s12">
          <div>
            <h1 className="primary-text subheading">Instruktioner</h1>
            <p className="primary-text body-1">The Apple Store is located in the Valley Plaza mall, in the JC Penney wing opposite Build-A-Bear and next to Guess. Valley Plaza is located on the east side of the 99 at Ming Avenue, just south of the 58/Barstow-Bakersfield highway.</p>
          </div>
        </div>

      </div>
    );
  }
}

export default StoreDirectionsView;
