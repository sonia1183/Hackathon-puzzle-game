import React, { useState, useEffect } from "react";
import PuzzleBoard from "./components/board";
import { updateURLParameter } from "./components/calculation"

function App() {
  const [imgUrl, setImgUrl] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img"))
    }
  }, [])

  const handleImageChange = (e) => {
    setImgUrl(e.target.value)
    window.history.replaceState("", "", updateURLParameter(window.location.href, "img", e.target.value))
  }

  return (
    <div className="App">
      <div className="external-board">
      <label name="url">Enter Your Choice Picture URL -: </label>
      <input value={imgUrl} onChange={handleImageChange} name="url" className="input-style"/>
      <PuzzleBoard imgUrl={imgUrl} />
      <span>made by- sonia</span>
      </div>
    </div>
  );
}

export default App;