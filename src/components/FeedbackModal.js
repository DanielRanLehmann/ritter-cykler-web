import React, { Component } from 'react';
import './FeedbackModal.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

// import fire from '../fire.js';
import * as api from '../api/api.js';

function ProductPreviewCell(props) {
  return (
    <div></div>
  )
}

class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null
    };

    this.handledescriptionChange = this.handledescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // smart cookies built this logic:
  // https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
  detectedOSName() {
    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
    if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";

    return OSName;
  }

  // smart cookies built this logic:
  // https://stackoverflow.com/questions/14573881/why-does-javascript-navigator-appname-return-netscape-for-safari-firefox-and-ch

  detectedBrowser() {
    var name = navigator.userAgent;

    // the order of the conditions matter.
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 )
    {
        name = "Opera";
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        name = "Chrome";
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        name = "Safari";
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 )
    {
         name = "Firefox";
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
        name = "IE";
    }
    else
    {
       name = "Unknown";
    }

    // Blink engine detection
    // https://en.wikipedia.org/wiki/Blink_(web_engine)
    // var isBlink = (isChrome || isOpera) && !!window.CSS;

    return {
      "languageCode": navigator.language,
      "name": name,
      "userAgent": navigator.userAgent,
      "cookiesEnabled": navigator.cookieEnabled,
      "osName": this.detectedOSName()
    }
  }

  handledescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    var locationPath = null;
    if (this.props.locationPath) {
      locationPath = this.props.locationPath;
    }

    const feedbackData = {
      "browser": this.detectedBrowser(),
      "createdAt": new Date().getTime(),
      "languageCode": "da",
      "anonymousFeedback": true,
      "description": this.state.description,
      "locationPath": locationPath
    }

    api.sendFeedback(feedbackData, success => {
      if (success) {
        Materialize.toast("Tak for din feedback!", 4000);
      }
    }).catch(function(error) {
      var $toastContent = $('<span>Ups! Der skete en fejl</span>').add($('<button onClick="this.handleSubmit; class="btn-flat toast-action">Prøv Igen</button>'));
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

    var sendBtn = null;
    if (this.state.description && this.state.description.length > 0) {
      sendBtn = <a onClick={this.handleSubmit} className="modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Send</a>
    } else {
      sendBtn = <a onClick={this.handleSubmit} className="disabled modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Send</a>
    }

    return (
      <div id="feedback-modal" className="white modal modal-fixed-footer z-depth-0">
              <div style={{"paddingLeft": "24px", "paddingRight": "24px", "height": "64px"}} className="grey darken-4 valign-wrapper">
                  <h5 style={{"fontSize": "27px", "fontWeight": "400"}} className="text-dark-primary">Send Feedback</h5>
              </div>

            <div className="modal-content">
              <form className="col s12">
               <div className="row">
                 <div className="input-field col s12">
                    <textarea value={this.state.description} onChange={this.handledescriptionChange} id="descriptionArea" className="materialize-textarea"></textarea>
                    <label htmlFor="descriptionArea">Beskriv dit problem eller del din idé</label>
                 </div>
               </div>
             </form>

            </div>
            <div className="white modal-footer">
              <a  className="modal-action modal-close waves-effect green-text text-accent-3 btn-flat">Annuller</a>
              { sendBtn }
            </div>
          </div>
    );
  }
}

export default FeedbackModal;
