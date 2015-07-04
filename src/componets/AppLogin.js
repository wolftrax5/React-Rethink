  /*
	MODULE Dependencies
 */
import React from 'react';// 

export default class AppLogin extends React.Component{
constructor(props) {
  super(props);
    this.state = {
      user: '',
      password: ''
    };
  }
  // This will be called when the user clicks on the login button
 OnLog(event) {
 	// Here, we call an external AuthService
  }

  render(){
    
      return <h1>LOG</h1>
    }
}
