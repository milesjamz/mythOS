import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function LocationPage(props) {

	let theSpot = props.allLocations.find(location => location.id === parseInt(props.match.params.locationId) )
	// console.log(theSpot)
	return (
		<div className="containerBkg">
<img src={require(`./images/${theSpot.image}`)} className="locPic" alt="location" width="350" height="500" style={{float:'left', 'margin-left':'17%'}}/><br />
<div className="locationDeets">
<h1> Name: {theSpot.name} </h1>
<h2> Associated Gods: </h2>
<ul>
{theSpot.gods.map((god, index) => <li key={god.id} > <Link to={`../gods/${god.id}`}> {god.name} </Link> </li> ) }
</ul>
<h2> Featured in: </h2>
<ul>
{theSpot.stories.map((story, index) => <li key={index}> <Link to={`../stories/${story.id}`}> {story.title} </Link> </li> ) }
</ul>
<h3> Description: </h3>
{theSpot.description}
</div>
		</div>
		)
	}
export default LocationPage