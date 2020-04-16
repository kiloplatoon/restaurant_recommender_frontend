import React, { useState } from 'react';
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import Swipes from '../components/Swipes'


const Continue = (props) => {
  const [user2Data, setUser2Data] = useState()

  return (
    <div>
      <DndProvider backend={Backend}>
        <Swipes 
        />  
      </DndProvider>
    </div>
  );
};

export default Continue;