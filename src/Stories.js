import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Stories extends React.Component {

render() {

const showStories = () => {
	return this.props.stories.map(story => <Link key={story.id} to={`/stories/${story.id}`}> {story.author} - {story.title} </Link> )
}


	return (
		<div className="Stories">
<h2> ---=== Stories, Myths, Etc. ===--- </h2>
<ul>
{showStories()}
</ul>
		</div>
		)

}


}

export default Stories