 /*
	MODULE Dependencies
 */
import React from 'react';

export default class SimpleListRow extends React.Component {
	constructor(props){
 		super(props);	
 	} 	
 	render() {
 		console.log('_________________');
		console.log('simpleList rows props:');
		console.log(this.props)

 		var rows = this.props.simpleList;
        var filterBy = this.props.filterBy;

       
        return (
        
        <ol>   
            { rows.map((element)=>{
                
         		if (element.userName){
                        if (element.userName.toLowerCase().search( filterBy.toLowerCase()) > -1){
                            console.log("userInput found in simpleList : " +element.userName);
                            return (
                                <li>{element.userName}</li>
                            );
                        }
                    }
                  } )     
 	  	       }
            </ol>
        );

    }
}
