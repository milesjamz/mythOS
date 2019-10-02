import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GodGraphComponent from './GodGraphComponent'

class GodPage extends React.Component {

render() {
	let ourHero = this.props.pantheon.find(god => god.id === parseInt(this.props.match.params.godId) )
// console.log(ourHero)
	return (
		<div className="godShow">
<div className='godDeets'>
<h1> Name: {ourHero.name} </h1>
<p> <strong> Known in Rome as:</strong> {ourHero.roman_name}  </p>
<p /> <strong> Associated Locations: </strong>
<ul> 
{ourHero.locations.map((location, index) => <li key={index}> <Link to={`../locations/${location.id}`}> {location.name} </Link> </li> )}
</ul>
<h2> Featured in: </h2>
<ul>
{ourHero.stories.map((story, index) => <li key={index}> <Link to={`../stories/${story.id}`}> {story.title} </Link> </li> ) }
</ul>
<p /> Rules Over: <ul>{ourHero.rules.map((rule, index) => <li key={index}> {rule} </li> ) } </ul> 
<p /> Symbols: <ul>{ourHero.symbols.map((symbol, index) => <li key={index}> {symbol} </li> ) } </ul> 
<p /> Animals: <ul>{ourHero.animals.map((animal, index) => <li key={index}> {animal} </li> ) } </ul>
</div>
{ourHero ? <GodGraphComponent nodes={ourHero} /> : null }
		</div>
		)

}


}

export default GodPage