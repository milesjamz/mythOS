import React from 'react';
import DetailsComponent from './DetailsComponent'

function DetailsPage(props) {
	return (
		<div className="detailsPage">
<DetailsComponent clickedThing={ props.clickedThing } />
		</div>
		)
	}

export default DetailsPage