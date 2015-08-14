import React, {Component, PropTypes} from 'react';

export default class Layout extends Component {
  static propTypes = {
    js: PropTypes.array,
    css: PropTypes.array,
    markup: PropTypes.string,
  }

  static defaultProps = {
    js: [],
    css: [],
  }

  renderStyles() {
    return this.props.css.map((href, key) => (
      <link
        key={key}
        rel="stylesheet"
        href={`/build/${href}`} />
    ));
  }

  renderScripts() {
    return this.props.js.map((src, key) => (
      <script
        key={key}
        src={`/build/${src}`} />
    ));
  }

  render() {
    const styles = this.renderStyles();
    const scripts = this.renderScripts();

    return (
      <html lang="en">
      <head>
        <title>React Relay Redux</title>
        {styles}
      </head>
      <body>
        <div
          id="mount"
          dangerouslySetInnerHTML={{__html: this.props.markup}} />
        {scripts}
      </body>
      </html>
    );
  }
}
