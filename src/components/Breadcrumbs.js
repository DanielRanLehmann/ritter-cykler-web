import React, { Component } from 'react';
// import './Breadcrumbs.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class Breadcrumbs extends Component {
    constructor(props) {
      super(props);

    }

    render() {
      return (
        <nav className="grey darken-4 z-depth-0">
         <div className="nav-wrapper">
           <div className="col s12">
             {
               this.props.items.map((item) =>
                 item
               )
             }
           </div>
         </div>
       </nav>
      );
    }
}

export default Breadcrumbs;
