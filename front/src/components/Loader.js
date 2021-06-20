import React from 'react';

class Loader extends React.Component {
    render() {
        return (
            <div className='divMyloader position-fixed w-100 vh-100 top-0 start-0'>
                <div className='myloader position-absolute top-50 start-50 d-flex translate-middle'>
                    <div>
                        <div className='spinner spinner-grow m-2'></div>
                        <div className='spinner spinner-grow m-2' style={{animationDelay:'.2s'}}></div>
                        <div className='spinner spinner-grow m-2' style={{animationDelay:'.4s'}}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loader

/* error div
 <div className='fs-4 text-light text-center'>
    {this.props.error}
    <br />
    😥
</div> */