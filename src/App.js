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
import Landing from './Landing'
import JourneyPage from './JourneyPage'
import Questionnaire from './Questionnaire'


class App extends React.Component {

	state = {
		current_user: '',
		logged_in: false,
		stories: [],
    locations: [],
		gods: [],
    godTypes: [],
    searchedGods: [],
    filteredGods: []
	}

componentDidMount() {
fetch('http://localhost:3000/api/v1/stories')
	.then(resp => resp.json())
	.then(storyList => {
		this.setState ({ stories: storyList})
	})
fetch('http://localhost:3000/api/v1/gods')
	.then(resp => resp.json())
	.then(godsList => {
		console.log(godsList)
    const myGodTypes = godsList.map(god => god.god_type)
		this.setState ({ gods: godsList, searchedGods: godsList, filteredGods: godsList, godTypes: 
      [...new Set(myGodTypes)] })
	})
fetch('http://localhost:3000/api/v1/locations')
    .then(resp => resp.json())
    .then(allLocations => {
    	console.log(allLocations)
      this.setState({ locations: allLocations})
    }) 
}	

signUp = (sentState) => {
	let newUser = {...sentState, avatar: './images/zeus.jpg', fav_god: 'Zeus'}
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

checkForJourney = () => {
	if (this.state.current_user.journeys.length === 0) {
		const newJourney = {
			user_id: this.state.current_user.id,
			description: ''
		}
		fetch('http://localhost:3000/api/v1/journeys', {
  			method: 'POST',
  			headers: {
    		'Content-Type': 'application/json',
    		Accept: 'application/json'
  					},
  				body: JSON.stringify({
    			journey: newJourney
  		})
	})
	.then(r => r.json())
	.then(data => {
		console.log(data)
	})
		} else {
		console.log(this.state.current_user.journeys)
	}
}

addToJourney = () => {
	fetch(`http://localhost:3000/api/v1/users/${this.state.current_user.id}`)
	.then(resp => resp.json())
	.then(myInfo => {
		console.log(myInfo)
			this.setState({ current_user: myInfo })
	})
}

deleteStoryLocation = (deletedLocation) => {
	console.log(deletedLocation)
	fetch(`http://localhost:3000/api/v1/journey_locations/${deletedLocation.id}`, {
		method: 'DELETE' })
		.then(resp => resp.json())
		.then(response => console.log(response))
		.catch(err => {
    	console.error(err)
	  		})
		let newJournLocations = this.state.current_user.journey_locations.filter(location => location.id !== deletedLocation.id)
		let newLocationLocations = this.state.current_user.journey_location_locations.filter(location => location.id !== deletedLocation.location_id)
this.setState(prevState => ({
    ...prevState,
    current_user: {
        ...prevState.current_user,
        journey_locations: 
            newJournLocations,
        journey_location_locations:
        	newLocationLocations
    		}
		}
	)
)}

// --- finds gods, also throws easter eggs ---

  searchforGod = formInput => {
    let searchedGods = this.state.gods.filter(god =>
      god.name.toLowerCase().includes(formInput.toLowerCase())
    );
    if (formInput.toLowerCase() === 'credits') {
      alert("This was made in July 2019 by Miles Marillo(me). mythOS was my mod5 final project - I would like to thank my parents, Geraldine and Joe, my lovely girlfried Jessy, my instructors - Kevin and Graham, and all my classmates. This app is dedicated to the blessed memory of Arthur Sternberg. Thanks! -M ") 
      } else if (formInput.toLowerCase() === 'tacocat') {
        alert("I see you, Adityo! Here's my Easter Egg")
      }
    searchedGods.length === 0
      ? alert("We're sorry, no gods by that name reside here-")
      : this.setState({ searchedGods: searchedGods });
  };


// --- when you change your god ---

changeGodAndAvatar = (newGod) => {
 fetch(`http://localhost:3000/api/v1/users/${this.state.current_user.id}`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'PATCH',                                                              
  body: JSON.stringify( { fav_god: newGod,
                          avatar: `./images/${newGod.toLowerCase()}.jpg` } )                                        
})
 .then(resp => resp.json())
 .then(newResp => {
  this.updateUser(newResp)
       })
}

// --- gets your profile from the server ---

  getProfileFromServer = () => {
    if (localStorage.token) {
      fetch("http://localhost:3000/api/v1/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(profileData => {
        	console.log(profileData)
          this.setState({
            current_user: profileData.user,
            logged_in: true
          });
        });
    }
  };


// --- logs out the user ---

logOut = () => {
	this.setState({ current_user: '', logged_in: false })
}

// --- logs in the user ---

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

// --- updates the user --- 

updateUser = (updatedUser) => {
	this.setState({current_user: updatedUser})
}

  dropdownTypeChange = godType => {
    const newFilteredGods = this.state.gods.filter(
      god => god.god_type === godType
    );
    godType === "reset"
      ? this.setState({ filteredGods: this.state.gods })
      : this.setState({ filteredGods: newFilteredGods });
  };

render() {

  return (
    		<div>
    		{this.state.logged_in ? this.checkForJourney() : null }
    		<NavBar user={this.state.current_user} loggedIn={this.state.logged_in} />
      		{this.state.logged_in ? null : <Signup signUp={this.signUp} /> }
      		{this.state.logged_in ? null : <Login logIn={this.logIn}/> }
			{this.state.logged_in ? <Route exact path='/' 
   		    	   render={routerProps => (
   		    	   	<Landing {...routerProps} />
   		    	   	)} /> : null }
   		   	{this.state.logged_in ? <Route exact path='/stories' 
   		    	   render={routerProps => (
   		    	   	<Stories stories={this.state.stories} {...routerProps} />
   		    	   	)} /> : null }
			{this.state.logged_in ? <Route exact path='/locations' 
   		    	   render={routerProps => (
   		    	   	<Locations addToJourney={this.addToJourney} user={this.state.current_user} 
                locations={this.state.locations} {...routerProps} />
   		    	   	)} /> : null }
   		   	{this.state.logged_in ? <Route exact path="/locations/:locationId"
   		   			render={routerProps => (
   		   			<LocationPage allLocations={this.state.locations} {...routerProps} />
   		   			)} /> : null }
   		    {this.state.logged_in ? <Route exact path='/gods' 
   		    	   render={routerProps => (
   		    	   	<Heroes gods={this.state.searchedGods}
                        filterGods={this.state.filteredGods}
                        findGod={this.searchforGod}
                        dropDown={this.state.godTypes}
                        filterChange={this.dropdownTypeChange}
                {...routerProps} />
   		    	   	)} /> : null }
   		   	{this.state.logged_in ? <Route exact path="/stories/:storyId"
   		   			render={routerProps => (
   		   			<StoryContainer myUser={this.state.current_user} allStories={this.state.stories} 
              {...routerProps} />
   		   			)} /> : null }
   		   	{this.state.logged_in ? <Route exact path="/gods/:godId"
   		   			render={routerProps => (
   		   			<GodPage pantheon={this.state.gods} {...routerProps} />
   		   			)} /> : null }
   		   	{this.state.logged_in ? <Route exact path="/profile"
   		   			render={routerProps => (
   		   			<Profile user={this.state.current_user} updateUser={this.updateUser} logOut={this.logOut} 
              {...routerProps} />
   		   			)} /> : null }
   		   	{this.state.logged_in ? <Route exact path="/journey"
   		   			render={routerProps => (
   		   			<JourneyPage user={this.state.current_user} deleteStoryLocation={this.deleteStoryLocation}
   		   			locations={this.state.locations} updateUser={this.updateUser} {...routerProps} />
   		   			)} /> : null }
   		   	{this.state.logged_in ? <Route exact path="/questionnaire"
   		   			render={routerProps => (
   		   			<Questionnaire changeGod={this.changeGodAndAvatar} user={this.state.current_user} 
              {...routerProps} />
   		   			)} /> : null }
    		</div>
  		);
	}
}

export default App;
