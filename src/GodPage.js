import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GodGraphComponent from './GodGraphComponent'
import GodDetails from './GodDetails'

function GodPage(props) {
	let ourHero = props.pantheon.find(god => god.id === parseInt(props.match.params.godId) )
return (
<div className="godShow">
	{ourHero ? <GodGraphComponent nodes={ourHero} /> : null }
		{ourHero ? <GodDetails ourHero={ourHero} /> : null }
</div>
		)
}

export default GodPage