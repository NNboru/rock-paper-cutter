import React from 'react';
import Hand from './Hand.js'

class Allhands extends React.Component {

  render() {
    const {count,players:p, reveal} = this.props;
    let ind=0, hands=[], deg=0;
    if(window.innerWidth>window.innerHeight)
      deg=90
    
    for(let player in p){
      if(p[player].status==='on'){
        let color='transparent';
        if(reveal){
          if(reveal.res==='draw') color='beige'
          else if(reveal.winners.includes(player)) color='lawngreen'
          else color='orangered'
        }
        hands.push( <Hand name={player} 
                          stat={p[player]} 
                          key={ind++} 
                          angle={deg+ind*(360/count)} 
                          count={count}
                          color={color}
                    />)
        }
    }
    return hands
  }
}

export default Allhands;
