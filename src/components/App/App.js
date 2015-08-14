import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';

class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div>
        <header>
          <h1>
            <small>Hello, </small>
            <span>{this.props.user.firstName}</span>
          </h1>
          <nav>
            <span>You're emaill address is </span>
            <a href={`mailto:${this.props.user.email}`}>
              {this.props.user.email}
            </a>
          </nav>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        firstName,
        email,
      }
    `,
  },
});
