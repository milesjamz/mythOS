import React from 'react';

class Signup extends React.Component {

state = {
	username: '',
	password: ''
}

handleOnChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
}

handleSubmit = (e) => {
  e.preventDefault()
  this.props.signUp(this.state)
  this.setState({ username: '', password: '' })
}

render() {
      return (
        <div className="signupForm">
         <form onSubmit={this.handleSubmit}>
         Sign Up -<br />
         <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username" 
            onChange={this.handleOnChange} 
            required/><br />
         <label>password:</label>
          <input
            type="text"
            value={this.state.password}
            name="password"
            onChange={this.handleOnChange} 
            required/><br />
          <input type="submit" />
         </form>
       </div>
      );
  }
}

export default Signup;
