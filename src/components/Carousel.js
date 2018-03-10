import React, { Component } from 'react';
// import './Carousel.css';

import $ from 'jquery';
import Materialize from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

function CarouselItem(props) {
  return (
    <a className="carousel-item" href={props.href}>
      <img src={props.src}/>
    </a>
  )
}

class Carousel extends Component {
    constructor(props) {
      super(props);

    }

    componentDidMount() {
      $(document).ready(function(){
        $('.carousel').carousel({
          indicators: true,
          fullWidth: true,
          shift: 4,
        });
      });
    }

    render() {
      return (
        <div className="carousel carousel-slider">
          {
            this.props.items.map((item) =>
              <CarouselItem href={item.href} src={item.src}/>
            )
          }
        </div>
      );
    }
}

export default Carousel;
