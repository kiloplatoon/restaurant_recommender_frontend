import React, { useState, useCallback, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import YesBin from "./YesBin";
import NoBin from "./NoBin";
import Box from "./Box.js";
import Match from '../pages/Match'
import ItemTypes from "./ItemTypes";
import update from "immutability-helper";
import { Container, Row, Col } from "react-bootstrap";

export default function Swipes(props) {
  

  const userLikes = props.pendingSessions[0].user_likes
  const zipcode = props.pendingSessions[0].zipcode
  
  const [match, setMatch] = useState(false)

  useEffect(() => {
    compareLikes()
  }, [''])

  const compareLikes = () => {
    console.log(yesbin)
    let test = yesbin[0].lastDroppedItem
    if (test !== null) {
      // let test = yesbin[0].lastDroppedItem['name']
      for (let i=0; i < userLikes.length; i++) {
        let testTwo = userLikes[i]
        if (testTwo == test.name) {
          // MATCH!  REDIRECT HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          setMatch(true)
          console.log('MATCH!!!!!')
          //return <Redirect to='/match' />
          
          
        }
      }
    }
  }

  // const renderRedirect = () => {
  //   if (match == true) {
  //   }
  // }
  
  const checkCompleted = () => {
    //compareLikes()
    let noCount = droppedBoxNames.length
    let yesCount = yesBoxNames.length
    let maxCount = boxes.length

    if (noCount+yesCount == maxCount) {
      alert('COMPLETED')
      console.log('Completed - send yesBoxNames to backend to be stored and retrieved')
      // currentUserID, secondUserID, list of Resteraunt names.
      if (props) {
        let currentUserID = props.user.id

        let secondUser = props.userTwo
        let secondUserID = false
        for (let i in props.user.friends) {
          let item = props.user.friends[i]
          if (item.username == secondUser) {
            secondUserID = item.id
          }
        }

        console.log(`Send currentUser( ${currentUserID} ) and secondUser( ${secondUserID} ) along with liked resturants ( ${yesBoxNames} ) to backend`)
        
        let test = props.UserAPI.startSession(currentUserID, secondUserID, yesBoxNames,props.apiData, props.zipcode)

        //////////
        // FIGURE OUT A REDIRECT AND VERIFY THE SESSION WAS CREATED.

      }
    }
  }


  const deck = {
    overflow: "hidden",
    heigth: "700px",
    width: "700px",
  };

  
  const cards = () => {
    let data = [];
    let zIndex = 0
    console.log(props.pendingSessions)
    if (props.pendingSessions) {
      for (let i = 0; i < props.pendingSessions[0].all_resteraunts.length; i++) {
        zIndex++
        data[i] = {
          name: props.pendingSessions[0].all_resteraunts[i].name,
          image_url: props.pendingSessions[0].all_resteraunts[i].image_url,
          rating: props.pendingSessions[0].all_resteraunts[i].rating,
          price: props.pendingSessions[0].all_resteraunts[i].price,
          location: props.pendingSessions[0].all_resteraunts[i].location,
          url: props.pendingSessions[0].all_resteraunts[i].url,
          type: ItemTypes.RESTAURANT,
          zIndex: zIndex,
        };
      }  
    } else {
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


  // const [countMaster, setCount] = useState([
  //   { accepts: [ItemTypes.RESTAURANT], lastDroppedItem: 0 },
  // ]);

  const handleDrop1 = useCallback(
    (index, item) => {
      const {name} = item;
      setYesBoxNames(
        update(yesBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      compareLikes()
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
  console.log('CHECK COMPLETED ----------------------------------------------')
  checkCompleted()
  const handleDrop2 = useCallback(
    (index, item) => {
      console.log(item)
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
  console.log(match)
  return (
    <Container>
      {
        match
        ?
          <Match yesbin={yesbin[0].lastDroppedItem.name} zipcode={props.pendingSessions[0].zipcode} />
        
        :
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
                yesIsDropped={yesIsDropped(name, image_url)}
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
       }
    </Container>
  );
}
