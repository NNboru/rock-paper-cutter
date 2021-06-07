import React from 'react';
import Hand from './Hand.js'

class Allhands extends React.Component {

  render() {
    const {count,players:p} = this.props;
    let ind=0, hands=[],deg=0;
    if(window.innerWidth>window.innerHeight)
      deg=90
    
    for(let player in p){
      hands.push(<Hand name={player} stat={p[player]} key={ind++} 
                       angle={deg+ind*(360/count)} size={count} />)
    }
    return hands
  }
}

export default Allhands;
