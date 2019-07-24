import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StoryPage from './StoryPage'
import CommentContainer from './CommentContainer'
import StoryMap from './StoryMap'
import DetailsPage from './DetailsPage'

class StoryContainer extends React.Component {

render() {
	let thisStory = this.props.allStories.find(story => story.id === parseInt(this.props.match.params.storyId) )

	return (
		<div className="storyContainer">
			<StoryPage story={thisStory} user={this.props.myUser}/>
			<CommentContainer story={thisStory} user={this.props.myUser} />
			<StoryMap story={thisStory} />
			<DetailsPage story={thisStory} />
		</div>
		)
	}
}

export default StoryContainer