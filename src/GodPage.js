import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class GodPage extends React.Component {




render() {
	let ourHero = this.props.pantheon.find(god => god.id === parseInt(this.props.match.params.godId) )
console.log(ourHero)
	return (
		<div className="godShow">
<h1> Name: {ourHero.name} </h1>
<h3> Known in Rome as: {ourHero.roman_name} </h3>
<p /> Associated Locations: 
{ourHero.locations.map((location, index) => <li key={index}> <Link to={`../locations/${location.id}`}> {location.name} </Link> </li> )}

<p /> Rules Over: <ul>{ourHero.rules.map((rule, index) => <li key={index}> {rule} </li> ) } </ul> 
<p /> Symbols: <ul>{ourHero.symbols.map((symbol, index) => <li key={index}> {symbol} </li> ) } </ul> 
<p /> Animals: <ul>{ourHero.animals.map((animal, index) => <li key={index}> {animal} </li> ) } </ul> 
		</div>
		)

}


}

export default GodPage