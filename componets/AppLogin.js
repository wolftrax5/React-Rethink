  /*
	MODULE Dependencies
 */
import React from 'react';// 

export default class AppLogin extends React.Component{
constructor() {
    this.state = {
      user: ‘’,
      password: ‘’
    };
  }
  // This will be called when the user clicks on the login button
 OnLog(event) {
 	// Here, we call an external AuthService
  }

  render() {
    return (
        <form role ="form">
        <div className="form-group">
          <input type="text" valueLink={this.linkState(‘user’)}placeholder="Username" />
          <input type="password" valueLink={this.linkState(‘password’)} placeholder="Password" />
        </div>
        <button type="submit" onClick={this.OnLog.bind(this)}>Submit</button>
      </form>
    </div>
  }
  // We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
  reactMixin(Login.prototype, React.addons.LinkedStateMixin);
}
