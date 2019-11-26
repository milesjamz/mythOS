import React from 'react';

class Profile extends React.Component {

state = {
	likedStories: '',
	current_city: ''
}

// --- loads profile on mounting ---
componentDidMount() {
	fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`)
	.then(resp => resp.json())
	.then(myUser => {
		this.setState({ likedStories: myUser.like_story_names })
	})
}

render() {

	const handleOnClick = () => {
		this.props.history.push("/questionnaire")
	}

	const logOut = () => {
		this.props.history.push("/");
		this.props.logOut();
	}

const showLikes = () => {
if(this.state.likedStories.length > 0) {return this.state.likedStories.map((likedStory, index) => <li key={index}> {likedStory} </li> ) }
			else { return null }
}	

const sendNewUser = (updatedUser) => {
	this.props.updateUser(updatedUser)
}

const getMyLocation = () => {
let thisUser = this.props.user.id
navigator.geolocation.getCurrentPosition(function(position) {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyACBWETZZQkB83El_5GcM3i90HD7t_R-to`)
  .then(resp => resp.json())
  .then(parsedResp => {
  console.log(parsedResp.results[6].formatted_address)
 fetch(`http://localhost:3000/api/v1/users/${thisUser}`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'PATCH',                                                              
  body: JSON.stringify( { location: parsedResp.results[6].formatted_address } )                                        
})
 .then(resp => resp.json())
 .then(newResp => {
 	console.log(newResp)
 	sendNewUser(newResp)
 			 })
		})	
	})
}
	return (
		<div className="profile">
	<img src={require(`${this.props.user.avatar}`)} className="profilePic" 
		 alt="pic" 
		 width="50" 
		 height="100"
		  /><br />
			<strong>User Name:</strong> {this.props.user.username}<br />
			<strong>Favorite God:</strong> {this.props.user.fav_god}<br />
			<button onClick={handleOnClick}> Change Favorite god </button><br />
			<strong>Location:</strong> {this.props.user.location}<br />
			<button onClick={getMyLocation}>Change to my current location</button><br />
			You Like <strong>{this.state.likedStories.length}</strong> Stories:
			<ul>
			{showLikes()}
			</ul> <br />
			<button onClick={logOut}>Log Out</button><br />
		</div>
		)

}


}

export default Profile