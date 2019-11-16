import React from 'react';

class Questionnaire extends React.Component {

  state ={
    landAndSea: '0',
    familyOrWild: '0',
    warAndPeace: '0',
    sunOrMoon: '0',
    coolOrTemper: '0'
  }

changeMyGod = (godName) => {
  console.log('assigning you ' + godName )
  this.props.changeGod(godName)
  this.props.history.push("/profile")
}

handleOnSubmit = (e) => {
  e.preventDefault()
    let answers = this.state
      let response = Object.values(answers).join('')

switch (response) {
  case '00000':
    alert('Your new favorite god is Ares, god of War!')
      this.changeMyGod('Ares')
      break;

  case '00001':
    alert('Your new favorite god is Hephaestus, god of Volcanoes and Inventions!')
     this.changeMyGod('Hephaestus')
      break;

  case '01000':
  case '01011':
  case '00010':
    alert('Your new favorite god is Zeus, king of the Gods!')
     this.changeMyGod('Zeus')
      break;
      
  case '00011':
  case '10011':
    alert('Your new favorite goddess is Athena, Goddess of War and Wisdom!')
      this.changeMyGod('Athena')
        break;
  case '10000':
  case '10010':
    alert('Your new favorite god is Poseidon, king of the Oceans!')
     this.changeMyGod('Poseidon')
      break;
  case '01101':
  case '01111':
  case '11111':
    alert('Your new favorite god is Dionysus, God of Wine, Poetry and Song!')
      this.changeMyGod('Dionysus')
        break;
  case '11101':
  case '10100':
    alert('Your new favorite god is Apollo, god of Music and the Sun!')
      this.changeMyGod('Apollo')
        break;
  case '10101':
    alert('Your new favorite goddess is Artemis, goddess of Hunting and the Moon!')
      this.changeMyGod('Artemis')
        break;
  case '00101':
  case '10111':
    alert('Your new favorite goddess is Aphrodite, goddess of Beauty!')
      this.changeMyGod('Aphrodite')
        break;
  case '11011':
    alert('Your new favorite god is Kevin, keep him safe from peanuts!!!')
     this.changeMyGod('Kevin')
      break;
  case '10001':
    alert('Your new favorite goddess is Hera, queen of the Gods!')
      this.changeMyGod('Hera')
        break;
  default:
let randomGod = Math.floor(Math.random() * 4)
if(randomGod === 0) {
  alert('Your new favorite god is Hermes, God of Messengers and Trade!')
  this.changeMyGod('Hermes')
  }
else if(randomGod === 1) {
  alert('Your new favorite goddess is Demeter, Goddess of the Harvest!')
  this.changeMyGod('Demeter')
    }
else if(randomGod === 2) {
  alert('Your new favorite god is Hades, God of the Underworld!')
  this.changeMyGod('Hades')
    }
else if(randomGod === 3) {
  alert('Your new favorite goddess is Hestia, Goddess of the Home!')
  this.changeMyGod('Hestia')
    }
  }
}

handleOnChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}

render() {

return (
<div className="favGodQuestions">
<h3>Welcome, {this.props.user.username}, answer some questions to find the god who is right for YOU!</h3>

        <form onSubmit={this.handleOnSubmit}>
<br />
Question 1 -=- On vacations, do you go to the <span style={{'color':'red'}}>Mountains</span> or 
the <span style={{'color':'blue'}}>Sea</span>?
⛰
<input type="range" 
            value={this.state.landAndSea}
            onChange={this.handleOnChange}
            min="0"
            max="1"
            step="1"
            name="landAndSea" />🌊<br /><br />

Question 2 -=- Do you long for the <span style={{'color':'red'}}>Family Life</span> or the 
<span style={{'color':'blue'}}> Wild Life</span>?
👪
<input type="range" 
            value={this.state.familyOrWild}
            onChange={this.handleOnChange}
            min="0"
            max="1"
            step="1"
            name="familyOrWild" />🍷<br /><br />

Question 3 -=- <span style={{'color':'red'}}>War</span> or <span style={{'color':'blue'}}>Peace</span>?
💂
<input type="range"
            value={this.state.warAndPeace}
            onChange={this.handleOnChange}
            min="0"
            max="1"
            step="1"
            name="warAndPeace" />☮<br /><br />

Question 4 -=- Do you worship the <span style={{'color':'red'}}>Sun</span>, or love the 
<span style={{'color':'blue'}}> Moon</span>?
🌞
<input type="range" 
            value={this.state.sunOrMoon}
            onChange={this.handleOnChange}
            min="0"
            max="1"
            step="1"
            name="sunOrMoon" />🌜<br /><br />

Question 5 -=- Do you have a short <span style={{'color':'red'}}>Temper</span>, or do you play it 
<span style={{'color':'blue'}}> Cool</span>?
⚔
<input type="range" 
            value={this.state.coolOrTemper}
            onChange={this.handleOnChange}
            min="0"
            max="1"
            step="1"
            name="coolOrTemper" />😎<br /><br />          
<input style={{"backgroundColor":'pink', "borderRadius": '8px'}}
        type="submit" 
        value="Submit"
        label="Find the God for you!"
        />
</form>
</div>
		)
	}
}

export default Questionnaire