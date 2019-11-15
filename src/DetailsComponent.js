import React from 'react';

function DetailsComponent(props) {

const itsAGod = () => {
	return (
		<div className="godDetail">
<img src={require(`./images/${props.clickedThing.name.toLowerCase()}.jpg`)} className="godPic" alt="da god" width="200" height="400" /><br />
<h1> Name: {props.clickedThing.name} </h1>
<p> <strong> Known in Rome as:</strong> {props.clickedThing.roman_name}  </p>
<p /> Rules Over: <ul>{props.clickedThing.rules.map((rule, index) => <li key={index}> {rule} </li> ) } </ul> 
<p /> Symbols: <ul>{props.clickedThing.symbols.map((symbol, index) => <li key={index}> {symbol} </li> ) } </ul> 
<p /> Animals: <ul>{props.clickedThing.animals.map((animal, index) => <li key={index}> {animal} </li> ) } </ul>
		</div>
		)
}


const itsALocation = () => {
	return (
		<div className="locationDetail">
<img src={require(`./images/${props.clickedThing.image}`)} className="locPic" alt="location" width="300" height="300" /><br />
<h1> Name: {props.clickedThing.name} </h1>
<h3> Description: </h3>
{props.clickedThing.description}
		</div>
		)
}

const isItGodOrLocation = () => {
	if(props.clickedThing.gender) {return itsAGod()} else if(props.clickedThing.longitude) {return itsALocation()}
}

	return (
		<div className="detailsComponent">
			{isItGodOrLocation()}
		</div>
		)
	}

export default DetailsComponent