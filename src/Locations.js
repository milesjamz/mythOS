import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

class Locations extends React.Component {


render() {



	return (
<div className="locations">
list of locations ...
<ul>
{this.props.locations.map((location, index) => <li key={index}> <Link to={`locations/${location.id}`}> {location.name} </Link> </li> ) }
</ul>

 <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyACBWETZZQkB83El_5GcM3i90HD7t_R-to"
      >
  <div className="grandMap">
  <GoogleMap
    id="circle-example"
    mapContainerStyle={{
      height: "500px",
      width: "410px"
    }}
    zoom={5}
    center={{
      lat: 37.9838,
      lng: 23.7275
    }}>
  {this.props.locations.map((location, index) => <Marker 
                                      key={index}
                                      position={{ lat: parseFloat(location.lattitude), 
                                           lng: parseFloat(location.longitude) }} 
                                      />
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