import React from 'react';

class Hand extends React.Component {

  render() {
      const {angle,count,name,stat,color}=this.props;
      let h = Number.parseInt(50+100/count)
      const bias = Math.abs(90-angle%180)*.18;
      const choice = ['stone', 'paper', 'scissor']
      let trans = ((window.innerWidth>window.innerHeight)?(8+(16-bias)+'vw'):(8+bias+'vw'));
    return (
        <div className='hand' style={{
                transform: `rotateZ(${angle}deg) translateY(calc(40px + ${trans}))`,
                position:'absolute',
                top:`calc(50vh - ${20 + h/2+'px'})`,
                left:`calc(50vw - ${h/2+'px'})`
        }}>
            <div>
                {
                    !(stat.choice>=0)?
                        <img src='/img/stone.png' 
                            style={{height:h+'px', animation:'shiver infinite alternate ease-in-out .1s'}} 
                            alt='stone'
                        />
                    :<img src={`/img/${choice[stat.choice]}.png`} 
                            style={{height:h+'px', backgroundColor:color}} 
                            alt={stat[0]} 
                        />
                }
            </div>
            <div className='name'>
                <div>
                    <span>{name}</span>
                    <span className='badge badge-pill bg-info m-1'>{stat.wins}</span>
                </div>
            </div>
        </div>
    )
  }

}

export default Hand;
