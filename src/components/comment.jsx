var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ListGroupItem = ReactBootstrap.ListGroupItem
var Tooltip = ReactBootstrap.Tooltip;
var ListGroup = ReactBootstrap.ListGroup;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            clicked: false,
            hovering: false
        }
    },
    render: function() {
        return <ListGroupItem className="comment-box" key={this.props.id}
                              onMouseEnter={this.handleMouseEnter}
                              onMouseLeave={this.handleMouseLeave}
                              onClick={this.handleClick}>
            {this.state.hovering ? this.showTooltip() : null }

            <span className="badge">{this.props.ups}</span>
            <h4>{this.props.author}</h4>
            {this.props.comment}
            {this.state.clicked ? this.showReplies() : null}
        </ListGroupItem>
    },
    showTooltip: function() {
        var message = this.props.children.length > 0 ? "Show recent replies" : "No reply to show"
        return <Tooltip placement="right" className="in">
            {message}
            </Tooltip>

    },
    showReplies: function() {
        if(this.props.children.length>0) {
            return <ListGroup>
                {this.renderReplies()}
                </ListGroup>
        }
    },
    handleMouseEnter: function(){
        this.setState({
            hovering: true
        })
    },
    handleMouseLeave: function() {
        this.setState({
            hovering: false
        })
    },
    handleClick: function() {
        this.setState({
            clicked: !this.state.clicked
        })
    },
    renderReplies: function(){
        if(this.props.children.length>0) {
            var replies =  this.props.children.length>5 ? this.props.children.slice(0,5) : this.props.children;
            return replies.map(function(reply){
                return <ListGroupItem key={reply.id}>
                    <span className="badge reply-badge">{reply.ups}</span>
                    <h5>{reply.author}</h5>
                    {reply.comment}
                </ListGroupItem>
            })
        }
    }
})