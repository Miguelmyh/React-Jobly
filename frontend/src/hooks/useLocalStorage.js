import React, { useState, useEffect } from "react";

//if no item found in the localStorage with the same key then it will use the backup value(null)
const useLocalStorage = (key, backup = null) => {
  console.log(key);
  //will receive data to be set as initial user or as token
  // initialValue will check if there is a token in the local storage
  //if not, it will set item to null
  const initialValue = localStorage.getItem(key) || backup;
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
};

export default useLocalStorage;
