import React from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login'
import Profile from './Profile'
import NavBar from './NavBar'
import Stories from './Stories'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Locations from './Locations'
import Heroes from './Heroes'
import StoryContainer from './StoryContainer'
import GodPage from './GodPage'
import LocationPage from './LocationPage'


class App extends React.Component {

	state = {
		current_user: '',
		logged_in: false,
		stories: [],
		gods: [],
		locations: []
	}

componentDidMount() {
fetch('http://localhost:3000/api/v1/stories')
	.then(resp => resp.json())
	.then(storyList => {
		console.log(storyList)
		this.setState ({ stories: storyList})
	})
fetch('http://localhost:3000/api/v1/gods')
	.then(resp => resp.json())
	.then(godsList => {
		console.log(godsList)
		this.setState ({ gods: godsList})
	})
fetch('http://localhost:3000/api/v1/locations')
    .then(resp => resp.json())
    .then(allLocations => {
      this.setState({ locations: allLocations})
    }) 

}	


signUp = (sentState) => {
	let newUser = {...sentState, avatar: 'www.google.com', fav_god: 'Zeus', location: 'NYC'}
fetch('http://localhost:3000/api/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    user: newUser
  })
})
  .then(r => r.json())
  .then(data => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          this.getProfileFromServer()
        } else {
          alert("Your info doesn't match our records; please try again.");
        }
  })
}

  getProfileFromServer = () => {
    if (localStorage.token) {
      fetch("http://localhost:3000/api/v1/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(profileData => {
          this.setState({
            current_user: profileData.user,
            logged_in: true
          });
        });
    }
  };


logOut = () => {
	this.setState({ current_user: '', logged_in: false })
}

logIn = (sentState) => {
fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({user: sentState})
    })
      .then(res => res.json())
      .then(data => {
      	console.log(data)
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          this.getProfileFromServer()
        } else {
          alert("Your info doesn't match our records; please try again.");
        }
      });

}

render() {

  return (
    		<div>
    		<NavBar user={this.state.current_user} loggedIn={this.state.logged_in} />
      		{this.state.logged_in ? null : <Signup signUp={this.signUp} /> }
      		{this.state.logged_in ? null : <Login logIn={this.logIn}/> }
   		    
   		   	<Route exact path='/stories' 
   		    	   render={routerProps => (
   		    	   	<Stories stories={this.state.stories} {...routerProps} />
   		    	   	)} />
			<Route exact path='/locations' 
   		    	   render={routerProps => (
   		    	   	<Locations locations={this.state.locations} {...routerProps} />
   		    	   	)} />
   		   	<Route exact path="/locations/:locationId"
   		   			render={routerProps => (
   		   			<LocationPage allLocations={this.state.locations} {...routerProps} />
   		   			)}
   		   			/>
   		    <Route exact path='/gods' 
   		    	   render={routerProps => (
   		    	   	<Heroes gods={this.state.gods} {...routerProps} />
   		    	   	)} />
   		   	<Route exact path="/stories/:storyId"
   		   			render={routerProps => (
   		   			<StoryContainer myUser={this.state.current_user} allStories={this.state.stories} {...routerProps} />
   		   				)}
   		   			  />
   		   	<Route exact path="/gods/:godId"
   		   			render={routerProps => (
   		   			<GodPage pantheon={this.state.gods} {...routerProps} />
   		   			)}
   		   			/>
   		   	<Route exact path="/profile"
   		   			render={routerProps => (
   		   			<Profile user={this.state.current_user} logOut={this.logOut} {...routerProps} />
   		   			)}
   		   			/>
    		</div>
  		);
	}
}

export default App;
