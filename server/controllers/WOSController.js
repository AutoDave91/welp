//see WOS
const getWOS = async (req, res) => {
    const reply = await req.app
      .get("db")
      .get_wos()
      .catch(error => {
        console.log(error);
        res.status(500).json("Server Error in getWOS on WOSController");
      });
    res.status(200).json(reply);
  };




  //delete WOS
  const deleteWOS = (req,res) => {
    const db = req.app.get('db'),
        { wos_id } = req.params;
    db.delete_wos( wos_id )
        .then(() => res.sendStatus(200))
        .catch(error => res.status(500).send(`delete_WOS(WOSController): ${error}`))
  }




//create WOS
const createWOS = (req,res) => {
    const db = req.app.get('db'),
                        // console.log(req.body)
                        // console.log(req.sessions.user)
        { 
        wos_title, 
        wos_img, 
        wos_description, 
        users_id,
        businesses_id 
        } = req.body;

    db.create_wos( 
        wos_title, 
        wos_img, 
        wos_description, 
        users_id,
        businesses_id, 
        )
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(`create_wos (WOSController): ${error}`))
  }



//update WOS
const updateWOS = (req,res) => {
    console.log(req.body)
    const db = req.app.get('db'),
        { 
        wos_id, 
        wos_title, 
        wos_img, 
        wos_description
        } = req.body;
  
    db.update_wos( 
        wos_id, 
        wos_title, 
        wos_img, 
        wos_description
        )
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).send(`update_wos (WOSController): ${error}`))
  }




  module.exports = {
    getWOS, deleteWOS, createWOS, updateWOS
  };