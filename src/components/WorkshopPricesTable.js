import React, { Component } from 'react';
// import './WorkshopPriceTable.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function Row(props) {
  if (!props.description && !props.price) {
    return null;
  }

  return (
    <tr>
      <td>{props.description}</td>
      <td>{props.price}</td>
    </tr>
  )
}

class WorkshopPricesTable extends Component {

  render() {
    return (
      <table className="responsive-table highlight">
        <thead>
          <tr>
              <th>Beskrivelse</th>
              <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.rows.map((row) =>
              <Row description={row.description} price={row.price}/>
            )
          }
        </tbody>
      </table>
    );
  }
}

export default WorkshopPricesTable;
