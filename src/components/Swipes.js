import React, { useState, useCallback, useEffect } from "react";
import YesBin from "./YesBin";
import NoBin from "./NoBin";
import Box from "./Box.js";
import ItemTypes from "./ItemTypes";
import update from "immutability-helper";
import { Container, Row, Col } from "react-bootstrap";
import base from '../firebase.js'

export default function Swipes(props) {
  

  const deck = {
    overflow: "hidden",
    heigth: "700px",
    width: "700px",
  };

  const cards = () => {
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


  const [yesbin, setYesbin] = useState([
    { accepts: [ItemTypes.RESTAURANT], lastDroppedItem: null },
  ]);

  const [nobin, setNobin] = useState([
    { accepts: [ItemTypes.RESTAURANT], lastDroppedItem: null },
  ]);

  const [boxes] = useState(cards(props.apiData));

  const [yesBoxNames, setYesBoxNames] = useState([]);
  function yesIsDropped(boxName) {
    return yesBoxNames.indexOf(boxName) > -1;
  }

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }


  const handleDrop1 = useCallback(
    (index, item) => {
      const { name } = item;
      console.log('Added something to the yesBox')
      setYesBoxNames(
        update(yesBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setYesbin(
        update(yesbin, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [yesBoxNames, yesbin]
  );


  const handleDrop2 = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setNobin(
        update(nobin, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedBoxNames, nobin]
  );

  return (
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
  );
}


