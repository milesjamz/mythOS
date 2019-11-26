import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Column from './images/column.png'

function NavBar(props) {
  return (
    <div className="navBar">
			<h1><Link to='/'> <span style={{ color:'white' }}>m y t h O S </span></Link> </h1>
	{props.loggedIn ? <span id="inAs"> logged in as <Link to='/profile'>
	<img className="columnPic" src={Column} alt="column" width="27" height="50" /> {props.user.username} </Link> </span> : null }
	{props.loggedIn ? <Link to='/gods'> <img className="columnPic" src={Column} alt="column" width="27" height="50" />Gods and Goddesses </Link> : null }
	{props.loggedIn ? <Link to='/stories'> <img className="columnPic" src={Column} alt="column" width="27" height="50" /> Stories </Link> : null }
	{props.loggedIn ? <Link to='/locations'> <img className="columnPic" src={Column} alt="column" width="27" height="50" /> Locations </Link> : null }
	{props.loggedIn ? <Link to='/journey'> <img className="columnPic" src={Column} alt="column" width="27" height="50" /> Journey </Link> : null }
    </div>
  );
}

export default NavBar;
