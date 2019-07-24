import React from 'react';

class Profile extends React.Component {

state = {
	likedStories: ''
}

componentDidMount() {
	fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`)
	.then(resp => resp.json())
	.then(myUser => {
		console.log(myUser)
		this.setState({ likedStories: myUser.like_story_names })
	})
}


render() {
	const logOut = () => {
		this.props.history.push("/");
		this.props.logOut();
	}

const showLikes = () => {
if(this.state.likedStories.length > 0) {return this.state.likedStories.map((likedStory, index) => <li key={index}> {likedStory} </li> ) }
			else { return 'You have no liked stories!' }
}	

	return (
		<div className="profile">
			You are logged in as {this.props.user.username}.<br />
			Your location is {this.props.user.location}<br />
			{this.props.user.username} has 0 journeys saved...<br />
			Liked Stories ...
			<ul>
			{showLikes()}
			</ul>
			<button onClick={logOut}>Log Out</button><br />
		</div>
		)

}


}

export default Profile