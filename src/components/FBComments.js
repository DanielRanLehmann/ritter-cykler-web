import React, { Component} from 'react';
import FacebookProvider, { Comments } from 'react-facebook';

// NOTE: Edit the facebook app id.

class FBComments extends Component {
  render() {
    return (
      <FacebookProvider appId={this.props.appId}>
        <Comments href={this.props.href} />
      </FacebookProvider>
    );
  }
}

export default  FBComments;
