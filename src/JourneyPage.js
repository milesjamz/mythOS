import React from 'react';
import {   withScriptjs, withGoogleMap, GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api'
import TempleIcon from './images/pixeltemple.png'
import JourneyDescription from './JourneyDescription'

class JourneyPage extends React.Component {
constructor (props) {
    super(props)

    this.state = {
  origin: '',
  destination: '',
  waypoints: '',
  description: '',
  response: null,
  rendered: false
}

    this.directionsCallback = this.directionsCallback.bind(this)

}

  directionsCallback (response) {
    console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState ({ response: response })
      } else {
        console.log('response: ', response)
      }
    }
  }

handleOnClick = (location, index) => {
  console.log(location, index)
  console.log(this.props.user.journey_locations[index])
  this.props.deleteStoryLocation(this.props.user.journey_locations[index])
}

handleOnSubmit = (sentDescription) => {
  fetch(`http://localhost:3000/api/v1/journeys/${this.props.user.journeys[0].id}`, {
    method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({description: sentDescription})
  })
  .then(resp => resp.json())
  .then(parsedResp => {
    this.fetchNewMe(parsedResp.user_id)
    // console.log(parsedResp)
  })
}

fetchNewMe = (id) => {
  fetch(`http://localhost:3000/api/v1/users/${id}`)
  .then(resp => resp.json())
  .then(parsedResp => this.props.updateUser(parsedResp))
}

  componentDidMount() {
if (this.props.user.journeys[0].description) {
  this.setState({ description: this.props.user.journeys[0].description })
}
if (this.props.user.journey_location_locations.length > 1) {
    const waypoints = this.props.user.journey_location_locations.map(jll =>({
        location: {lat: parseFloat(jll.lattitude), lng: parseFloat(jll.longitude), 
        stopver: true },
    }))
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    this.setState( { waypoints: waypoints, origin: origin, destination: destination })
  }
}

render() {
const styles = require('./customMapStyles.json')

  const getLength = () => {
    if(this.state.response) {
    let routeLegs = this.state.response.routes[0].legs.map(leg => leg.distance.value)
      const total = routeLegs.reduce((acc, c) => acc + c, 0);
      if (total) {
        return  "This trip has a length of " + parseInt((total/1000)) + " kilometers, or " + parseInt((total/1000) / 42 ) + " marathons!"
      } else {
        return "You don't have a route length yet."
      }
    // console.log(this.state.response.routes[0].legs)
  }
}


const myLocations = () => {
  return this.props.user.journey_location_locations.map((jlocation, index) => 
   <li key={index}> {jlocation.name} <button onClick={() => this.handleOnClick(jlocation, index)}>X</button></li> )
}

return (
<div className="journeys">
<div className="journeyText">
<h1> My Journey </h1>
<h2>{this.props.user.username}</h2>
<ul>
{myLocations()}
</ul>
<JourneyDescription handleOnSubmit={this.handleOnSubmit}
                    savedDescription={this.props.user.journeys[0].description}
                    />
</div>
<br />
<div className="journeyMap">
 <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyACBWETZZQkB83El_5GcM3i90HD7t_R-to"
      >
  <GoogleMap
    id="journey-map"
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
  {this.props.user.journey_location_locations.map((location, index) => <Marker
                                      id={location.id} 
                                      key={index}
                                      position={{ lat: parseFloat(location.lattitude), 
                                                  lng: parseFloat(location.longitude) }}
                                      icon={TempleIcon} 
                                      >
</Marker>
)}
{
              (
                this.state.destination !== '' &&
                this.state.origin !== '' &&
                this.state.response === null
              ) && (
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destination: this.state.destination,
                    origin: this.state.origin,
                    travelMode: 'WALKING',
                    waypoints: this.state.waypoints
                  }}
                  // required
                  callback={this.directionsCallback}
                  // optional
                  // onLoad={directionsService => {
                  //   console.log('DirectionsService onLoad directionsService: ', directionsService)
                  // }}
                  // optional
                  // onUnmount={directionsService => {
                  //   console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  // }}
                />
              )
            } 
{
               this.state.response !== null && 
                                          (
                <DirectionsRenderer
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: this.state.response
                  }}
                  // optional
                  // onLoad={directionsRenderer => {
                  //   this.setState({ rendered: true })
                  // }}
                  // optional
                  // onUnmount={directionsRenderer => {
                  //   console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  // }}
                />
              )
            }
  </GoogleMap>
      </LoadScript>
{getLength()}
</div>
</div>
		)
	}
}

export default JourneyPage