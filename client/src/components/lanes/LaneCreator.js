import React from "react";
import LaneWrapper from "./LaneWrapper";
import Creator from "../common/Creator";
import lanesService from "../../services/lanes";
import { useBoardContext } from "../../contexts/Board";

function LaneCreator(props) {
  const { addLane, boardId } = useBoardContext();

  return (
    <LaneWrapper>
      <div className="lane-creator">
        <Creator
          hasButton
          buttonClassName="overlay"
          create={async (laneTitle) => {
            const lane = await lanesService.createLane({
              boardId,
              title: laneTitle,
            });
            if (lane) {
              addLane(lane);
            }
          }}
          toggleText={props.numLanes ? "Add another list" : "Add a list"}
          placeholder={"Enter list title..."}
          buttonText={"Add List"}
        />
      </div>
      <style jsx>
        {`
          .lane-creator :global(.creator-button) {
            height: 40px;
            padding: 10px 10px;
          }
        `}
      </style>
    </LaneWrapper>
  );
}

export default LaneCreator;
