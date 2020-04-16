import React, { Component } from "react";
import UserForm from "../components/UserForm";
import Swipes from "../components/Swipes.js";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

const API_KEY =
  "EHLda1XJa0Ge3t99Gz8jThWAFiOQba-pcniYGXx1C4nJ6QmmHHYrh60SiSCT_NaViCO1n48wuxSYN821hps27Yib2IGodlkPDDeF11sp_YZ94sGnR_HvTz7Vea2MXnYx";

class Main extends Component {
  state = {
    apiData: [],
    formSubmit: false,
    user2: '',
    zipcode: undefined
  };

  getRestaurants = async (evt) => {
    evt.preventDefault();
    const settings = {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const cors = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.yelp.com/v3/businesses/search";
    const zip = evt.target.zipcode.value;
    const user2 = evt.target.username.value
    const apiCall = await fetch(`${cors}${url}?location=${zip}`, settings);
    const data = await apiCall.json();
    this.setState({
      formSubmit: true,
      user2: user2,
      zipcode: zip,
      apiData: data.businesses.map((data) => ({
        name: data.name,
        image_url: data.image_url,
        rating: data.rating,
        price: data.price,
        location: data.location.address1,
        url: data.url,
      })),
    });
    // let info = {
    //     userID: this.props.user.id,
    //     userLikes: [''],
    //     zipcode: zip,
    //     user2ID: user2,
    //     is_active: false
    // }
    // base.firestore().collection('session').doc('swipe-sesh').set(info)

  };

  render() {
    return (
      <div>
        {
          <>
            <UserForm getRestaurants={this.getRestaurants} />
            {this.state.formSubmit && (
              <DndProvider backend={Backend}>
                <Swipes 
                apiData={this.state.apiData} 
                user={this.props.user} 
                user2={this.state.user2}
                zip={this.state.zip}
                />
              </DndProvider>
            )}
          </>
        }
      </div>
    );
  }
}

export default Main;


/**
 * import firebase from '../firebase.js'
 *   firebase.firestore().collection('session').doc('swipe-sesh').set({
    userID: props.user.id,
    userLikes: [''],
    zipcode: props.zip,
    user2ID: props.user2,
    is_active: false
  })

 */