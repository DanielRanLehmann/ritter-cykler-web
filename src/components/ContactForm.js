import React, { Component } from 'react';
// import './ContactForm.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class ContactForm extends Component {
    constructor(props) {
      super(props);
      this.state = {};

    }

    componentDidMount() {
      this.$subjectField = $(this.subjectField);
      this.handleSubjectChange = this.handleSubjectChange.bind(this);
      this.$subjectField.on('change', this.handleSubjectChange);

      $(document).ready(function() {
        $('select').material_select();
      });
    }

    handleSubjectChange = (e) => {
    this.setState({subject: e.target.value});
  }

    render() {

      return (
        <form>
          <div className="row">
            <div className="input-field col s6">
              <input id="first_name" type="text" className="validate"/>
              <label htmlFor="first_name">Fornavn</label>
            </div>
            <div className="input-field col s6">
              <input id="last_name" type="text" className="validate"/>
              <label htmlFor="last_name">Efternavn</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate"/>
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <select ref={subjectField => this.subjectField = subjectField} defaultValue={this.state.subject}>
                <option value="1">Regning</option>
                <option value="2">Partnerskab</option>
                <option value="3">Spørgsmål</option>
                <option value="4">Andet</option>
              </select>
              <label>Emne</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <textarea id="message-field" className="materialize-textarea"></textarea>
              <label htmlFor="message-field">Besked</label>
            </div>
          </div>

          <a id="product-item-order-btn" className="z-depth-0 green accent-3 waves-effect waves-light btn modal-trigger" href="#modal1">Send</a>
        </form>
      );
    }
}

export default ContactForm;
