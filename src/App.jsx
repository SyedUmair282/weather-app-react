import React from 'react'
import './App.css';


class App extends React.Component{
  constructor(){
    super()
    this.state={
      city:"",
      country:"",
      weather:"",
      min:"",
      max:"",
      condition:"",
      feel:"",
      error:false
    }
  }
  
  
  get_weather=async()=>{
    //get value from inputs
    let city=document.getElementById('city').value;
    let country=document.getElementById('country').value;

    //check inputs value empty or not
    if(city && country)
    {
      //weather api
      let api="3ae56f54574a6511875cb9e103875c06";

      //get api data
      const api_key=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api}`
      )

      //convert api data into json
      const response=await api_key.json();

      //converting temprature into celcius
      let temp=Math.floor(response.main.temp-273.15);
      let temp_max=Math.floor(response.main.temp_max-273.15);
      let temp_min=Math.floor(response.main.temp_min-273.15);
      let feel=Math.floor(response.main.feels_like-273.15);

      //set data in states
      this.setState({
        city:`${response.name},`,
        country:response.sys.country,
        condition:response.weather[0].description,
        weather:temp,
        max:temp_max,
        min:temp_min,
        feel:feel,
        error:true
      })
    }
    else{
      alert("Please fill all fields..!!");
    }
    

  }
  render(){
    let {city,country,weather,min,max,condition,feel,error}=this.state
    return (
      <div className="App">
        <h1 className="py-4">WEATHER APP</h1>
        <input className="mx-4" type="text" id="city" placeholder="City"/>
        <input className="mx-4"type="text" id="country" placeholder="Country"/>
        <button className="btn-primary" id="btn" onClick={this.get_weather}>Get Weather</button>
        <br/>
        <br/>
        <h2 className="py-3">{city}{country}</h2>
        {error?<h1 className="py-2">{weather}&deg;</h1>:null}
        {error?<span className="px-4">MAX: {max}&deg;</span>:null}
        {error?<span className="px-4">MIN: {min}&deg;</span>:null}
        {error?<h3 className="py-4">Feels Like</h3>:null}
        {error?<p>{feel}&deg;</p>:null}
        {error?<h3 className="py-3">{condition}</h3>:null}
        
      </div>
    );
  }
  
}

export default App;
