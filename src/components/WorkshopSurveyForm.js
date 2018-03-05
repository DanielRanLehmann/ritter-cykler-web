import React, { Component } from 'react';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function GoodCheckboxesForm(props) {
  return (
    <form action="#">
      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="good-1" />
        <label htmlFor="good-1">{props.checkBoxLabels["good-1"]}</label>
      </p>

      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="good-2" />
        <label htmlFor="good-2">{props.checkBoxLabels["good-2"]}</label>
      </p>

      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="good-3" />
        <label htmlFor="good-3">{props.checkBoxLabels["good-3"]}</label>
      </p>

      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="good-4" />
        <label htmlFor="good-4">{props.checkBoxLabels["good-4"]}</label>
      </p>
    </form>
  );
}

function BadCheckboxesForm(props) {
  return (
    <form action="#">
      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="bad-1" />
        <label htmlFor="bad-1">{props.checkBoxLabels["bad-1"]}</label>
      </p>

      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="bad-2" />
        <label htmlFor="bad-2">{props.checkBoxLabels["bad-2"]}</label>
      </p>

      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="bad-3" />
        <label htmlFor="bad-3">{props.checkBoxLabels["bad-3"]}</label>
      </p>

      <p>
        <input onChange={props.toggleCheckbox} type="checkbox" id="bad-4" />
        <label htmlFor="bad-4">{props.checkBoxLabels["bad-4"]}</label>
      </p>
    </form>
  );
}

function CheckboxesSection(props) {
  if (!props.selectedOption) {
    return null;
  }

  var sectionPrefix = null;
  var form = null;
  if (props.selectedOption == "Good") {
    sectionPrefix = "Super fedt!";
    form = <GoodCheckboxesForm checkBoxLabels={props.checkBoxLabels} toggleCheckbox={props.toggleCheckbox} />;
  } else if (props.selectedOption == "Bad") {
    sectionPrefix = "Det er vi kede af at høre.";
    form = <BadCheckboxesForm checkBoxLabels={props.checkBoxLabels} toggleCheckbox={props.toggleCheckbox}/>;
  }

  return (
    <div>
      <h4 className="primary-text body-2">{sectionPrefix} Kan du fortælle mere om din oplevelse?</h4>
      {form}
    </div>
  );
}

class WorkshopSurveyForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
      surveyId: props.surveyId,
      selectedOption : null,
      checkedBoxes: new Set(),
      descriptionText: null,
      isSurveyCompleted: false,
      successfulSurveyCompletion: false
    };

    this.checkedBoxes = new Set();

    this.checkBoxLabels = {
      "good-1": "Reparationen gik hurtigt",
      "good-2": "Priserne er gode",
      "good-3": "Jeg kunne hurtigt komme i kontakt med jer",
      "good-4": "Andet",
      "bad-1": "Reparationen gik alt for langsomt",
      "bad-2": "Priserne er alt for høje",
      "bad-3": "Jeg havde svært ved at bestille en tid",
      "bad-4": "Andet"
    }

    this.handleGoodInputChange = this.handleGoodInputChange.bind(this);
    this.handleBadInputChange = this.handleBadInputChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    // a test binding
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGoodInputChange(e) {
    this.checkedBoxes = new Set();
    this.setState({selectedOption: "Good", checkedBoxes: this.checkedBoxes});
  }

  handleBadInputChange(e) {
    this.checkedBoxes = new Set();
    this.setState({selectedOption: "Bad", checkedBoxes: this.checkedBoxes});
  }

  handleDescriptionChange(e) {
    this.setState({descriptionText: e.target.value});
  }

  toggleCheckbox(e) {
    const targetCheckBoxId = e.target.id;
    if (e.target.id in this.checkBoxLabels) {
      const label = this.checkBoxLabels[targetCheckBoxId];
      if (this.checkedBoxes.has(label)) {
        this.checkedBoxes.delete(label);
      } else {
        this.checkedBoxes.add(label);
      }

      this.setState({checkedBoxes: this.checkedBoxes});
      console.log(this.checkedBoxes);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const surveyData = {
      "name": ""
    }

    const responseData = {
      "createdAt": new Date().getTime(),
      "overallService": this.state.selectedOption === "Good" ? "God" : "Dårlig",
      "followupCheckedBoxes": Array.from(this.state.checkedBoxes),
      "comment": this.state.descriptionText,
    }

    // verify surveyResponse object?
    /*
    fire.database().ref('/surveys/' + this.state.surveyId + "/totalResponses").once('value').then((snapshot) => {
      const totalResponses = snapshot.val();

      var newResponseKey = fire.database().ref().child('survey-responses').push().key;

      var updates = {};
      updates['/surveys/' + this.state.surveyId + "/totalResponses"] = totalResponses + 1;
      updates['/survey-responses/' + this.state.surveyId + '/' + newResponseKey] = responseData;
      fire.database().ref().update(updates).then(() => {
        this.setState({ isSurveyCompleted: true, successfulSurveyCompletion: true});

      }).catch(function(error) {
        this.setState({ isSurveyCompleted: true, successfulSurveyCompletion: false});
      });
    });
    */
  }

  render() {

    if (this.state.isSurveyCompleted) {
      if (this.state.successfulSurveyCompletion) {
        return (
          <div>
            <div className="divider"></div>
            <div className="section">
              <h4 className="primary-text body-2">Tak for din feedback!</h4>
              <p className="primary-text body-1">Vi vil bruge denne information til at forbedre vores service yderligere.</p>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="divider"></div>
            <div className="section">
              <h4 className="primary-text body-2">Ups! Der opstod en fejl</h4>
              <p className="primary-text body-1">Prøv at genindlæs siden og prøv at indsend din feedback igen.</p>
            </div>
          </div>
        );
      }
    }

    var submitBtn = <a id="submit-survey-btn" className="disabled z-depth-0 green accent-3 waves-effect waves-light btn">Send</a>;
    if (this.state.selectedOption || (this.state.descriptionText && this.state.descriptionText.length > 0)) {
      submitBtn = <a onClick={this.handleSubmit} id="submit-survey-btn" className="z-depth-0 green accent-3 waves-effect waves-light btn">Send</a>;
    }

    return (
      <div className="section">

        <div className="section">
          <h4 className="primary-text body-2">Allerede haft din cykel repareret hos os? Hvad syntes du om den service du fik?</h4>

          <form action="#">
            <p>
              <input onChange={this.handleGoodInputChange} className="with-gap" name="group3" type="radio" id="good-option" />
              <label htmlFor="good-option">God</label>
            </p>

            <p>
              <input onChange={this.handleBadInputChange} className="with-gap" name="group3" type="radio" id="bad-option"/>
              <label htmlFor="bad-option">Dårlig</label>
            </p>
          </form>
        </div>

        <div className="section">
          <CheckboxesSection checkBoxLabels={this.checkBoxLabels} toggleCheckbox={this.toggleCheckbox} selectedOption={this.state.selectedOption}/>
        </div>
        <div className="section">
          <h4 className="primary-text body-2">Er der noget yderligere vi kan gøre for at forbedre vores service?</h4>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <textarea value={this.state.descriptionText} onChange={this.handleDescriptionChange} id="textarea1" className="materialize-textarea" data-length="140"></textarea>
                <label htmlFor="textarea1">Kommentar</label>
              </div>
            </div>
          </form>
          {submitBtn}
        </div>

      </div>
    );
  }
}

export default WorkshopSurveyForm;
