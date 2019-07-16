const bcrypt = require('bcryptjs')

async function register(req, res){
    // console.log('hit')
    const {first_name, last_name, image, password, business, email} = req.body;
    // console.log('AC6: ', req.body)
    const db = req.app.get('db');
    const result = await db.get_user([email])
    const business_id = await db.get_businesses_id([business])
    let businesses_id = business_id[0].businesses_id
    // console.log('AC10: ', businesses_id)
    const existingUser = result.length;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    if(existingUser > 0){
        console.log('Email already has account');
    } else {
        const registeredUser = await db.add_user([first_name, last_name, image, hash, businesses_id, email])
        const user = registeredUser[0];
        req.session.user = {id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, image: user.image, businesses_id: user.businesses_id}
        return res.status(201).json(req.session.user)
    }
}
async function login(req, res){
    const {email, password} = req.body;
    const db = req.app.get('db');
    const foundUser = await db.get_user([email]);
    const user = foundUser[0];
    const isAuthenticated = bcrypt.compareSync(password, user.password);

    if(!user){
        return res.status(401).json('I do not know you');
    }
    if(!isAuthenticated){
        return res.status(403).json('Try again');
    }
    req.session.user = {
        id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        image: user.image,
        businesses_id: user.businesses_id
    }
    return res.send(req.session.user)
}
async function logout(req, res){
    req.session.destroy();
    return res.status(200).send(req.session);
}
async function getUser(req, res){
    if(req.session.user){
        console.log('AC54: ', req.session.user)
        res.json(req.session.user)
    } else {
        res.status(401).json(console.log('no user found'))
    }
}

module.exports={
    register, login, logout, getUser
}