import React, { Component } from 'react';
// import './WorkshopPriceTable.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';


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
        <tbody className="row-hover">
          <tr className="row-1 odd">
            <td className="column-1">Time pris</td><td className="column-2">600,-</td>
          </tr>
          <tr className="row-2 even">
            <td className="column-1">Start pris fra</td><td className="column-2">100,-</td>
          </tr>
          <tr className="row-3 odd">
            <td className="column-1">Arbejdsløn for lille service, excl dæmper/hydr. Bremse/hjulopret</td><td className="column-2">400,-</td>
          </tr>
          <tr className="row-4 even">
            <td className="column-1">Arbejdsløn for stort service, dæmper/hydr. Bremse</td><td className="column-2">800,-</td>
          </tr>
          <tr className="row-5 odd">
            <td className="column-1">Arbejdsløn for montering af slange fra</td><td className="column-2">125,-</td>
          </tr>
          <tr className="row-6 even">
            <td className="column-1">Arbejdsløn for montering af slange barnevognshjul fra</td><td className="column-2">50,-</td>
          </tr>
          <tr className="row-7 odd">
            <td className="column-1">Arbejdsløn for montering ad dæk + slange fra</td><td className="column-2">200,-</td>
          </tr>
          <tr className="row-8 even">
            <td className="column-1">Arbejdsløn for opretning pr. hjul fra</td><td className="column-2">300,-</td>
          </tr>
          <tr className="row-9 odd">
            <td className="column-1">Arbejdsløn for opretning af special hjul fra</td><td className="column-2">350,-</td>
          </tr>
          <tr className="row-10 even">
            <td className="column-1">Arbejdsløn for opspænding af fælg og eger</td><td className="column-2">500,-</td>
          </tr>
          <tr className="row-11 odd">
            <td className="column-1">Arbejdsløn for montering af kæde + tandhjul fra</td><td className="column-2">300,-</td>
          </tr>
          <tr className="row-12 even">
            <td className="column-1">Arbejdsløn for montering af kæde + krans fra</td><td className="column-2">350,-</td>
          </tr>
          <tr className="row-13 odd">
            <td className="column-1">Arbejdsløn for montering af krankboks fra</td><td className="column-2">500,-</td>
          </tr>
          <tr className="row-14 even">
            <td className="column-1">Arbejdsløn for opgørelse af forsikrings sager skal betales ved indlevering, bliver fratrukket hvis cyklen <br />
          laves her eller der en ny cykel.</td><td className="column-2">750,-</td>
          </tr>
          <tr className="row-15 odd">
            <td className="column-1">Arbejdsløn for udluftning ad skivebremser pr. Ende</td><td className="column-2">300,-</td>
          </tr>
          <tr className="row-16 even">
            <td className="column-1">Arbejdsløn for forgaffel eller dæmper service fra</td><td className="column-2">500,-</td>
          </tr>
          <tr className="row-17 odd">
            <td className="column-1">Arbejdsløn for udskiftning ad 3-5-7 gear komplet kabelboks fra</td><td className="column-2">100,-</td>
          </tr>
          <tr className="row-18 even">
            <td className="column-1">Arbejdsløn for montering af helskærme fra</td><td className="column-2">250,-</td>
          </tr>
          <tr className="row-19 odd">
            <td className="column-1">Arbejdsløn for udskiftning af styrfittings fra</td><td className="column-2">250,-</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default WorkshopPricesTable;
