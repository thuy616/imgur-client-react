var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var NavDropdown = ReactBootstrap.NavDropdown;
var MenuItem = ReactBootstrap.MenuItem;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      topics: [],
      dropdownVisible: false
    }
  },
  componentWillMount: function() {
    Actions.getTopics();
  },
  render: function() {
    return <nav className="navbar navbar-default header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Sleek Imgur Browser
        </Link>
        <ul className="nav navbar-nav navbar-right">
          {this.renderTopics()}
            <NavDropdown title='More...' id='basic-nav-dropdown'>
                {this.renderDropDown()}
            </NavDropdown>
        </ul>
      </div>
    </nav>
  },
  renderTopics: function() {
    return this.state.topics.slice(0, 4).map(function(topic){
      return <li key={topic.id}>
        <Link activeClassName="active" to={"topics/" + topic.id}>
          {topic.name}
        </Link>
      </li>
    });
  },
  renderDropDown: function() {
    return this.state.topics.slice(5).map(function(topic){
      return <ul className="dropdown-list">
                <li className="dropdown-item" key="{topic.id}">
                <Link activeClassName="active" to={"topics/" + topic.id}>
                  {topic.name}
                </Link>
              </li>
          </ul>
    });
  },
  onChange: function(event, topics) {
    this.setState({
      topics: topics
    });
  },
  show: function() {
    this.setState({ listVisible: true });
    document.addEventListener("click", this.hide);
  },

  hide: function() {
    this.setState({ listVisible: false });
    document.removeEventListener("click", this.hide);
  },
});
