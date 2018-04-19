import React, { Component} from 'react';
import FacebookProvider, { CustomChat } from 'react-facebook';

class FBCustomChat extends Component {
  render() {
    return (
      <FacebookProvider appId={this.props.appId}>
        <CustomChat pageId={this.props.pageId} minimized={false}/>
      </FacebookProvider>
    );
  }
}

export default FBCustomChat;
