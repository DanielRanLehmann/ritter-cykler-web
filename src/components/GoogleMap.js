import React, { Component } from 'react'
import GoogleMapReact, {Marker} from 'google-map-react'

const GoogleMapConfig = {
	key: "AIzaSyAyaFMZLf12RclvrGaN-ZMUoWCtAIIrJOk"
};

class GoogleMap extends React.Component {
  static defaultProps = {
    center: {lat: 55.772158, lng: 12.5058311},
    zoom: 17
  };

	renderMarkers(map, maps) {
		let marker = new maps.Marker({
			position: {lat: 55.772151, lng: 12.508030},
			map,
			title: 'Ritter Cykler'
		});
	}

  render() {
    return (
       <GoogleMapReact
			 	bootstrapURLKeys={GoogleMapConfig}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
				onGoogleApiLoaded={({map, maps}) =>
						this.renderMarkers(map, maps)
				}
      >
      </GoogleMapReact>
    );
  }
}

export default GoogleMap;
