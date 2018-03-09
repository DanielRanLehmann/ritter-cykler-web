import React, { Component } from 'react';
import './Brands.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import HeaderView from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/HeaderView.js';
import FAB from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/FloatingActionButton.js';

import BrandsGridList from '/Users/danielranlehmann/Desktop/ritter-cykler-web/src/components/BrandsGridList.js';

class Brands extends Component {

  componentDidMount() {
      $( document ).ready(function(){

      });

  }

  render() {
    return (

      <div>

        <HeaderView
          title={ "Mærker" }
          subtitle={ "Vi fører følgende mærker i butikken"}
        />

        <div className="section white">
          <div className="container">
            <BrandsGridList tiles={[
              {
                "imageSrc": "http://localhost:3000/images/brands/colnago-logo.png",
                "title": "Colnago",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/pinarello-logo.png",
                "title": "Pinarello",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/principia-logo.png",
                "title": "Principia",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/trek-logo.png",
                "title": "Trek",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/fondriest-logo.png",
                "title": "Fondriest",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/giro-logo.png",
                "title": "Giro",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/mbk-logo.png",
                "title": "MBK",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/cube-logo.png",
                "title": "Cube",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/limar-logo.png",
                "title": "Limar",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/reynolds-logo.png",
                "title": "Reynolds",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/nutcase-logo.png",
                "title": "Nutcase",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/bell-logo.png",
                "title": "Bell",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/ritterplus-logo.png",
                "title": "Ritter Plus",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/mavic-logo.png",
                "title": "Mavic",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/sidi-logo.png",
                "title": "Sidi",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/nalini-logo.png",
                "title": "Nalini",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/spinergy-logo.png",
                "title": "Spinergy",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/zipp-logo.png",
                "title": "Zipp",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/oakley-logo.png",
                "title": "Oakley",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/garmin-logo.png",
                "title": "Garmin",
                "href": "apple.com"
              },
              {
                "imageSrc": "http://localhost:3000/images/brands/bontrager-logo.png",
                "title": "Bontrager",
                "href": "apple.com"
              }
            ]}
            />
          </div>
        </div>
        <div className="divider"></div>
      </div>
    );
  }
}

export default Brands;
