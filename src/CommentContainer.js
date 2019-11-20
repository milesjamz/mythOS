import React from 'react';


class CommentContainer extends React.Component {

state = {
	comment: '',
	myComments: []
}

// --- loads all comments --- 
componentDidMount() {
	fetch('http://localhost:3000/api/v1/comments')
		.then(resp => resp.json())
		.then(commentList => {
			this.setState({ myComments: commentList })
		})
}

handleOnChange = (e) => {
	this.setState({ comment: e.target.value })
}

handleOnSubmit = (e) => {
	e.preventDefault();
	let newComment = {
		user_id: this.props.user.id,
		user_name: this.props.user.username,
		story_id: this.props.story.id,
		content: this.state.comment,
		image: this.props.user.avatar
	}
	fetch('http://localhost:3000/api/v1/comments', {
     method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({comment: newComment})
    })
      .then(res => res.json())
      .then(newComment => {
      	console.log(newComment)
      	this.setState ({ myComments: [...this.state.myComments, newComment], comment: '' })
	})
}

// --- if there are comments on this story, show them --- 
showComments = () => {
	if(this.state.myComments.length > 0) {
	let theseComments = this.state.myComments.filter(comment => comment.story_id === this.props.story.id );
	return theseComments.map((comment, index) => {
	return <li key={index}> 
<img src={require(`${comment.image}`)} className="avatarPic" alt="pic" width="20" height="30" />
	{comment.user_name} said: {comment.content} 
					<button
					className="deleteBtn"
					data-user={comment.user_id} 
					id={comment.id} 
					onClick={this.delComment}>X</button> </li>  
		})
	}
}

// --- delete a comment ---
delComment = (e) => {
  console.log(e.target.dataset.user)
  if ( parseInt(e.target.dataset.user) === this.props.user.id ) {
  fetch(`http://localhost:3000/api/v1/comments/${e.target.id}`, {
    method: 'DELETE' })
    .then(resp => resp.json())
    .catch(err => {
    console.error(err)
  });
let remainingComments = this.state.myComments.filter(comment => comment.id !== parseInt(e.target.id))
this.setState ({ myComments: remainingComments })
		} else { alert("You can't delete someone else's comment; sorry!") }
}

render() {
	return (
		<div className="commentContainer">
		Leave a comment, young scribe:<br />
		<form onSubmit={this.handleOnSubmit}>
		<input
			type="text"
			value={this.state.comment}
			onChange={this.handleOnChange} />
		<input type="submit" />
		</form>
		<ul>
		{this.showComments()}
		</ul>
		</div>
		)

}


}

export default CommentContainer