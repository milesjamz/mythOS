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

dropdownTypeChange = (e) => {
this.setState({ filterType: e.target.value });
{this.props.filterChange(e.target.value)}
}

render() {

	return (
		<div className="stories">
<div className="storyList">
<h1> Stories and Poems </h1>
<br />
<select
	value={this.state.filterType}
	onChange={this.dropdownTypeChange}
	>
<option value="id">Sort Stories By:</option>
<option value="author">Alphabetically By Author</option>
<option value="likes">Most Likes</option>
<option value="comments">Most Comments</option>
	</select>
<ul>
{this.showStories()}
</ul>
</div>
		</div>
		)
	}
}

export default Stories