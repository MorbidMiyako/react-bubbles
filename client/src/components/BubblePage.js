import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth"

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [change, setChange] = useState(false)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(response => {
        setChange(false)
        console.log("colors get request", response);
        setColorList(response.data)
      })
      .catch(error => {
        console.log("error from server:", error);
      });
  }, [change]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setChange={setChange} axiosWithAuth={axiosWithAuth} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
