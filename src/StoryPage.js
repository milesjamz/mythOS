import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class StoryPage extends React.Component {

state = {
	liked: false,
	likes: 0,
	likeToDelete: ''
}

// --- loads likes story has ---
componentDidMount() {
	fetch('http://localhost:3000/api/v1/likes')
		.then(resp => resp.json())
		.then(likeList => {
			let myLikes = likeList.filter(like => like.story_id === this.props.story.id)
			let isLiked = myLikes.find(like => like.user_id === this.props.user.id)
			this.setState({ likes: myLikes.length })
			isLiked ? this.setState({ liked: true }) : this.setState ({ liked: false })
		})
}


render() {
// --- adds or deletes like on button click ---
const handleOnClick = () => {
	if(this.state.liked === false) {
	this.setState ({ liked: true, likes: this.state.likes +1 })
	let newLike = {
		user_id: this.props.user.id,
		story_id: this.props.story.id
	}
		fetch('http://localhost:3000/api/v1/likes', {
			method: 'POST',
			headers: {
    			'Content-Type': 'application/json',
    			Accept: 'application/json'
  					 },
  body: JSON.stringify({ like: newLike })
})
  .then(r => r.json())
  .then(response => {
  		console.log(response)})
	} else {
	this.setState ({ liked: false, likes: this.state.likes - 1 })
		fetch('http://localhost:3000/api/v1/likes')
		.then(resp => resp.json())
		.then(likesList => {
		let thisLike = likesList.find(like => like.user_id === this.props.user.id && like.story_id === this.props.story.id)
	
	fetch(`http://localhost:3000/api/v1/likes/${thisLike.id}`, {
		method: 'DELETE'})
		.then(resp => resp.json())
		.then(response => console.log(response))
		.catch(err => {
    	console.error(err)
	  		})
		})
	}
}

let buttonStyle = {
	backgroundColor: 'white'
}

if(this.state.liked) {buttonStyle = {backgroundColor:'red'} }

	return (
		<div className="storyShow">
<h2> {this.props.story.title} </h2>
<h3> by {this.props.story.author} </h3>
<strong> {this.state.likes}</strong> {this.state.likes === 1 ? <span> person likes this </span> : 
	<span> people like this </span> } <br />
<button 
	onClick={handleOnClick}
	style={buttonStyle}> {this.state.liked ? 'un-like this story' : 'like this story' }</button><br />
{this.props.story.content}

		</div>
		)

}


}

export default StoryPage