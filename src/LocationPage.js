import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LocationPage extends React.Component {


render() {
	let theSpot = this.props.allLocations.find(location => location.id === parseInt(this.props.match.params.locationId) )
	console.log(theSpot)
	return (
		<div className="locationShow">
<img src={require(`./${theSpot.image}`)} alt="my image" width="500" height="500" /><br />
<h1> Name: {theSpot.name} </h1>
<h2> Associated Gods: </h2>
<ul>
{theSpot.gods.map((god, index) => <li key={god.id} > <Link to={`../gods/${god.id}`}> {god.name} </Link> </li> ) }
</ul>
<h3> Description: </h3>
{theSpot.description}
		</div>
		)
	}
}

export default LocationPage