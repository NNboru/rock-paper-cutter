var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const roomTable = require('../modals/RoomModal')


/* GET home page. */
router.get('*', function(req, res, next) {
  res.render('index');
});

router.post('/createRoom', (req,res)=>{
  const {name, pass} = req.body
  roomTable.findOne({name}, (err,data)=>{
    if(err){
      res.json({error:err})
      return console.error(err)
    }
    if(data){
      res.json({exists:true})
    }
    else{
      // add room to db
      roomTable.create({name,pass,date:Date()}, e=>{
        if(e){
          console.error(e)
          res.json({error:e})
        }
        else res.json({exists:false})
      })
    }
  })
})

router.post('/joinRoom', (req,res)=>{
  const {name, pass} = req.body
  roomTable.findOne({name}, (err,data)=>{
    if(err){
      res.json({error:err})
      return console.error(err)
    }
    if(!data){
      res.json({notExists:true})
    }
    else if(data.pass!=pass){
      res.json({wrongPass:true})
    }
    else{
      res.json({ok:true})
    }
  })
})


module.exports = router;
