import React, { Component } from 'react';
// import './FeedbackModal.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import fire from '../fire.js';

function ProductPreviewCell(props) {
  return (
    <div></div>
  )
}

class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCommentChange = (e) => {
    this.setState({comment: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("look for location right here");
    console.log(this.props.location);

    var hrefLocation = null;
    if (this.props.hrefLocation) {
      hrefLocation = this.props.hrefLocation;
    }

    const feedbackData = {
      "createdAt": new Date().getTime(),
      "languageCode": "da",
      "anonymousFeedback": true,
      "comment": this.state.comment,
      "hrefLocation": hrefLocation,
    }

    const newFeedbackKey = fire.database().ref().child('feedback').push().key;

    const updates = {};
    updates['/feedback/' + newFeedbackKey] = feedbackData;

    fire.database().ref().update(updates).then(() => {
      Materialize.toast("Tak for din feedback!", 4000);

    }).catch(function(error) {
      var $toastContent = $('<span>Ups! Der skete en fejl</span>').add($('<button onClick="this.handleReservation; class="btn-flat toast-action">Prøv Igen</button>'));
      Materialize.toast($toastContent, 10000);
    });
  }

  componentDidMount() {

    $(document).ready(function() {
      // $('select').material_select();
      // $('#textarea1').val('New Text');
      $('.modal').modal();
    });
  }

  render() {

    return (
      <div id="feedback-modal" className="white modal modal-fixed-footer z-depth-0">
            <div className="modal-content">
              <h4 className="primary-text headline">Feedback</h4>
              <p className="secondary-text body-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <form className="col s12">
               <div className="row">
                 <div className="input-field col s12">
                    <textarea value={this.state.comment} onChange={this.handleCommentChange} id="commentArea" className="materialize-textarea"></textarea>
                    <label htmlFor="commentArea">Beskriv dit problem eller del din idé</label>
                 </div>
               </div>

             </form>

            </div>
            <div className="white modal-footer">
              <a  className="modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Annuller</a>
              <a onClick={this.handleSubmit} className="modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Send</a>
            </div>
          </div>
    );
  }
}

export default FeedbackModal;
