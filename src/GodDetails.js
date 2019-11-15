import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function GodDetails(props) {
return (
<div className='godDeets'>
<h1> Name: {props.ourHero.name} </h1>
<p> <strong> Known in Rome as:</strong> {props.ourHero.roman_name}  </p>
<p /> <strong> Associated Locations: </strong>
<ul> 
{props.ourHero.locations.map((location, index) => <li key={index}> <Link to={`../locations/${location.id}`}> {location.name} </Link> </li> )}
</ul>
<h2> Featured in: </h2>
<ul>
{props.ourHero.stories.map((story, index) => <li key={index}> <Link to={`../stories/${story.id}`}> {story.title} </Link> </li> ) }
</ul>
<p /> Rules Over: <ul>{props.ourHero.rules.map((rule, index) => <li key={index}> {rule} </li> ) } </ul> 
<p /> Symbols: <ul>{props.ourHero.symbols.map((symbol, index) => <li key={index}> {symbol} </li> ) } </ul> 
<p /> Animals: <ul>{props.ourHero.animals.map((animal, index) => <li key={index}> {animal} </li> ) } </ul>
	</div>
		)

}

export default GodDetails