var express = require('express');
var router = express.Router();

const room = {

}

function getPlayers(id){
  if(!room[id])
    room[id]={
      players:{},
      count:0
    }
  return room[id]
}

function addPlayer(id,name){
  room[id].players[name]=['',0]
  room[id].count++
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello there');
});

router.get('/:id/players', (req,res)=>{
  const id=req.params.id
  
  const players = getPlayers(id)

  res.json(players)
})

router.post('/:id/addme', (req,res)=>{
  const id=req.params.id, name=req.body
  addPlayer(id, name)
  res.send('player added : '+ name)
})

module.exports = router;
