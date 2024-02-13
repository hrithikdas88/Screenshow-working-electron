import React, { useEffect, useState } from 'react';

const Signin = () => {
  console.log(window.electron), "wooo";
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.indexBridge.something((event, icounter) => {
      setCounter(icounter);
    });
  }, []); 

  const handleTakeScreenshot = () => {
    console.log("loll")
    window.electron.takeScreenshot();
  };


  return (
    <div>
      <h1>Counter</h1>
      <button onClick={()=>handleTakeScreenshot()}>Take ss</button>
      <div id='change'>something happened {counter}</div>
    </div>
  );
}

export default Signin;
