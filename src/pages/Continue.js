import React, { useState } from 'react';
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import Swipes from '../components/Swipes'


const Continue = (props) => {
  console.log(props)
  // if(props) 
  return (
    <div>
      <DndProvider backend={Backend}>
        <Swipes
        pendingSessions={props.pendingSessions}
        />  
      </DndProvider>
    </div>
  );
};

export default Continue;