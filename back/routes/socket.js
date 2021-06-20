

module.exports = function(io){

    function getRoom(id){
        if(!rooms[id])
          rooms[id]={
            players:{},
            count:0,
            played:0
          }
        return rooms[id]
      }
      
    function addPlayer(id,name){
        rooms[id].count++
        if(rooms[id].players[name]){
            rooms[id].players[name].status = 'on'
        }
        else{
            rooms[id].players[name]={
                status: 'on',
                wins : 0
            }
        }
        return rooms[id]
    }

    function fakeit(room){
        const clone = JSON.parse(JSON.stringify(room))
        for( let p in clone.players){
            const val = clone.players[p].choice
            if(val)
                clone.players[p].choice = 0
        }
        return clone
    }

    function calResult(players, total){
        const cnt = [0,0,0], res = {}
        for( let p in players){
            if(players[p].status==='on'){
                cnt[players[p].choice]++
            }
        }
        if(cnt[0]*cnt[1]*cnt[2] != 0 || cnt.includes(total)){
            res.res='draw'
            return res
        }
        else res.res='win'

        let win=0
        if(cnt[0]==0) win=2
        if(cnt[2]==0) win=1

        res.winners = []
        for( let p in players){
            if(players[p].status==='on'){
                if(players[p].choice==win)
                    res.winners.push(p)
            }
        }
        const inc = total - res.winners.length
        for(let p of res.winners){
            players[p].wins += inc
        }

        return res
    }
    // players data
    const rooms = { }

    io.on('connection', socket=>{

        socket.on('get room', (roomid,ac)=>{
            const roomObj = fakeit(getRoom(roomid))
            ac(roomObj)
        })

        // new player connected
        socket.on('room add', (room, name, ac)=>{
            socket.join(room)
            socket.room=room;
            socket.name=name;
            const sendRoom = fakeit(addPlayer(room, name))
            io.to(room).emit('room add', sendRoom)
            ac('ok')
        }) 

        // a player played his turn
        socket.on('room play', (val)=>{
            rooms[socket.room].players[socket.name].choice = val
            socket.to(socket.room).emit('room play', socket.name, 0)

            // if all players played
            const r = rooms[socket.room]
            if(++r.played === r.count){
                const res = calResult(r.players, r.count)
                io.to(socket.room).emit('room reveal', res, r)

                // reset room
                r.played = 0
                for(let p in r.players)
                    delete r.players[p].choice
            }
        })

        // player send a chat msg
        socket.on('room msg', val=>{
            io.to(socket.room).emit('room msg', socket.name, val)
        })

        // player resetted room score
        socket.on('room reset', v=>{
            const r = rooms[socket.room]
            for(let p in r.players){
                r.players[p].wins=0
                delete r.players[p].choice
            }
            r.played=0
            io.to(socket.room).emit('room reset', socket.name, fakeit(r))
        })

        // a player disconnected
        socket.on('disconnecting', ()=>{
            if(!socket.room || !rooms[socket.room]) return
            if(rooms[socket.room].count===1){
                delete rooms[socket.room]
            }
            else{
                rooms[socket.room].count--
                rooms[socket.room].players[socket.name].status='off'
                socket.to(socket.room).emit('room delete', fakeit(rooms[socket.room]))
            }
        })
    })
}