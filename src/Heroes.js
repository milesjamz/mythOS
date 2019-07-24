import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Heroes extends React.Component {

render() {
let showGods = this.props.gods.map(god => <li key={god.id} > <Link to={`gods/${god.id}`}> {god.name} </Link> </li> )

	return (
		<div className="heroes">
<h2> Gods, Goddesses, and Heroes </h2>
<ul>
{showGods}
</ul>
		</div>
		)

}


}

export default Heroes