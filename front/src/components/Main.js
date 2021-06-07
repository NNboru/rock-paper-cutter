import React from 'react';
import Popup from './Popup.js'
import Footer from './Footer.js'
import Allhands from './Allhands.js'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      players:{
        'ron':['',2],
      },
      count:1,
      name:''
    }
  }

  setName = async (name,myModal)=>{
    if(name==='' || this.state.players[name]) return
    let resp = await fetch('/room/'+this.props.roomid+'/addme', {'method':'POST', body:name})
    if(!resp.ok) return resp.text().then(v=>document.body.innerHTML=v)

    myModal.hide()
    this.setState(s=>{return {
      name,
      count:s.count+1,
      players:{
        ...s.players, 
        [name]:['',0]}
      }
    })
  }

  play = v=>{
    this.setState(s=>{
      const clone = JSON.parse(JSON.stringify(s.players))
      clone[s.name][0]=v
      return {
        players:clone
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
        <Allhands players={this.state.players} count={this.state.count} />
        {(this.state.players[this.state.name][0]!=='') || <Footer play={this.play} />}
      </>
    )
  }
}

export default Main;