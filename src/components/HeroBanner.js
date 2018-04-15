import React, { Component } from 'react';
import './HeroBanner.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import WelcomeBlurb from '../components/WelcomeBlurb.js';

class HeroBanner extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // NOTE: This can cause a crash if switching quickly from a vc -> b vc

      setTimeout(function(){
         document.getElementById('vid').play();
      }, 1000);
    }

    render() {

      return (
        <div>
          <section className="video-container">
            <video id="vid" src={require('../assets/Lyngby Storcenter - Ritter Cykler-Cqk8SYYRib8.mp4')} muted autoplay loop playsinline></video>
            <div className="callout container">
              <h1 className="white-text text-display-3 dark-primary-text">Din forhandler inden for cykler og cykeludstyr</h1>
              <div>
                <p className="white-text dark-secondary-text text-headline">Vores medarbejdere står klar til at hjælpe dig til at finde det udstyr eller den cykel, der passer netop dig. Hvad enten det er mountainbike, racer eller ny hverdagscykel. Vi rådgiver dig efter dine behov og vores erfaring.</p>
                <i className="white-text medium material-icons">play_circle_filled</i>
              </div>
            </div>
            </section>
        </div>
      );
    }
}

export default HeroBanner;
