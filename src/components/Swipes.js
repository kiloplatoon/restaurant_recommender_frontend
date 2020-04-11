import React, { useState, useCallback } from "react";
import YesBin from "./YesBin";
import NoBin from "./NoBin";
import Box from "./Box.js";
import ItemTypes from "./ItemTypes";
import update from "immutability-helper";

export default function Swipes(props) {
  const cards = () => {
    let data = [];
    for (let i = 0; i < props.apiData.length; i++) {
      data[i] = {
        name: props.apiData[i].name,
        image_url: props.apiData[i].image_url,
        rating: props.apiData[i].rating,
        price: props.apiData[i].price,
        location: props.apiData[i].location,
        url: props.apiData[i].url,
        type: ItemTypes.RESTAURANT,
      };
    }
    return data;
  };

  console.log(props);
  const [yesbin, setYesbin] = useState([
    { accepts: [ItemTypes.RESTAURANT], lastDroppedItem: null },
  ]);
  const [nobin, setNobin] = useState([
    { accepts: [ItemTypes.RESTAURANT], lastDroppedItem: null },
  ]);
  const [boxes] = useState(cards(props.apiData));
  console.log(boxes);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop1 = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
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
    [droppedBoxNames, yesbin]
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
    <div>
      <span style={{ overflow: "hidden", clear: "both" }}>
        {yesbin.map(({ accepts, lastDroppedItem }, index) => (
          <YesBin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop1(index, item)}
            key={index}
          />
        ))}
      </span>
      <span style={{ overflow: "hidden", clear: "both" }}>
        {nobin.map(({ accepts, lastDroppedItem }, index) => (
          <NoBin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop2(index, item)}
            key={index}
          />
        ))}
      </span>

      <div style={{ overflow: "hidden", clear: "both" }}>
        {boxes.map(
          ({ name, image_url, rating, price, location, url, type }, index) => (
            <Box
              name={name}
              image_url={image_url}
              rating={rating}
              price={price}
              location={location}
              url={url}
              type={type}
              isDropped={isDropped(name)}
              key={index}
            />
          )
        )}
      </div>
    </div>
  );
}