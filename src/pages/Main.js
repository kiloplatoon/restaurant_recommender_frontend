import React, { Component } from 'react';
import UserForm from '../components/UserForm'

const API_KEY = 'EHLda1XJa0Ge3t99Gz8jThWAFiOQba-pcniYGXx1C4nJ6QmmHHYrh60SiSCT_NaViCO1n48wuxSYN821hps27Yib2IGodlkPDDeF11sp_YZ94sGnR_HvTz7Vea2MXnYx'

class Main extends Component {
  state = {
    apiData: []
  }

  getRestaurants = async evt => {
    evt.preventDefault()
    const settings = {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      },
    }
    const cors = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://api.yelp.com/v3/businesses/search'
    const zip = evt.target.zipcode.value
    const apiCall = await fetch(`${cors}${url}?location=${zip}`, settings)
    const data = await apiCall.json()
    this.setState({
      apiData: data.businesses.map(data => ({
        name: data.name,
        image_url: data.image_url,
        rating: data.rating,
        price: data.price,
        location: data.location.address1
      }))
    })
    console.log(this.state.apiData)
  }


  render() {
    return (
      <div>
        <UserForm getRestaurants={this.getRestaurants}/>
      </div>
    );
  }
}

export default Main;