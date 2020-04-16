import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import YesBin from "./YesBin";
import NoBin from "./NoBin";
import Box from "./Box.js";
import ItemTypes from "./ItemTypes";
import update from "immutability-helper";



class SwipesClass extends Component {
  state = {
    allCards: false,
    yesBin: false,
    noBin: false,
    counter: false,
  };


  [boxes] = useState(cards(props.apiData));

  cards(){
    let data = [];
    let zIndex = 0
    for (let i = 0; i < props.apiData.length; i++) {
      zIndex++
      data[i] = {
        name: props.apiData[i].name,
        image_url: props.apiData[i].image_url,
        rating: props.apiData[i].rating,
        price: props.apiData[i].price,
        location: props.apiData[i].location,
        url: props.apiData[i].url,
        type: ItemTypes.RESTAURANT,
        zIndex: zIndex,
      };
    }
    return data;
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col style={{ overflow: "hidden", clear: "both" }}>
              {nobin.map(({ accepts, lastDroppedItem }, index) => (
                <NoBin
                  accept={accepts}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item) => handleDrop2(index, item)}
                  key={index}
                />
              ))}
            </Col>

            <Col>
              {boxes.map(
                (
                  { name, image_url, rating, price, location, url, type, zIndex },
                  index
                ) => (
                  <Box
                    key={index}
                    name={name}
                    image_url={image_url}
                    rating={rating}
                    price={price}
                    location={location}
                    url={url}
                    type={type}
                    yesIsDropped={yesIsDropped(name)}
                    isDropped={isDropped(name)}
                    zIndex={zIndex}
                  />
                )
              )}
            </Col>

            <Col style={{ overflow: "hidden", clear: "both" }}>
              {yesbin.map(({ accepts, lastDroppedItem }, index) => (
                <YesBin
                  accept={accepts}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item) => handleDrop1(index, item)}
                  key={index}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SwipesClass;