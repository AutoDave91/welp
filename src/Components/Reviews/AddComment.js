import React from 'react';
import axios from 'axios'


export default function AddComment(props) {
  const [description, setDescription] = React.useState('');


  
  function handleAddSubmit(){
    console.log(description)
    console.log(props)
    axios
        .post('/api/comments', {
          description:description})
        .then (() => setDescription(''))
        .then (response => {
            props.getComments()
        })
        .catch(error => console.log(`handleAddComment error in AddComments.js : ${error}`))

  }


  return (
    <div>

{/* ---------- Regular Add Button ---------- */}
 
      <div className = 'add-comment-container'> 

      <form className = 'add-comment-form'>
        <br/>
        <input
                    onChange = {(e) => setDescription(e.target.value)}
                    placeholder = 'Add comment here'
                    value = {description}
        />
      </form>



      <button onClick={(handleAddSubmit)} 
              color="primary"
      >
        Submit
      </button>


      </div>


    </div>
  );
}