import React from 'react';
import DetailsComponent from './DetailsComponent'

function DetailsPage() {

// state = {
// 	clickedThing: ''
// }

// handleGodClick = (e) => {
// 	let clickedGod = this.props.story.gods.find(god => god.id === parseInt(e.target.id) )
// 	this.setState({ clickedThing: clickedGod })
// }

// handleLocationClick = (e) => {
// 	let clickedLocation = this.props.story.locations.find(location => location.id === parseInt(e.target.id) )
// 	this.setState({ clickedThing: clickedLocation })
// }

// render() {

// const showGods = () => {
// return this.props.story.gods.map(god =>  <li key={god.id}> <button id={god.id}
// 																   onClick={this.handleGodClick}>{god.name}</button></li>)
// }

// const showLocations = () => {
// return this.props.story.locations.map(location =>  <li key={location.id}> <button id={location.id}
// 																				  onClick={this.handleLocationClick}>{location.name}</button></li>)
// }
// <ul>
// {showLocations()}
// </ul>

	return (
		<div className="detailsPage">
<DetailsComponent clickedThing={ this.props.clickedThing } />
		</div>
		)
	}
// }

export default DetailsPage