import React from "react";
import LaneWrapper from "./LaneWrapper";
import Creator from '../common/Creator';

function LaneCreator(props) {
  return (
    <LaneWrapper>
      <Creator
        create={props.create}
        type="lane"
        placeholder={"Enter list title..."}
        buttonText={"Add List"}
        toggleText={props.lanes.length ? "Add another list" : "Add a list"}
      />
    </LaneWrapper>
  );
}

export default LaneCreator;
