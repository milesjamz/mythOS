import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Stories extends React.Component {

state = {
	filter: '',
	filterType: ''
}

showStories = () => {
	return this.props.stories.map(story => <li key={story.id}> <Link to={`/stories/${story.id}`}> {story.author} - {story.title} </Link> </li> )
}

analyticsOne = () => {
	console.log( this.props.stories.sort((a,b) => (a.likes > b.likes) ? 1 : -1 ) )
}

analyticsTwo = () => {
	console.log( this.props.stories.sort((a,b) => (a.comments > b.comments) ? 1 : -1 ) )
}

dropdownTypeChange = (e) => {
this.setState ({ filterType: e.target.value})
}

render() {

	return (
		<div className="stories">
<div className="storyList">
<h1> Stories and Poems </h1>
<select
	value={this.state.filterType}
	onChange={this.dropdownTypeChange}
	>
<option value="reset">Sort Stories By:</option>
<option value="comments">Most Liked</option>
<option value="likes">Most Commented</option>

	</select>
<ul>
{this.showStories()}
</ul>
<br />
</div>
		</div>
		)
	}
}

export default Stories