import React from 'react';

class Hand extends React.Component {

  render() {
      const {angle,size,name,stat}=this.props;
      let h = Number.parseInt(50+100/size);
      const bias = Math.abs(90-angle%180)*.2;
      let trans = ((window.innerWidth>window.innerHeight)?(8+(22-bias)+'vw'):(8+bias+'vw'));
    return (
        <div className='hand' style={{
                transform: `rotateZ(${angle}deg) translateY(${trans})`,
                position:'absolute',
                top:`calc(50vh - ${20 + h/2+'px'})`,
                left:`calc(50vw - ${h/2+'px'})`
        }}>
            <div>
                {!stat[0]?
                    <img src='img/stone.png' style={{height:h+'px'}} alt='stone' />
                   :<img src={`img/${stat[0]}.png`} style={{height:h+'px'}} alt={stat[0]} />
                }
            </div>
            <div className='name'>
                <div>
                    <span>{name}</span>
                    <span className='badge badge-pill bg-info m-1'>{stat[1]}</span>
                </div>
            </div>
        </div>
    )
  }

}

export default Hand;
