import React from 'react';
import SimpleListRow  from './SimpleListRow';

export default class SimpleList extends React.Component {
 	render(){
 		return(
 			<span>
               <p><strong>Users</strong></p>
               <SimpleListRow
                   simpleList ={this.props.simpleList}
                   userInput  ={this.props.userInput}
                   />
           	</span>
 			);
 	}
}