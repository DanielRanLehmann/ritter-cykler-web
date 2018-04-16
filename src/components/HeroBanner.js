import React, { Component } from 'react';
import './HeroBanner.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import WelcomeBlurb from '../components/WelcomeBlurb.js';

/*
<div>
  <section className="video-container">
    <video id="vid" src={require('../assets/Lyngby Storcenter - Ritter Cykler-Cqk8SYYRib8.mp4')} muted autoplay loop playsinline></video>
    <div className="callout container">
      <h1 className="text-large-title-ax1 text-thin text-dark-primary">Din forhandler inden for cykler og cykeludstyr</h1>
      <div>
        <p className="white-text text-dark-primary text-title-3">Vores medarbejdere står klar til at hjælpe dig til at finde det udstyr eller den cykel, der passer netop dig. Hvad enten det er mountainbike, racer eller ny hverdagscykel. Vi rådgiver dig efter dine behov og vores erfaring.</p>
        <i className="white-text medium material-icons">play_circle_filled</i>
      </div>
    </div>
    </section>
</div>
*/

class HeroBanner extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // NOTE: This can cause a crash if switching quickly from a vc -> b vc
      /*
      setTimeout(function(){
         document.getElementById('vid').play();
      }, 1000);
      */

      $(document).ready(function(){
        $('.parallax').parallax();
      });

    }

    render() {

      return (
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br></br>
              <br></br>
              <h1 className="center text-large-title-ax1 text-thin text-dark-primary">Din forhandler inden for cykler og cykeludstyr</h1>
              <div className="row center">
                <p className="white-text text-dark-primary text-title-3">Vores medarbejdere står klar til at hjælpe dig til at finde det udstyr eller den cykel, der passer netop dig.<br/> Hvad enten det er mountainbike, racer eller ny hverdagscykel.<br/> Vi rådgiver dig efter dine behov og vores erfaring.</p>
              </div>
            </div>
          </div>
          <div className="parallax">
            <img src={this.props.imgSrc} alt="Unsplashed background img 1"/>
          </div>
        </div>
      );
    }
}

export default HeroBanner;
