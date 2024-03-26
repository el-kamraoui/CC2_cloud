const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./model/utilisateur');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Auth-service")
.then(() => {
    console.log('Database is connected')
})
.catch( err => console.log(err));

app.post('/register', async (req, res)=>{
    const user = UserModel.findOne({email: req.body.email, login: req.body.login});
    
    if(user){
        res.json({message: 'l\'utilisateur deja existe!'})
    }

    const hashPass = await bcrypt.hashSync(req.body.mdp, 10);

    UserModel.create({
        nom: req.body.nom,
        email: req.body.email,
        login: req.body.login,
        mdp: hashPass
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.post('/login', async (req, res)=>{
    const user = UserModel.findOne({email: req.body.email});

    if(user){
        const passwordMatch = await bcrypt.compare(req.body.mdp, user.mdp);

        if(passwordMatch){
            const token = jwt.sign({ email: user.email, userId: user._id }, 'secret', { expiresIn: '1h' });

            res.json(token)
        }else{
            res.json({message: 'Mot de passe incorrect'});
        }
    }else{
        res.json({message:'Utilisateur inconnu'});
    }
});

app.get('/user/:id', (req, res)=>{
    const id = req.params.id;

    UserModel.findOne({_id: rid})
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})