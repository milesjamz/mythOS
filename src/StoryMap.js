import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

class StoryMap extends Component {

  state = {
    markers: []
  }

componentDidMount() {
console.log(this.props)
this.setState({ markers: this.props.story.locations }) 
}

  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyACBWETZZQkB83El_5GcM3i90HD7t_R-to"
      >
  <div className="storyMap">
  <GoogleMap
    id="circle-example"
    mapContainerStyle={{
      height: "620px",
      width: "410px"
    }}
    zoom={5}
    center={{
      lat: 37.9838,
      lng: 23.7275
    }}>
  {this.state.markers.map((location, index) => <Marker 
                                      key={index}
                                      position={{ lat: parseFloat(location.lattitude), 
                                           lng: parseFloat(location.longitude) }} 
                                      />
                              ) 
}
  </GoogleMap>
  </div>
      </LoadScript>
     )
  }
}

export default StoryMap