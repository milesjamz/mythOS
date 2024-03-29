import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchBar from './SearchBar'

class Heroes extends React.Component {

state = {
	searchField: "",
	filterType: "",
  modal:false
}

  handleSubmit = e => {
    e.preventDefault();
    { this.props.findGod(this.state.searchField) }
  };

  handleOnChange = e => {
    this.setState({ searchField: e.target.value });
  };

  dropdownTypeChange = e => {
    this.setState({ filterType: e.target.value });
    { this.props.filterChange(e.target.value) }
  };




  handleOnClick = e => {
    e.preventDefault()
    alert('you clickin on me')
    this.setState({ modal: !this.state.modal })
  }


render() {
  const showGods = () => {
    const theGodsYouWant = this.props.gods.filter(god =>
      this.props.filterGods.includes(god)
    );
    return theGodsYouWant.map(god => <li key={god.id} > <Link to={`gods/${god.id}`}> {god.name} </Link> </li> )
  };
  
	return (
	<div className="godsPage">
		<div className="heroes">
<h1> Gods, Goddesses, and Heroes </h1>
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleOnChange={this.handleOnChange}
          value={this.state.searchField}
        />
  <br/>
  <button onClick={this.handleOnClick}>Add a god</button>
{/* --- opens a modal to add a god --- */}
        <select
          value={this.state.filterType}
          onChange={this.dropdownTypeChange}
        >
          <option value="reset">Filter by God Type</option>
          {this.props.dropDown.map((typeOption, index) => (
            <option key={index} value={typeOption}>
              {typeOption}
            </option>
          ))}
        </select>
<ul>
{showGods()}
</ul>
		</div>
			</div>
		)

}


}

export default Heroes