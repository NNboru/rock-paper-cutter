import React from 'react'
import Main from './Main.js'
import Loader from './Loader.js'
import {io} from 'socket.io-client'

class LoadMain extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: true
    }
  }

  getRoom = ()=>{
    this.socket = io()
    this.socket.emit('get room', this.props.roomid, room=>{
      this.room = room
      this.setState({loading:false})
    })
  }

  render() {
    return (
        this.state.loading?
            <Loader />
        :   <Main socket={this.socket} 
                  room={this.room} 
                  roomid={this.props.roomid} 
            /> 
    )
  }

  componentDidMount(){
    // preloading images
    new Image().src = '/img/home.svg'
    new Image().src = '/img/stone.png'
    new Image().src = '/img/paper.png'
    const img = new Image()

    // get room from server with all players info
    img.addEventListener('load', this.getRoom )
    img.src = '/img/scissor.png'
  }

  componentWillUnmount(){
      this.socket.close()
  }
}

export default LoadMain;
