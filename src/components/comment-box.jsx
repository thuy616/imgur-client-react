var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ListGroup = ReactBootstrap.ListGroup;
var Comment = require('./comment');

module.exports = React.createClass({
  render: function(){
    return <ListGroup>
      {this.renderComments()}
    </ListGroup>
  },
  renderComments: function() {
    return this.props.comments.slice(0, 20).map(function(comment){
      return <Comment key={comment.id} {...comment}></Comment>
    });
  },
  handleCommentClick: function(event) {
    console.log("clicked");
  }
});
