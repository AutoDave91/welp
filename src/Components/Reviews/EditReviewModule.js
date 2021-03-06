import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
// import StarRating from 'react-star-rating'
import {Modal } from '../../styles/Utils/Modal'
import { IMG } from '../../styles/Styled-Components/Inputs/Buttons';


export default function EditFormModule(props) {
  const [open, setOpen] = React.useState(false);
//   const [id, setId] = React.useState();
  const [title, setTitle] = React.useState();
  const [img, setImage] = React.useState();
  const [description, setDescription] = React.useState();
  const [score, setScore] = React.useState();
  const [alert, e, data] =React.useState();

  function handleRatingClick(e, data) {
    alert('You left a ' + data.rating + ' star rating for ' + data.caption);
  }



  function handleClickOpen() {
    setOpen(true);
  }

  function handleCancel() {
    setOpen(false);
  }

  function handleEditSave(){

    axios
        .put('/api/reviews', { reviews_id:props.welp_reviews.reviews_id,
                               title: title, 
                               img:img, 
                               description:description, 
                               score:score
                             })
        .then (response => {
            console.log(response)
            props.getReviews()
        })
        .then(response => {
            setOpen(false)
        })
        .catch(error => console.log(`edit on editreviewmodule axios handleeditsave: ${error}`))

  }


  return (
    <div>

{/* MaterialUI   EDIT button      */}
          {/* <IconButton aria-label="Info"
          onClick={() => props.editReviewFn(props.reviews.reviews_id)}
          onClick={handleClickOpen}
          >
            <MoreVertIcon />
          </IconButton> */}



{/* Regular EDIT button */}



          <IMG
            className = 'edit-review-button'
            aria-label="Info"
            onClick={() => props.editReviewFn(props.reviews.reviews_id)}
            onClick={handleClickOpen}
            
      
          >
            Edit
          </IMG>



  
{/*  ---------- MaterialUI Pop Up Modal ---------- */}

      {/* <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title" >
          
        <DialogTitle id="form-dialog-title">Edit your review</DialogTitle>

        <DialogContent style={{ paddingLeft: "4vw", paddingRight: "4vw"}}>
          <DialogContentText>
            Please edit the areas needed about your review:
          </DialogContentText> */}

{/* title */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title for ad - 200 character limit"
            type="title"
            fullWidth
            onChange = {(e) => setTitle(e.target.value)}
            defaultValue = {props.welp_reviews.reviews_title}
          /> */}
{/* image url */}
        {/* <TextField
            autoFocus
            margin="dense"
            id="image_url"
            label="Image URL - links to pictures only"
            type="image_url"
            fullWidth
            onChange = {(e) => setImage(e.target.value)}
            defaultValue = {props.welp_reviews.reviews_img}
          /> */}
      

{/* description */}
        {/* <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Brief Description"
            type="description"
            fullWidth
            onChange = {(e) => setDescription(e.target.value)}
            defaultValue = {props.welp_reviews.reviews_description}
          />

        </DialogContent>



        <DialogActions> */}

{/* Cancel button */}
          {/* <Button
            onClick={handleCancel} color="primary"
          >
            Cancel
          </Button> */}

{/* Submit button */}
          {/* <Button 
            onClick={handleEditSave} color="primary"
          >
            Save
          </Button>
     
        </DialogActions>
      </Dialog> */}
{/*  ---------- MaterialUI Pop Up Modal ---------- */}







{/* ---------- Regular Pop Up Modal ---------- */}
    <Modal open={open} onClose={handleCancel} aria-labelledby="form-dialog-title" >


        <h2>
          Edit your review
        </h2>

      <form className = 'reviews-edit-form'>

        <label>Title: </label>
        <textarea   rows="3" cols="27"
                    className = 'edit-review-title'
                    onChange = {(e) => setTitle(e.target.value)}
                    defaultValue = {props.welp_reviews.reviews_title}
        />

        <br/>
        <label>Image: </label>
        <textarea   rows="3" cols="27"
                    className = 'edit=review-image'
                    onChange = {(e) => setImage(e.target.value)}
                    defaultValue = {props.welp_reviews.reviews_img}
        />

        <br/>
        <label>Description: </label>
        <textarea   rows="10" cols="27"
                    className = 'edit-review-description'
                    onChange = {(e) => setDescription(e.target.value)}
                    defaultValue = {props.welp_reviews.reviews_description}
        />
        {/* <StarRating name='react-star-rating'
                    caption='rate:'
                    onRatingClick={(e, data) =>handleRatingClick(e.target.data)}
        /> */}
        <label>Stars: (1-5) </label>
        <select     id = 'stars'
                    onChange = {(e) => setScore(e.target.value)}
                    defaultValue = {props.welp_reviews.reviews_score}
        >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>


      </form>



{/* Cancel button */}
          <button
            className = 'edit-review-title'
            onClick={handleCancel} color="primary"
          >
            Cancel
          </button>

{/* Submit button */}
          <button 
            className = 'edit-review-title'
            onClick={handleEditSave} color="primary"
          >
            Save
          </button>



    </Modal>
{/* ---------- Regular Pop Up Modal ---------- */}
















    </div>
  );
}