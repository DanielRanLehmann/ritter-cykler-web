import React, { Component } from 'react';
// import './ComplaintAndReturnPolicies.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import HeaderView from '../components/HeaderView.js';

class ComplaintsAndReturnPolicies extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "Reklamation og Returregler - Ritter Cykler";
  }

  render() {
    return (
      <div>
        <HeaderView
          title={ "Reklamation og Returregler" }
        />

        <div className="section white">
          <div className="container">
          <div className="row">
            <div className="col s12 m10 l7">
            <h6 className="primary-text title">Garanti</h6>
            <p className="primary-text body-1">
              De bedes bemærke, at reklamation over dele behæftet med fabrikation- eller monteringsfejl skal ske inden for en rimelig tid efter at De har – eller burde have – opdaget fejlen. Sker det ikke, taber De retten til at påberåbe Dem fejlen. Sidste frist til at reklamere over fejl eller mangler er 2 år efter levering jf. Købelovens reklamationsfrist. Der ydes ikke erstatning for normalt slid, misbrug eller ødelæggelse af pærer, kabler, forkromning, kæde, gear samt transportomkostninger. Såfremt cyklen er forsøgt adskilt eller har været genstand for ulovlige indgreb bortfalder reklamationsretten. I de tilfælde, hvor fabrikken eller importøren påtager sig at indestå for fejl eller yder garanti ud over købelovens fastsatte reklamationsfrist hæfter fabrikken eller importøren alene for disse ydelser, herunder også garanti på stel og forgaffel.
            </p>

            <h6 className="primary-text title">Bytte regler</h6>
            <p className="primary-text body-1">
              Vi bytter alle nye og ikke ibrugtagene varer i 14 dage efter købs dato mod forevisning af gyldig kvittering, til et tilgodebevis eller penge retur. Dette gælder ikke bestilte varer.
            </p>
            </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

      </div>

    )
  }
}

export default ComplaintsAndReturnPolicies;
