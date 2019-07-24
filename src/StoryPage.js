import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class StoryPage extends React.Component {

state = {
	liked: false,
	likes: 0,
	likeToDelete: ''
}

componentDidMount() {
	fetch('http://localhost:3000/api/v1/likes')
		.then(resp => resp.json())
		.then(likeList => {
			// console.log(likeList)
			let myLikes = likeList.filter(like => like.story_id === this.props.story.id)
			let isLiked = myLikes.find(like => like.user_id === this.props.user.id)
			this.setState({ likes: myLikes.length })
			isLiked ? this.setState({ liked: true }) : this.setState ({ liked: false })
		})
}


render() {

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

const zeusy = <a href={"www.google.com"}>Zeus</a>
const showSubbedContent = this.props.story.content.split("Zeus").join(zeusy)
console.log(this.props.story.content)
console.log(this.props.story.content.split("Zeus"))
// .map(text => {
	// return <a href={'www.google.com'}>{text}</a>
// })
// <a href={'www.google.com'}>" Zeus "</a> )
// }

// const result = this.props.text.split(':').map(t => {
//   return <div className='textItem'>{t}</div>;
// });



const doYouLikeMe = () => {
	if(this.state.liked === true ) { return 'You Like This Story!' } else { return null }
}

	return (
		<div className="storyShow">
<h1> {this.props.story.title} </h1>
<h3> {this.state.likes} people like this </h3>
<h2> by {this.props.story.author} </h2><br />
{doYouLikeMe()}
<button 
	onClick={handleOnClick}> {this.state.liked ? 'un-like this story' : 'like this story' }</button><br />
 {showSubbedContent}
		</div>
		)

}


}

export default StoryPage