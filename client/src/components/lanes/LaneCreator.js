import React from "react";
import Creator from "../common/Creator";
import lanesService from "../../services/lanes";
import { useBoardContext } from "../../contexts/Board";

function LaneCreator(props) {
  const { addLane, boardId } = useBoardContext();

  return (
    <div className="lane-creator">
      <Creator
        hasButton
        buttonClassName="overlay"
        create={async (laneTitle) => {
          try {
            const lane = await lanesService.createLane({
              boardId,
              title: laneTitle,
            });
            addLane(lane);
          } catch {}
        }}
        toggleText={props.numLanes ? "Add another list" : "Add a list"}
        placeholder={"Enter list title..."}
        buttonText={"Add List"}
      />
      <style jsx>
        {`
          .lane-creator :global(.creator-button) {
            height: 40px;
            padding: 10px 10px;
          }
        `}
      </style>
    </div>
  );
}

export default LaneCreator;
