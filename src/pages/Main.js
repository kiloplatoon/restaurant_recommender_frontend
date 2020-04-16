import React, { Component } from "react";
import UserForm from "../components/UserForm";
import RestaurantCard from "../components/RestaurantCard";
import Swipes from "../components/Swipes.js";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

const API_KEY =
  "EHLda1XJa0Ge3t99Gz8jThWAFiOQba-pcniYGXx1C4nJ6QmmHHYrh60SiSCT_NaViCO1n48wuxSYN821hps27Yib2IGodlkPDDeF11sp_YZ94sGnR_HvTz7Vea2MXnYx";

class Main extends Component {
  state = {
    apiData: [],
    formSubmit: false,
  };

  getRestaurants = async (evt) => {
    evt.preventDefault();
    console.log(evt.target.username)
    let zipcode = evt.target[0].value
    let userTwo = evt.target.username.value
    const settings = {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const cors = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.yelp.com/v3/businesses/search";
    const zip = evt.target.zipcode.value;
    const apiCall = await fetch(`${cors}${url}?location=${zip}`, settings);
    const data = await apiCall.json();
    this.setState({
      formSubmit: true,
      zipcode: zipcode,
      userTwo: userTwo,
      apiData: data.businesses.map((data) => ({
        name: data.name,
        image_url: data.image_url,
        rating: data.rating,
        price: data.price,
        location: data.location.address1,
        url: data.url,
      })),
    });
  };


  fakeResaurants = async (evt) => {
    evt.preventDefault()
    console.log(evt.target.username)
    let zipcode = evt.target[0].value
    let userTwo = evt.target.username.id
    this.setState({
      formSubmit: true,
      zipcode: zipcode,
      userTwo: userTwo,
      apiData: [
        {
          "name": "Sunflower Cafe",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/rAzJHxQweRCXOGhq80C3BQ/o.jpg",
          "rating": 4.5,
          "location": "7629A State Hwy 80",
          "url": "https://www.yelp.com/biz/sunflower-cafe-cooperstown?adjust_creative=mhxnm2ZN1urtF5r_O2HwXw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mhxnm2ZN1urtF5r_O2HwXw"
        },
        {
          "name": "Rose & Kettle Restaurant",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/RvrGe-vM47kAN3n18kD9vg/o.jpg",
          "rating": 4,
          "price": "$$",
          "location": "4 Lancaster St",
          "url": "https://www.yelp.com/biz/rose-and-kettle-restaurant-cherry-valley?adjust_creative=mhxnm2ZN1urtF5r_O2HwXw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mhxnm2ZN1urtF5r_O2HwXw"
        },
        {
          "name": "Sunflower Cafeaasdf",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/rAzJHxQweRCXOGhq80C3BQ/o.jpg",
          "rating": 4.5,
          "location": "7629A State Hwy 80",
          "url": "https://www.yelp.com/biz/sunflower-cafe-cooperstown?adjust_creative=mhxnm2ZN1urtF5r_O2HwXw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mhxnm2ZN1urtF5r_O2HwXw"
        },
        {
          "name": "Rose & Kettle Restauraasdfdsfnt",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/RvrGe-vM47kAN3n18kD9vg/o.jpg",
          "rating": 4,
          "price": "$$",
          "location": "4 Lancaster St",
          "url": "https://www.yelp.com/biz/rose-and-kettle-restaurant-cherry-valley?adjust_creative=mhxnm2ZN1urtF5r_O2HwXw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mhxnm2ZN1urtF5r_O2HwXw"
        },
      ]
    })
  };

  // handleSubmit(evt) {
  //   evt.preventDefault()

  // }

  render() {
    return (
      <div>
        {
          <>
            <UserForm getRestaurants={this.getRestaurants} user={this.props.user}/>
            {this.state.formSubmit && (
              // <div>test</div>
              <DndProvider backend={Backend}>
                <Swipes apiData={this.state.apiData} user={this.props.user} userTwo={this.state.userTwo} zipcode={this.state.zipcode} UserAPI={this.props.UserAPI}/>
              </DndProvider>
            )}
          </>
        }

        {/* <DndProvider backend={Backend}>
          <Swipes />
        </DndProvider> */}
      </div>
    );
  }
}

export default Main;