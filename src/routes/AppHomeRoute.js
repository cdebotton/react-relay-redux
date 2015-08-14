import Relay, {Route} from 'react-relay';

export default class extends Route {
  static routeName = 'AppHomeRoute';
  static path = '/';
  static queries = {
    user: (Component) => Relay.QL`
      query {
        user {
          ${Component.getFragment('user')}
        }
      }
    `,
  };
}
