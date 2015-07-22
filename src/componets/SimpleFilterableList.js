import React from 'react';
import SimpleList  from './SimpleList';
import $ from 'jquery';
import io from 'socket.io-client';
var socket = null;
var startSocket = () => {
    socket = io('http://localhost:4000');
}
export default class SimpleFilterableList extends React.Component {

	downloadData(){
			$.ajax({
				url: '/Users',
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
        this.state ={
            userInput : "",
        	simpleList : [ { row : 'cargando ...' } ]
        	}
        	
    	}
    
    //encargará de enviar los nuevos elementos a RethinkDB usando nuestra API
    // sendNewElement(key){
    // 	if (key.key == "Enter"){
    //     	$.ajax({
    //     	    url  : "/Users/add",
    //         	type : "post",
    //         	data : {
    //         	    "row" : document.getElementById('newElement').value
    //         	}
    //     	});
    //     document.getElementById('newElement').value = '';
    //     document.getElementById("userInput").focus();
    // 	}
    // }
    updateUserInput (input){

        this.setState({userInput: input.target.value});
    
    }

    addNewUser(){
        $.ajax({
             url  : "/User",
             type : "post",
             data : {
                 "userName" : document.getElementById('newUserName').value ,
                 "passWord" : document.getElementById('passWord').value
             }
         });
        document.getElementById('passWord').value = "";
        document.getElementById('newUserName').value = "";
    }
    render(){
    	return(
    		<div>
                <input
                    id          ='userInput'
                    type        ='text' 
                    placeholder ='Filtrar...'   
                    onChange    ={this.updateUserInput}
                    />
            	<SimpleList
                	simpleList  = {this.state.simpleList}
               		filterBy = {this.state.userInput}/>
                
                <input
                    id = 'newUserName'
                    placeholder ='User Name'
                    type = 'text'
                    className ='fav'>
                </input>
                <input
                    id = 'passWord' 
                    placeholder ='passWord'
                    type = 'text'
                    className ='fav'>
                </input>
                <button id = 'addUser' type="submit"  onClick = {this.addNewUser} className="btn btn-default">Submit</button>

    		</div>
    		);
    }
}