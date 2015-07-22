import React from 'react';
import SimpleList  from './SimpleList';
import $ from 'jquery';
import io from 'socket.io-client';
var socket = null;
var startSocket = () => {
    socket = io('http://192.168.1.64:4000');
}
export default class SimpleFilterableList extends React.Component {

	downloadData(){
			$.ajax({
				url: '/Users/list',
				dataType: 'json',
				success: (data) => {
                    this.setState({simpleList: data});
                    // console.log('Suses Data:');
                    // console.log(data);
                },
                error: (xhr, status, err) => {
                    console.log('Data error:');
                    console.error(this.props.url, status, err.toString())
                }
			});
		}
	componentDidMount(){
		startSocket();
				
		this.downloadData();
		socket.on('change', (data) => {
			console.log('_________________');
			console.log("Change")
			console.log(data);
			console.log('_________________');
            this.downloadData();
        })
        socket.on('error', (error) => {
			console.log('_________________');
			console.log("Error")
			console.log(error);
			console.log('_________________');
        })
        socket.on('checkConnection', (result) => {
			console.log('_________________');
			console.log("Result")
			console.log(result);
			console.log('_________________');
        })
	}
	constructor(props) {
    	super(props);
        this.state ={userInput: "",
        	simpleList : [ { row : 'cargando ...' } ]
        	}
        	
    	}
    //Mantiene actualizado el state 
    updateUserInput (input){
    	this.setState({
    		userInput : input.target.value
    	})
    }
    //encargará de enviar los nuevos elementos a RethinkDB usando nuestra API
    sendNewElement(key){
    	if (key.key == "Enter"){
        	$.ajax({
        	    url  : "/Users/add",
            	type : "post",
            	data : {
            	    "row" : document.getElementById('newElement').value
            	}
        	});
        document.getElementById('newElement').value = '';
        document.getElementById("userInput").focus();
    	}
    }
    render(){
    	return(
    		<div>
    			<input
                	id = 'userInput'
                	type = 'text'
                	placeholder = 'Filtrar...'
                	onChange = {this.updateUserInput}>
            	</input>
            	<SimpleList
                	simpleList  = {this.state.simpleList}
               		 userInput = {this.state.userInput}/>
                <input
                	id = 'newElement'
                	type = 'text'
                	placeholder = '+'
                	onKeyPress = {this.sendNewElement}
                	onClick = {this.favToInput}
                	className ='fav'>
            	</input>
    		</div>
    		);
    }
}