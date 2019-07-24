import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NavBar(props) {
  return (
    <div className="navBar">
			<h1> m y t h O S </h1>
	{props.loggedIn ? <span id="inAs">          logged in as <Link to='/profile'>
												{props.user.username} </Link> </span> : null }
	{props.loggedIn ? <Link to='/gods'>       Gods, Goddesses, and Heroes </Link> : null }
	{props.loggedIn ? <Link to='/stories'>      Stories </Link> : null }
	{props.loggedIn ? <Link to='/locations'>    Locations </Link> : null }

    </div>
  );
}

export default NavBar;
