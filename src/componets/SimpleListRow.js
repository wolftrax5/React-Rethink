 /*
	MODULE Dependencies
 */
import React from 'react';

export default class SimpleListRow extends React.Component {
	constructor(props){
 		super(props);	
 	} 	
 	render(){
 		console.log('_________________');
		console.log('simpleList rows props:');
		console.log(this.props)

 		var rows = this.props.simpleList;
        var userInput = this.props.userInput;

       
        return (
            <ol>
           
            {rows.map((element)=>{
         		if (element.userName){
         		console.log(element.userName);
         		return( <li>{element.userName}</li>);
     	    	}
     	    })
     	}
     	            
            </ol>
 		);
 	}
}
