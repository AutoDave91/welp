import React from 'react';
import axios from 'axios'


export default function EditFormModule(props) {
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



  function handleAddSubmit(){

    axios
        .post('/api/wos', { title:title, 
                              img:img, 
                              description:description,
                              uid: props.user.id,
                              bid: props.user.businesses_id
                             })
        .then (response => {
            props.getWOS()
        })
        .then(response => {
            setOpen(false)
        })
        .catch(error => console.log(`handleAddSubmit error in AddWOS.js : ${error}`))

  }


  return (
    <div>



{/* Regular ADD button */}

          <button aria-label="Info"
          onClick={() => props.editWOSFunction(props.wos.wos_id)}
          onClick={handleClickOpen}
          >
            Add Offender
          </button>







{/* ---------- Regular Pop Up Modal ---------- */}
    <dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title" >


        <h2>
          Submit an offender
        </h2>

      <form className = 'wos-edit-form'>

        <label>Title: </label>
        <textarea rows="3" cols="27"
                    onChange = {(e) => setTitle(e.target.value)}
                    defaultValue = 'Add Title here.'
        />

        <br/>
        <label>Image: </label>
        <textarea rows="3" cols="27"
                    onChange = {(e) => setImage(e.target.value)}
                    defaultValue = 'Add image URL here'
        />

        <br/>
        <label>Description: </label>
        <textarea rows="10" cols="27"
                    onChange = {(e) => setDescription(e.target.value)}
                    defaultValue = 'Add description here'
        />

      </form>



{/* Cancel button */}
          <button
            onClick={handleCancel} color="primary"
          >
            Cancel
          </button>

{/* Submit button */}
          <button 
            onClick={handleAddSubmit} color="primary"
          >
            Save
          </button>



    </dialog>
{/* ---------- Regular Pop Up Modal ---------- */}
















    </div>
  );
}