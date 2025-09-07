import React from 'react';
import Popup from './Popup.js'
import Footer from './Footer.js'
import Allhands from './Allhands.js'
import Offcanvas from './Offcanvas'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      ...this.props.room,
      name:''
    }
    this.reveal=false
  }

  setName = (name,myModal)=>{
    if(name==='') return
    if(this.state.players[name] && this.state.players[name].status==='on')
      return 'exist'
    // tell server to add new player
    myModal.hide()
    this.socket.emit('room add', this.props.roomid, name, ac=>{
      if(ac==='ok'){
        this.setState({name})
      }
      else console.log('error ', 'ac not ok in setname')
    })
    
  }

  notify = msg=>{
    alert(msg)
  }

  play = v=>{
    // tell server you played your turn
    this.socket.emit('room play', v)
    // update state only if acknowledgement received
    this.setState(s=>{
      const clone = JSON.parse(JSON.stringify(s.players))
      clone[s.name].choice = v
      return {
        players: clone
      }
    })
  }

  render(){
    if(this.state.name===''){
      return (
        <>
          <Popup setName={this.setName} />
        </>
      )
    }
    return (
      <>
        <button className="iconMenu btn btn-outline-primary position-absolute top-0 start-0 m-1 ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#divoffcanvas">
          <span>|||</span>
          <span id='spanMsgCnt'></span>
        </button>
        
        <Allhands players={this.state.players} 
                  count  ={this.state.count}
                  reveal ={this.reveal}
        />
        {(this.state.players[this.state.name].choice>=0) || <Footer play={this.play} />}

        <Offcanvas roomName={this.props.roomid} socket={this.props.socket} />
      </>
    )
  }

  componentDidMount(){
    this.socket = this.props.socket

    // when a player plays his turn
    this.socket.on('room play', (name, value)=>{
      this.setState(s=>{
        const players = JSON.parse(JSON.stringify(s.players))
        players[name].choice = value
        return {players}
      })
      // if(this.state.played === this.state.count){
      //   // all players played their turn
      //   console.log('who win?')
      // }
    })

    // when a new player enters
    this.socket.on('room add', (room)=>{
      room.name=this.state.name
      this.setState(room)
    })
    
    // a player left room
    this.socket.on('room delete', (room)=>{
      room.name=this.state.name
      this.setState(room)
    })

    // its time to see who win!
    this.socket.on('room reveal', (res, room)=>{
      room.name=this.state.name
      this.reveal=res
      this.setState(room)

      // reset room after 4 seconds
      setTimeout(()=>{
        this.reveal=false
        this.setState(s=>{
          const players = JSON.parse(JSON.stringify(s.players))
          for(let p in players){
            delete players[p].choice
          }
          return {players}
        })
      }, 2000 )
    })

    // a player resetted room score
    this.props.socket.on('room reset', (name, room)=>{
      room.name=this.state.name
      this.setState(room)
    })
  }

}

export default Main;