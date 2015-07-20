 /*
	MODULE Dependencies
 */
import React from 'react';

export default class SimpleListRow extends React.Component {
	constructor(props){
 		super(props);	
 	} 	
 	render(){
 		var rows = this.props.simpleList;
        var userInput = this.props.userInput;
        return (
            <ol>
            {rows.map(function(element) {
                if (element.row){
                    if (element.row.toLowerCase().search(userInput.toLowerCase()) > -1){
                        return (
                            <li>{element.row}</li>
                        )
                    }
                }
            })}
            </ol>
 		);
 	}
}
