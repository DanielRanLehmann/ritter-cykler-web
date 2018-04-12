import React, { Component} from 'react';
import FacebookProvider, { CommentsCount } from 'react-facebook';

class FBCommentsCount extends Component {
  render() {
    return (
      <FacebookProvider appId={this.props.appId}>
        <CommentsCount href={this.props.href} /> Kommentarer
      </FacebookProvider>
    );
  }
}

export default FBCommentsCount;
