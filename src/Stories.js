import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Stories() {

const showStories = () => {
	return this.props.stories.map(story => <li key={story.id}> <Link to={`/stories/${story.id}`}> {story.author} - {story.title} </Link> </li> )
}


	return (
		<div className="stories">
<div className="storyList">
<h1> Stories and Poems </h1>
<ul>
{showStories()}
</ul>
</div>
		</div>
		)
}

export default Stories