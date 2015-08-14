import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';

class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 10) {
          edges {
            node {
              email,
              firstName,
            },
          },
        },
      }
    `,
  },
});
