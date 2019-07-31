import React from 'react';
import './demonym.css';

export default function Demonym(props){

  return(
    <div className="demonym">
      A {props.name} comes from {props.country}
    </div>
  )
}



