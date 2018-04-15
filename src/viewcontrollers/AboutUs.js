import React, { Component } from 'react';
import './AboutUs.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import AboutUsBlurb from '../components/AboutUsBlurb.js';
import EmployeeCard from '../components/EmployeeCard.js';
import ReviewCard from '../components/StoreReviewCard.js';

import storeReviewsData from '../assets/property-lists/store-reviews.json';
import employeesData from '../assets/property-lists/employees.json';

class AboutUs extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "Om os - Ritter Cykler";
  }
  render() {

    return (
      <div>
        <div className="black">
          <div className="container">
            <video controls>
              <source src={require('../assets/Lyngby Storcenter - Ritter Cykler-Cqk8SYYRib8.mp4')} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="section white">
          <div className="row container">
            <AboutUsBlurb />
          </div>
        </div>

        <div className="container divider"></div>

        <div className="section">
          <div className="container">
            <h1 className="center primary-text mdc-typography--display1">Medarbejdere</h1>
            <p className="center primary-text mdc-typography--subheading1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <div className="row">
            {
              employeesData.map((employee) =>
              <div className="col s12 m6 l4">
                <EmployeeCard profilePictureURL={employee.picture.large}
                              name={employee.fullName}
                              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              </div>
              )
            }
            </div>
          </div>
        </div>

        <div className="grey lighten-4 section">
          <div className="container">
            <h1 className="center primary-text headline">Mange tilfredse kunder</h1>
            <p className="center primary-text body-1">Et vivendo comprehensam eam</p>
            <div className="row">
              {
                storeReviewsData.map((review) =>
                  <div className="col s12 m6 l4">
                    <ReviewCard
                      starRating={review.starRating}
                      body={review.body}
                      author={review.author}
                    />
                  </div>
                )
              }
          </div>
        </div>

      </div>

      </div>

    )
  }
}

export default AboutUs;
