import Relay, {Route} from 'react-relay';

export default class extends Route {
  static routeName = 'AppHomeRoute'
  static path = '/'
  static queries = {
    viewer: (Component) => Relay.QL`
      query {
        viewer {
          ${Component.getFragment('viewer')}
        }
      }
    `,
  }
}
