import React from "react";
import { MdDelete } from "react-icons/md";
import Dialog from './Confirmer';

function Deleter(props) {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <div>
      <Dialog 
      hideDialog={()=>{
        setShowDialog(false)}} 
      showDialog={showDialog}
      title={props.dialogTitle}
      message={props.message}
      buttonText="Delete"
      confirm={props.delete}
      />
      <button
        onClick={() => {
          setShowDialog(true);
        }}
        className={`deleter-button ${props.className ? props.className : ""}`}
      >
        <MdDelete />
      </button>
      <style jsx>
        {`
          .deleter-button {
            padding: 6px;
            height: 32px;
            width: 32px;
          }
        `}
      </style>
    </div>
  );
}

export default Deleter;
