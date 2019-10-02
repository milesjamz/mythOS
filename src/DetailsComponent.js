import React from 'react';

class DetailsComponent extends React.Component {

render() {

const itsAGod = () => {
	return (
		<div className="godDetail">
<img src={require(`./images/${this.props.clickedThing.name.toLowerCase()}.jpg`)} className="godPic" alt="da god" width="200" height="400" /><br />
<h1> Name: {this.props.clickedThing.name} </h1>
<p> <strong> Known in Rome as:</strong> {this.props.clickedThing.roman_name}  </p>
<p /> Rules Over: <ul>{this.props.clickedThing.rules.map((rule, index) => <li key={index}> {rule} </li> ) } </ul> 
<p /> Symbols: <ul>{this.props.clickedThing.symbols.map((symbol, index) => <li key={index}> {symbol} </li> ) } </ul> 
<p /> Animals: <ul>{this.props.clickedThing.animals.map((animal, index) => <li key={index}> {animal} </li> ) } </ul>
		</div>
		)
}


const itsALocation = () => {
	return (
		<div className="locationDetail">
<img src={require(`./images/${this.props.clickedThing.image}`)} className="locPic" alt="location" width="300" height="300" /><br />
<h1> Name: {this.props.clickedThing.name} </h1>
<h3> Description: </h3>
{this.props.clickedThing.description}
		</div>
		)
}

const isItGodOrLocation = () => {
	if(this.props.clickedThing.gender) {return itsAGod()} else if(this.props.clickedThing.longitude) {return itsALocation()}
}

	return (
		<div className="detailsComponent">
			{isItGodOrLocation()}
		</div>
		)
	}
}

export default DetailsComponent