import React, { Component } from 'react'
import Slider from 'react-slick'

import './Carousel.css'

function NextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'clear'}}
      onClick={onClick}
    ><i className="grey-text material-icons small">chevron_right</i></div>
  );
}

function PrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'clear'}}
      onClick={onClick}
    ><i className="grey-text material-icons small">chevron_left</i></div>
  );
}

class Carousel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nav1: null
    }
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1
    })
  }

  render() {
    var settings = {
      adaptiveHeight: false,
      focusOnSelect: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      lazyLoad: false,
      centerMode: false
    };

    return (
      <div style={{"paddingTop": "25px", "paddingLeft": "25px", "paddingRight": "25px"}}>
        <Slider {...settings}
            ref={slider => this.slider1 = slider}
            >
            {
              this.props.imageURLs.map((imageURL) =>
              <div className="c"><img height="512px" style={{"max_height": "512px", "object-fit": "cover", "overflow": "hiddden"}} src={imageURL}/></div>
              )
            }
          </Slider>
      </div>
    );
  }
}

export default Carousel;
