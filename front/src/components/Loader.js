import React from 'react';

class Loader extends React.Component {
    render() {
        return (
            <div className='myloader position-absolute top-50 start-50 d-flex translate-middle'>
                {this.props.error===false?
                    <div>
                        <div className='spinner spinner-grow m-2'></div>
                        <div className='spinner spinner-grow m-2' style={{animationDelay:'.2s'}}></div>
                        <div className='spinner spinner-grow m-2' style={{animationDelay:'.4s'}}></div>
                    </div>
                :   <div className='fs-4 text-light text-center'>
                        {this.props.error}
                        <br />
                        😥
                    </div>
                }
            </div>
        )
    }
}

export default Loader