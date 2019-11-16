import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StoryPage from './StoryPage'
import CommentContainer from './CommentContainer'
import StoryMap from './StoryMap'
import DetailsComponent from './DetailsComponent'

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
		<div className="containerBkg">
			<StoryMap handleOnClick={this.handleOnClick} story={thisStory} />
			<StoryPage story={thisStory} user={this.props.myUser}/>
			<DetailsComponent clickedThing={this.state.clickedThing} />
			<CommentContainer story={thisStory} user={this.props.myUser} />
		</div>
		)
	}
}

export default StoryContainer