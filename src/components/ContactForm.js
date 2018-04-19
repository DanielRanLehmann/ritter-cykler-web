import React, { Component } from 'react';
// import './ContactForm.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import fire from '../fire.js';
import '../extensions/stringFormatting.js';

class ContactForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: null,
        lastName: null,
        email: null,
        subject: "Ukendt Emne",
        message: null,
        successfulFormCompletion: false
      };

      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      // subject is bound in 'componentDidMount'
      this.handleMessageChange = this.handleMessageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      this.$subjectField = $(this.subjectField);
      this.handleSubjectChange = this.handleSubjectChange.bind(this);
      this.$subjectField.on('change', this.handleSubjectChange);

      $(document).ready(function() {
        $('select').material_select();
      });
    }

    handleFirstNameChange = (e) => {
      this.setState({firstName: e.target.value});
    }

    handleLastNameChange = (e) => {
      this.setState({lastName: e.target.value});
    }

    handleEmailChange = (e) => {
      this.setState({email: e.target.value});
    }

    handleSubjectChange = (e) => {
      this.setState({subject: e.target.value});
    }

    handleMessageChange = (e) => {
      this.setState({message: e.target.value});
    }

    handleSubmit(e) {
      e.preventDefault();

      const enquiryData = {
        "createdAt": new Date().getTime(),
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "subject": this.state.subject.capitalize(),
        "message": this.state.message
      }

      this.props.handleSubmit(e, enquiryData);

    }

    render() {

      if (this.props.successfulFormCompletion) {
        return (
          <div>
            <h6 className="text-primary text-title-2 text-bold">Tak! Din besked er sendt</h6>
            <p className="text-secondary text-body">Du kan forvente en svartid på 1-2 arbejdsdage.</p>
          </div>
        );
      }

      var sendBtn = null;
      if (this.state.firstName && this.state.lastName && this.state.email && this.state.message) {
        sendBtn = <button className="z-depth-0 green accent-3 waves-effect waves-light btn" type="submit" name="action">Send</button>
      } else {
        sendBtn = <button className="disabled z-depth-0 green accent-3 waves-effect waves-light btn" type="submit" name="action">Send</button> 
      }

      return (
        <div>
          <h6 className="text-primary text-title-2 text-bold">Send os en besked</h6>
          <p className="text-secondary text-body">Du kan forvente en svartid på 1-2 arbejdsdage.</p>

          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input value={this.state.firstName} onChange={this.handleFirstNameChange} id="first_name" type="text" className="validate"/>
                <label htmlFor="first_name">Fornavn *</label>
              </div>
              <div className="input-field col s6">
                <input value={this.state.lastName} onChange={this.handleLastNameChange} id="last_name" type="text" className="validate"/>
                <label htmlFor="last_name">Efternavn *</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="validate" required="" aria-required="true"/>
                <label htmlFor="email" data-error="Ugyldig email">Email *</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <select ref={subjectField => this.subjectField = subjectField} defaultValue={this.state.subject}>
                  <option value="spørgsmål" selected>Spørgsmål</option>
                  <option value="regning">Regning</option>
                  <option value="andet">Andet</option>
                </select>
                <label>Emne</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <textarea value={this.state.message} onChange={this.handleMessageChange} id="message-field" className="materialize-textarea" required="" aria-required="true"></textarea>
                <label htmlFor="message-field">Besked *</label>
              </div>
            </div>

            { sendBtn }

          </form>

        </div>
      );
    }
}

export default ContactForm;
