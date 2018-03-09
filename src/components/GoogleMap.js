import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

const GoogleMapConfig = {
	key: "AIzaSyAyaFMZLf12RclvrGaN-ZMUoWCtAIIrJOk"
};

class GoogleMap extends React.Component {
  static defaultProps = {
    center: {lat: 55.772158, lng: 12.5058311},
    zoom: 17
  };

  render() {
    return (
       <GoogleMapReact
			 	bootstrapURLKeys={GoogleMapConfig}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={55.7721422}
          lng={12.507891}
          text={'Ritter Cykler'}
        />
      </GoogleMapReact>
    );
  }
}

export default GoogleMap;
