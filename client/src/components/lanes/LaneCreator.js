import React from "react";
import LaneWrapper from "./LaneWrapper";
import Creator from "../common/Creator";
import lanesService from "../../services/lanes";
import { useBoardContext } from "../../contexts/Board";

import { MdAdd } from "react-icons/md";

function LaneCreator(props) {
  const { addLane } = useBoardContext();

  function CreatorButton(buttonProps) {
    return (
      <button {...buttonProps} className="creator-toggle overlay">
        <div className="toggle-icon">
          <MdAdd size={20} />
        </div>
        <div className="toggle-text">{props.numLanes ? "Add another list" : "Add a list"}</div>
        <style jsx>
          {`
            .creator-toggle {
              height: 40px;
              padding: 10px 10px;
              width: 100%;
              display: flex;
              .toggle-icon {
                margin: 0 2px;
              }
              .toggle-text {
                margin: 2px 0;
                font-size: 14px;
              }
            }
          `}
        </style>
      </button>
    );
  }
  return (
    <LaneWrapper>
      <Creator
        buttonComponent={CreatorButton}
        create={async (laneTitle) => {
          const lane = await lanesService.createLane({
            boardId: props.boardId,
            title: laneTitle,
          });
          if (lane) {
            addLane(lane);
          }
        }}
        type="lane"
        placeholder={"Enter list title..."}
        buttonText={"Add List"}
      />
    </LaneWrapper>
  );
}

export default LaneCreator;
