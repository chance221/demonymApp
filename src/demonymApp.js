import React, {Component} from 'react';
import './demonymApp.css'

import Demonym from './demonym';
import CountrySelector from './countrySelector';


//As this is the parent component that the other two components in our app have in common we should keep the state here. Also understand that since this is where the state lives the data for this application should be loaded to this component as well. This means that we would make the API call from here and keep the results in the state. Where do we place the code for the API call? It should not occur every time the state changes as the API call itself will alter the state. There are components that we could use to ensure the correct behavior. In this case componentDidMount is a good candidate. this method executes once after the render() method is executed for the first time. That means the component is rendered once with no data. The the componetDidMount executes and fetches the data and updates the state. That triggered a re-render and the component renders a second time. WITH THE DATA

//What happens if and when the fetch fails? We can at least inform the user. 

//Fetching the data requires us to make an AJAX request using the fetch API. 
//It takes one argument the URL and an objects with specific instructions on how to make the request(ooptional). 
//fetch() RETURNS A PROMISE to which you attach a handler. This promise resolves to a Response object. the response objet represents the HTTP status code and status text as well as the payload, the actual data. 


class DemonymApp extends Component{
  constructor(props){
    super(props);
    this.state={
      countries:[],
      selected: null
    };
  }
  setSelected(selected){
    this.setState({
      selected
    })
  }
  componentDidMount(){
    fetch('https://country.register.gov.uk/records.json?page-size=5000')
      .then(response=>{
        console.log('About to check for errors');
        if(!response.ok){//the poop hit the fan better let the user know. 
          console.log('An error has occurred')
          throw new Error('Something went wrong')
        }//if we are ok do this
        return response; //everythings good you can proceed
      })
      .then(response =>response.json())
      .then(data=>{
        const countries = Object.keys(data)
          .map(key=> data[key].item[0]);
        console.log(countries);
        this.setState({
          countries
        })
      })
      .catch(err=>{
        //this catch handles the error condition(not the promise though?)
        this.setState({error:err.message})
      })
  }
  render(){
    const error = this.state.error?<div className="demonym_app__error">{this.state.error}</div>:
    "";
    const demon = this.state.selected?<Demonym name ={this.state.selected['citizen-names']} country={this.state.selected.name}/>
    :<div className="demonym_app__placeholder">Select a country above</div>
    return(
      <div className="demonym_app">
        {error}
        <CountrySelector 
        countries={this.state.countries}
        changeHandler={selected =>this.setSelected(selected)}/>
        {demon}
      </div>
    )
  }
}

export default DemonymApp;