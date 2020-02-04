import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import TempleIcon from './images/pixeltemple.png'


class Locations extends React.Component {

state = {
    markers: [],
    activeMarker: '',
    isOpen: false
}

handleAddLocation = (location) => {
  const newJourneyLocation = {
    journey_id: this.props.user.journeys[0].id,
    location_id: location.id
  }
    fetch('http://localhost:3000/api/v1/journey_locations', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
            },
          body: JSON.stringify({
          journey_location: newJourneyLocation
      })
    })
  .then(r => r.json())
  .then(data => {
    this.props.addToJourney()
    this.onToggle()
  })
}

handleOnClick = (location) => {
// --- opens the infowindow ---
  this.setState({ 
    activeMarker: location, 
    isOpen: true 
  }) 
}

onToggle = () => {
// --- closes the infowindow ---
  this.setState({ isOpen: false })
}

render() {
const styles = require('./customMapStyles.json')

	return (
<div>

 <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      >
  <div className="grandMap">
  <GoogleMap
    id="grand-map"
    options={{
      styles: styles
    }}
    mapContainerStyle={{
      height: "100%",
      width: "100%"
    }}
    zoom={5}
    center={{
      lat: 37.9838,
      lng: 23.7275
    }}

    >
  {this.props.locations.map((location, index) => <Marker
                                      id={location.id}
                                      onClick={ () => this.handleOnClick(location) } 
                                      key={index}
                                      position={{ lat: parseFloat(location.lattitude), 
                                                  lng: parseFloat(location.longitude) }}
                                      icon={TempleIcon} 
                                      >
{this.state.isOpen && this.state.activeMarker.id === location.id ? <InfoWindow 
                    position={{ lat: parseFloat(location.lattitude), 
                                lng: parseFloat(location.longitude) }}
                      onCloseClick={ ()=>this.onToggle()}>
                                    <div> <Link to={`locations/${location.id}`}> {location.name} </Link>
                                    <button 
                                    style={{float:'right'}}
                                    onClick={() => this.handleAddLocation(location) }
                                    >Add this to your journey</button>
                                    <p />{location.description}
                                    </div></InfoWindow> : null }
</Marker>
                              ) 
}

  </GoogleMap>
  </div>
      </LoadScript>
		</div>
		)

}


}

export default Locations