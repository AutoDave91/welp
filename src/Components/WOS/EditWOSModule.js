import React from "react";
import axios from "axios";

import {IMG} from '../../styles/Styled-Components/Inputs/Buttons'
import {W1, W2, W3, W4, W5, W6} from '../../styles/Theme/Typography'
import {white, black, grey, aqua, purple, red} from '../../styles/Theme/Colors'
import Edit from '../../styles/Display/Images/Edit.svg'
import {Modal} from '../../styles/Utils/Modal'

export default function EditWOSModule(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState();
  const [img, setImage] = React.useState();
  const [description, setDescription] = React.useState();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleCancel() {
    setOpen(false);
  }

  function handleEditSave() {
    axios
      .put("/api/wos", {
        wos_id: props.welp_wos.wos_id,
        title: title,
        img: img,
        description: description
      })
      .then(response => {
        console.log(response);
        props.getWOS();
      })
      .then(response => {
        setOpen(false);
      })
      .catch(error =>
        console.log(`edit on editWOSmodule axios handleeditsave: ${error}`)
      );
  }

  return (
    <div>
      {/* Regular EDIT button */}

      <IMG src={Edit} position='absolute' zindex='4' left='6px' bottom='44px'
        aria-label="Info"
        onClick={() => props.editWOSFunction(props.wos.wos_id)}
        onClick={handleClickOpen}
      />
        

      {/* ---------- Regular Pop Up Modal ---------- */}
      <Modal background={grey[50]} 
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <W3>Edit your submission</W3>

        <form className="wos-edit-form">
          <label>Title: </label>
          <textarea
            rows="3"
            cols="27"
            onChange={e => setTitle(e.target.value)}
            defaultValue={props.welp_wos.wos_title}
          />

          <br />
          <label>Image: </label>
          <textarea
            rows="3"
            cols="27"
            onChange={e => setImage(e.target.value)}
            defaultValue={props.welp_wos.wos_img}
          />

          <br />
          <label>Description: </label>
          <textarea
            rows="10"
            cols="27"
            onChange={e => setDescription(e.target.value)}
            defaultValue={props.welp_wos.wos_description}
          />
        </form>

        {/* Cancel button */}
        <button onClick={handleCancel} color="primary">
          Cancel
        </button>

        {/* Submit button */}
        <button onClick={handleEditSave} color="primary">
          Save
        </button>
      </Modal>
      {/* ---------- Regular Pop Up Modal ---------- */}
    </div>
  );
}
