import React, { Component } from 'react';
// import './WorkshopPriceTable.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import {FormattedNumber} from 'react-intl';

function Row(props) {
  if (!props.description && !props.price) {
    return null;
  }

  return (
    <tr>
      <td className="primary-text mdc-typography--subheading1">{props.description}</td>
      <td className="primary-text mdc-typography--subheading1">
        <FormattedNumber
            style='currency'
            currency={props.currency}
            value={props.price}
        />
      </td>
    </tr>
  )
}

class WorkshopPricesTable extends Component {

  render() {
    return (
      <table className="responsive-table highlight">
        <thead>
          <tr>
              <th className="primary-text mdc-typography--subheading2"><b>Beskrivelse</b></th>
              <th className="primary-text mdc-typography--subheading2"><b>Pris</b></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.rows.map((row) =>
              <Row description={row.description} price={row.price} currency={row.currency}/>
            )
          }
        </tbody>
      </table>
    );
  }
}

export default WorkshopPricesTable;
