import React from 'react'

class JourneyDescription extends React.Component {

state = {
	description: ''
}

handleOnChange = (e) => {
  this.setState({ description: e.target.value })
}

handleOnSubmit = (e) => {
	e.preventDefault()
	this.props.handleOnSubmit(this.state.description)
}

componentDidMount () {
console.log('hellooooo')
console.log(this.props)
	if(this.props.savedDescription) {
		console.log('hellooooo')
		let myDescription = this.props.savedDescription
	this.setState({ description: myDescription })
	}
}
render() {

return (
	<div>
Please, describe your trip!
<form key={this.props.savedDescription} onSubmit={this.handleOnSubmit}>
<textarea
  style={{"width":300, "height":180}}
  value={this.state.description}
  onChange={this.handleOnChange}
/><br />
<button type='submit'>Save your journey</button>
</form>
</div>
		)
	}
}

export default JourneyDescription