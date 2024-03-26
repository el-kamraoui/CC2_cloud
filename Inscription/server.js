const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5002;
const axios = require('axios');
const InscModel = require('./model/inscription');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Inscription")
.then(() => {
    console.log('Database is connected')
})
.catch( err => console.log(err));

app.post('/AddInsc/:user_id/:event_id', async (req, res)=>{
    const user = axios.get('http://localhost:3000/user/'+req.params.user_id);
    const event = axios.get('http://localhost:3000/event/'+req.params.event_id);

    if(user && event){
        await InscModel.create({
            utilisateur_id: req.params.user_id,
            evenement_id: req.params.event_id
        })
        .then(insc => res.json(insc))
        .catch(err => res.json(err))
    }else{
        res.json('utilisateur ou evenement non existe !')
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})