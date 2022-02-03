import React from "react";
import { Motion, spring } from "react-motion";
import { getMatrixPosition, getVisualPosition } from "./calculation";
import { TILES, TOTAL_GRID, BOARD_DIMESSION  } from "./constant"

function BoardTile(props) {
  const { tile, index, width, height, handleTileClick, imgUrl } = props;
  console.log("img in tile", imgUrl)
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${TOTAL_GRID})`,
    height: `calc(100% / ${TOTAL_GRID})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_DIMESSION * 1.25}px`,
    backgroundPosition: `${(100 / TOTAL_GRID) * (tile % TOTAL_GRID)}% ${(100 / TOTAL_GRID) * (Math.floor(tile / TOTAL_GRID))}%`,

  };
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Is last tile?
            opacity: tile === TILES - 1 ? 0 : 1,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {!imgUrl && `${tile + 1}`}
        </li>
      )}
    </Motion>
  );
}

export default BoardTile;