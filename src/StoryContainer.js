import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StoryPage from './StoryPage'
import CommentContainer from './CommentContainer'
import StoryMap from './StoryMap'
import DetailsPage from './DetailsPage'

class StoryContainer extends React.Component {

state = {
clickedThing: '',
}

handleOnClick = (godOrPlace) => {
  this.setState({ 
    clickedThing: godOrPlace 
  })
}

render() {
	let thisStory = this.props.allStories.find(story => story.id === parseInt(this.props.match.params.storyId) )
console.log(this.state)
	return (
		<div className="storyContainer">
			<StoryPage story={thisStory} user={this.props.myUser}/>
			<CommentContainer story={thisStory} user={this.props.myUser} />
			<StoryMap handleOnClick={this.handleOnClick} story={thisStory} />
			<DetailsPage clickedThing={this.state.clickedThing} story={thisStory} />
		</div>
		)
	}
}

export default StoryContainer