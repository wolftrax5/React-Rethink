/*
  MODULE Dependencies
  Babelify nos permite transpilar nuestro codigo de js usando ECMAScript 6 y jsx a js comun 
  Browserify permite agrupar todos los modulos de nuestro proyecto en un archivo Javascript.
 */
import React from 'react';// Importamos react usando npm install --save react esto nostraera un modulo node para usar react 
import AppMultimedia from './componets/AppMultimedia'

React.render(
		<AppMultimedia/>, document.getElementById('container'));