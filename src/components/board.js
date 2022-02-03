import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRedo} from '@fortawesome/free-solid-svg-icons'
import { TILES, TOTAL_GRID, BOARD_DIMESSION  } from "./constant"
import BoardTile from "./tiles";
import { canSwap, shuffle, swap, isSolved } from "./calculation"

function PuzzleBoard({ imgUrl }) {
  const [tiles, setTiles] = useState([...Array(TILES).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  console.log('is started:', isStarted)

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }

  const handleTileClick = (index) => {
    swapTiles(index)
  }

  const handleShuffleClick = () => {
    shuffleTiles()
  }

  const handleStartClick = () => {
    shuffleTiles()
    setIsStarted(true)
  }

  const pieceWidth = Math.round(BOARD_DIMESSION  / TOTAL_GRID);
  const pieceHeight = Math.round(BOARD_DIMESSION  / TOTAL_GRID);
  const style = {
    width: BOARD_DIMESSION ,
    height: BOARD_DIMESSION ,
  };
  const hasWon = isSolved(tiles)

  return (
    <>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <BoardTile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <div>PUZZLE SOLVED :)</div>}
      {!isStarted ?
        (<button onClick={() => handleStartClick()}><FontAwesomeIcon icon={faRedo} /> Shuffle</button>) :
        (<button onClick={() => handleShuffleClick()}><FontAwesomeIcon icon={faRedo} /> Shuffle again</button>)}
    </>
  );
}

export default PuzzleBoard;