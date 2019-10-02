import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import TempleIcon from './images/pixeltemple.png'

class StoryMap extends Component {

  state = {
    markers: [],
  //   activeMarker: {},
  //   isOpen: false
  }

componentDidMount() {
console.log(this.props)
this.setState({ markers: this.props.story.locations }) 
}


// handleOnClick = (e, location) => {
//   this.setState({ 
//     activeMarker: location, 
//     isOpen: true 
//   })
// }

  render() {
const styles = require('./customMapStyles.json')
    const showGods = () => {
return this.props.story.gods.map(god =>  <li key={god.id}> <button id={god.id}
                                           onClick={() => this.props.handleOnClick(god) }>{god.name}</button></li>)
}
     return (
      <div className="storyMap">
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyACBWETZZQkB83El_5GcM3i90HD7t_R-to"
      >
  <GoogleMap
      options={{
      styles: styles
    }}
    id="story-map"
    mapContainerStyle={{
      height: "100%",
      width: "100%"
    }}
    zoom={5}
    center={{
      lat: 37.9838,
      lng: 23.7275
    }}>
  {this.state.markers.map((location, index) => <Marker
                                      onClick={ () => this.props.handleOnClick(location)} 
                                      key={index}
                                      position={{ lat: parseFloat(location.lattitude), 
                                                  lng: parseFloat(location.longitude) }} 
                                      icon={TempleIcon} 
                                      />
                          )}
  </GoogleMap>
      </LoadScript>
<p>Gods, Goddesses and Heroes featured in this story: </p>
<ul>
{showGods()}
</ul>
        </div>
     )
  }
}

export default StoryMap