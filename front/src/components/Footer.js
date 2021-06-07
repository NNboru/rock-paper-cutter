import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <div className='container-fluid position-absolute bottom-0'>
                <div className='container'>
                    <div id='divchoice' className='row footer'>
                        <button className='btn btn-info col-4 border border-success border-2' onClick={e=>this.props.play('stone')}>Stone</button>
                        <button className='btn btn-info col-4 border border-success border-2' onClick={e=>this.props.play('paper')}>Paper</button>
                        <button className='btn btn-info col-4 border border-success border-2' onClick={e=>this.props.play('scissor')}>Scissor</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Footer;
