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
      message="There is no undo"
      buttonText="Delete"
      confirm={props.delete}
      />
      <button
        onClick={() => {
          setShowDialog(true);
        }}
        className={`deleter-button ${props.overlay ? "overlay" : ""}`}
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
          .overlay {
            color: #fff;
            background-color: hsla(0, 0%, 100%, 0.24);
            &:hover {
              background-color: hsla(0, 0%, 100%, 0.32);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Deleter;
