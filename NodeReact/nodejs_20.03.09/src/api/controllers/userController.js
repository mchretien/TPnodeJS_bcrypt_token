const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.list_all_users = (req, res) => {
  User.find({post_id: req.params.post_id}, (error, result) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else{
      res.status(200);
      res.json(result)
    }
  })
}

exports.user_register = (req, res) => {
  let new_user = new User(req.body);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
// Store hash in your password DB.
  new_user.password = hash;
  new_user.save()
  .then(user => {
    res.status(201);
    res.json(user);
  })
  .catch(error => {
    res.status(500);
    console.log(error);
    res.json({message: "Erreur serveur."})
  })
}

exports.user_login = (req, res) => {
  let {body} = req;
  // let body = req.body
  console.log(body.password);
  User.findOne({email: body.email})
  .then(user => {
    console.log(user.password);
    if(bcrypt.compareSync(body.password, user.password)){
      let userData = {
        email: user.email,
        role: user.role
      }
      jwt.sign({userData}, process.env.JWT_KEY, {expiresIn: '30 days'}, (error, token) => {
        if(error){
          res.status(500);
          console.log(error);
          res.json({message: "Erreur serveur."});
        }
        else {
          res.json({userData});
        }
      })
    }
    else{
      res.status(500);
      res.json({message: "Erreur serveur."})
    }
  })
  .catch(error => {
    res.status(500);
    console.log(error);
    res.json({message: "Erreur serveur."})
  })
}
