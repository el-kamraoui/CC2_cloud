const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5001;
const EventModel = require('./model/evenement');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Evenement")
.then(() => {
    console.log('Database is connected')
})
.catch( err => console.log(err));

app.post('/addEvent', async (req, res)=>{
    const event = EventModel.findOne({titre: req.body.titre});

    if(event){
        res.json({message: 'l\'evenement deja existe!'})
    }

    await EventModel.create({
        titre: req.body.titre,
        description: req.body.description,
        date: req.body.date,
        lieu: req.body.lieu,
        categorie: req.body.categorie
    })
    .then(event => res.json(event))
    .catch(err => res.json(err));

});

app.get('/event/:id', (req, res)=>{
    const id = req.params.id;

    EventModel.findOne({_id: id})
    .then(event => res.json(event))
    .catch(err => res.json(err));
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})